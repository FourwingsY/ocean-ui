import React, {
  Component,
  ReactNode,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  FocusEvent
} from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import If from './If';

import withDefaultProps from '../utils/withDefaultProps';

import {
  StyledDropdown,
  DropdownControl,
  Label,
  Value,
  Input,
  ToggleArrow,
  ClearButton,
  ErrorMessage,
  Menu,
  Option
} from './Dropdown.style';

type OptionBase<
  K extends {
    value?: any;
    label?: string;
    disabled?: boolean;
  }
> = K;
type OptionData = OptionBase<any>;

export interface Props {
  options: OptionData[];
  value: OptionData | null;
  onChange: (option: OptionData) => void;
  errorMessage?: string;

  onFocus(e: FocusEvent<any>): void;
  onBlur(e: FocusEvent<any>): void;
  className: string;
  valueKey: string;
  labelKey: string;
  valueRenderer: (selectedOption: OptionData, labelKey: string) => ReactNode;
  optionRenderer: (option: OptionData, labelKey: string) => ReactNode;
  filterOptions: (
    options: OptionData[],
    inputValue: string,
    labelKey: string
  ) => OptionData[];
  disableOption: (option: OptionData) => boolean;
  label: string;
  noValidOptionMessage: string;

  disabled: boolean;
  clearable: boolean;
  searchable: boolean;
  autoFocus: boolean;
}

interface State {
  inputFocused: boolean;
  inputValue: string;
  focusedOption: OptionData | null;
  menuOpened: boolean;
}

function mod(n, m) {
  if (n === 0) {
    return 0;
  }
  return (m % n + n) % n;
}

const defaultOptionRenderer = (option: OptionData, labelKey: string) => (
  <span>{option && option[labelKey]}</span>
);

const defaultFilterOptions = (
  givenOptions: OptionData[],
  inputValue: string,
  labelKey: string
) => {
  let options = givenOptions;
  if (inputValue) {
    options = options.filter(o => (o[labelKey] || '').indexOf(inputValue) >= 0);
  }
  return options;
};

class Dropdown extends Component<Props, State> {
  private input: HTMLInputElement;
  private menu: HTMLDivElement;

  public state = {
    inputFocused: this.props.autoFocus || false,
    inputValue: '',
    focusedOption: this.props.value,
    menuOpened: false
  };

  // data cache
  private filteredOptions: OptionData[] = [];

  private onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      inputValue,
      menuOpened: true
    }));
  };

  private onInputFocus = e => {
    this.setState(prevState => ({
      ...prevState,
      inputFocused: true,
      menuOpened: true
    }));
    this.props.onFocus(e);
  };

  private onInputBlur = e => {
    this.setState(prevState => ({
      ...prevState,
      inputFocused: false,
      menuOpened: false
    }));
    this.props.onBlur(e);
  };

  private onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.keyCode) {
      case 9: {
        // tab
        if (e.shiftKey || !this.state.menuOpened) {
          return;
        }
        this.selectFocusedOption();
        break;
      }
      case 13: {
        // enter
        if (!this.state.menuOpened) {
          return;
        }
        e.stopPropagation();
        this.selectFocusedOption();
        break;
      }
      case 38: {
        // up
        const prevOption = this.lookupPreviousOption();
        this.focusOption(prevOption)();
        break;
      }
      case 40: {
        // down
        const nextOption = this.lookupNextOption();
        this.focusOption(nextOption)();
        break;
      }
    }
  };

  private onMouseDownOnControl = (e: MouseEvent<HTMLDivElement>) => {
    if (this.props.disabled) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    if (!this.state.menuOpened) {
      this.setState(prevState => ({
        ...prevState,
        menuOpened: true
      }));
    }
    this.focusInput();
  };

  // stop propagation to dropdown control, but focus on input
  private onMouseDownOnMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    this.focusInput();
  };

  private onMouseDownOnArrow = (e: MouseEvent<HTMLButtonElement>) => {
    // will not rendered on disabled
    // if (this.props.disabled) {
    //   return
    // }
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      menuOpened: !this.state.menuOpened
    });
  };

  private selectOption = (option: OptionData) => () => {
    if (this.props.disableOption(option)) {
      return;
    }
    this.blurInput();
    this.setState(prevState => ({
      ...prevState,
      menuOpened: false,
      inputValue: ''
    }));
    this.props.onChange(option);
  };

  private selectFocusedOption = () => {
    this.blurInput();
    this.setState(prevState => ({
      ...prevState,
      focusedOption: null,
      menuOpened: false,
      inputValue: ''
    }));
    this.props.onChange(this.state.focusedOption);
  };

  private clearValue = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    this.props.onChange(null);
    this.focusInput();
    this.setState(prevState => ({
      ...prevState,
      inputValue: ''
    }));
  };

  private focusInput() {
    this.input.focus();
  }

  private blurInput() {
    this.input.blur();
  }

  private focusOption = (option: OptionData) => () => {
    if (!option) {
      return;
    }
    if (this.props.disableOption(option)) {
      return;
    }
    this.setState(prevState => ({
      ...prevState,
      focusedOption: option
    }));
    this.scrollToFocusedOption(option);
  };

  private lookupPreviousOption(): OptionData | null {
    const { focusedOption } = this.state;
    let startIndex = 0;
    if (focusedOption) {
      startIndex = this.filteredOptions.findIndex(o => o === focusedOption);
    }

    let lookupIndex = mod(this.filteredOptions.length, startIndex - 1);
    while (true) {
      let lookupOption = this.filteredOptions[lookupIndex];

      // if prev option is not disabled, then
      if (!this.props.disableOption(lookupOption)) {
        return lookupOption;
      }
      // lookup for a loop, but nothing matched.
      if (lookupIndex === startIndex) {
        return null;
      }
      lookupIndex = mod(this.filteredOptions.length, lookupIndex - 1);
    }
  }

  private lookupNextOption(): OptionData | null {
    const { focusedOption } = this.state;
    let startIndex = Math.max(this.filteredOptions.length - 1, 0);
    if (focusedOption) {
      startIndex = this.filteredOptions.findIndex(o => o === focusedOption);
    }

    let lookupIndex = mod(this.filteredOptions.length, startIndex + 1);
    while (true) {
      let lookupOption = this.filteredOptions[lookupIndex];

      // if next option is not disabled, then
      if (!this.props.disableOption(lookupOption)) {
        return lookupOption;
      }
      // lookup for a loop, but nothing matched.
      if (lookupIndex === startIndex) {
        return null;
      }
      lookupIndex = mod(this.filteredOptions.length, lookupIndex + 1);
    }
  }

  // this code is not testable in jsdom environment
  private scrollToFocusedOption(option: OptionData) {
    const index = this.filteredOptions.findIndex(o => o === option);
    const menuDOM = ReactDOM.findDOMNode(this.menu) as HTMLElement;
    if (!menuDOM) {
      return;
    }

    const focusedOptionDOM = menuDOM.children[index] as HTMLElement;
    const menuRect = menuDOM.getBoundingClientRect();
    const focusedOptionRect = focusedOptionDOM.getBoundingClientRect();
    if (
      focusedOptionRect.bottom > menuRect.bottom ||
      focusedOptionRect.top < menuRect.top
    ) {
      menuDOM.scrollTop =
        focusedOptionDOM.offsetTop +
        focusedOptionDOM.clientHeight -
        menuDOM.offsetHeight;
    }
  }

  /**
   * Render Functions
   */
  private renderValue = () => {
    const { value, valueRenderer, labelKey } = this.props;
    return (
      <Value>
        <If condition={Boolean(value)}>{valueRenderer(value, labelKey)}</If>
      </Value>
    );
  };

  private renderLabel() {
    const { inputFocused } = this.state;
    const { value, label } = this.props;
    return <Label asPlaceholder={!inputFocused && !value}>{label}</Label>;
  }

  private renderInput() {
    const { inputValue } = this.state;
    return (
      <Input
        innerRef={c => {
          this.input = c;
        }}
        value={inputValue}
        onChange={this.onInputChange}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
      />
    );
  }

  private renderArrow() {
    return (
      <ToggleArrow
        opened={this.state.menuOpened}
        onMouseDown={this.onMouseDownOnArrow}
        tabIndex={-1}
      />
    );
  }

  private renderClear() {
    return (
      <ClearButton className="dropdown-clear" onClick={this.clearValue}>
        ×
      </ClearButton>
    );
  }

  private renderMenu() {
    const {
      options: givenOptions,
      labelKey,
      noValidOptionMessage
    } = this.props;
    const { inputValue } = this.state;

    this.filteredOptions = this.props.filterOptions(
      givenOptions,
      inputValue,
      labelKey
    );

    return (
      <Menu
        onMouseDown={this.onMouseDownOnMenu}
        innerRef={c => {
          this.menu = c;
        }}
      >
        {this.filteredOptions.map(this.renderOption)}
        <If condition={this.filteredOptions.length === 0}>
          <span className="no-valid-option">{noValidOptionMessage}</span>
        </If>
      </Menu>
    );
  }

  private renderOption = (option: OptionData) => {
    const { valueKey, labelKey, optionRenderer, disableOption } = this.props;
    const { focusedOption } = this.state;
    const disabled = disableOption(option);
    return (
      <Option
        className={cx('dropdown-option', {
          focused: option === focusedOption,
          disabled
        })}
        key={option[valueKey]}
        onClick={this.selectOption(option)}
        onMouseOver={this.focusOption(option)}
      >
        {optionRenderer(option, labelKey)}
      </Option>
    );
  };

  public render() {
    const {
      className,
      label,
      value,
      searchable,
      clearable,
      disabled,
      errorMessage
    } = this.props;
    const { menuOpened, inputFocused } = this.state;
    return (
      <StyledDropdown
        className={cx('dropdown', className)}
        focused={inputFocused}
        hasValue={Boolean(value)}
      >
        <DropdownControl
          onMouseDown={this.onMouseDownOnControl}
          onKeyDown={this.onKeyDown}
        >
          <If condition={Boolean(label)}>{this.renderLabel()}</If>
          <If condition={Boolean(value)}>{this.renderValue()}</If>
          <If condition={searchable && !disabled}>{this.renderInput()}</If>
          <If condition={Boolean(value) && clearable && !disabled}>
            {this.renderClear()}
          </If>
          <If condition={!disabled}>{this.renderArrow()}</If>
        </DropdownControl>
        <If condition={Boolean(errorMessage)}>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </If>
        <If condition={menuOpened}>{this.renderMenu()}</If>
      </StyledDropdown>
    );
  }
}

const defaultProps: Partial<Props> = {
  value: null,

  onFocus: () => {},
  onBlur: () => {},
  valueKey: 'value',
  labelKey: 'label',
  valueRenderer: defaultOptionRenderer,
  optionRenderer: defaultOptionRenderer,
  filterOptions: defaultFilterOptions,
  disableOption: option => !option || option.disabled,
  label: '',

  disabled: false,
  clearable: true,
  searchable: true,
  autoFocus: false,

  noValidOptionMessage: '선택 가능한 옵션이 없습니다'
};

export default withDefaultProps(defaultProps)(Dropdown);
