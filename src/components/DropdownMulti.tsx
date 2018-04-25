import React, {
  PureComponent,
  ReactNode,
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
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
  Option,
  Values,
} from './DropdownMulti.style';

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
  value: OptionData[];
  onChange: (option: OptionData[]) => void;
  className?: string;
  errorMessage?: string;

  onFocus(e: FocusEvent<any>): void;
  onBlur(e: FocusEvent<any>): void;
  valueKey: string;
  labelKey: string;
  valueRenderer: (selectedOption: OptionData, labelKey: string) => ReactNode;
  optionRenderer: (option: OptionData, labelKey: string) => ReactNode;
  filterOptions: (
    options: OptionData[],
    currentSelected: OptionData[],
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
  currentSelected: OptionData[],
  inputValue: string,
  labelKey: string
) => {
  let options = givenOptions.filter(o => !currentSelected.includes(o));
  if (inputValue) {
    options = options.filter(o => (o[labelKey] || '').indexOf(inputValue) >= 0);
  }
  return options;
};

class Dropdown extends PureComponent<Props, State> {
  private input: HTMLInputElement;
  private menu: HTMLDivElement;
  private wrapper: HTMLDivElement;

  public state: State = {
    inputFocused: this.props.autoFocus || false,
    inputValue: '',
    focusedOption: this.props.value,
    menuOpened: false,
  };

  // data cache
  private filteredOptions: OptionData[] = [];

  componentDidUpdate(_, prevState) {
    if (prevState.menuOpened !== this.state.menuOpened) {
      this.toggleOutsideClickHandler(this.state.menuOpened);
    }
  }

  toggleOutsideClickHandler(menuOpened) {
    if (menuOpened) {
      document.addEventListener('mousedown', this.onMouseDownOutside);
    } else {
      document.removeEventListener('mousedown', this.onMouseDownOutside);
    }
  }

  private onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      inputValue,
      menuOpened: true,
    }));
  };

  private onInputFocus = e => {
    this.setState(prevState => ({
      ...prevState,
      inputFocused: true,
      menuOpened: true,
    }));
    this.props.onFocus(e);
  };

  private onInputBlur = e => {
    this.setState(prevState => ({
      ...prevState,
      inputFocused: false,
      // menuOpened: false,
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
        this.closeMenu();
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
      case 27: {
        // escape
        if (this.state.menuOpened) {
          this.closeMenu();
          e.stopPropagation();
        }
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
        menuOpened: true,
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
      menuOpened: !this.state.menuOpened,
    });
  };

  private onMouseDownOutside = e => {
    if (!this.wrapper) {
      return;
    }
    if (!this.wrapper.contains(e.target)) {
      this.closeMenu();
    }
  };

  private selectOption = (option: OptionData) => () => {
    if (this.props.disableOption(option)) {
      return;
    }
    // this.blurInput();
    this.setState(prevState => ({
      ...prevState,
      // menuOpened: false,
      inputValue: '',
    }));
    this.props.onChange([...this.props.value, option]);
  };

  private selectFocusedOption = () => {
    // this.blurInput();
    this.setState(prevState => ({
      ...prevState,
      focusedOption: null,
      // menuOpened: false,
      inputValue: '',
    }));
    this.props.onChange([...this.props.value, this.state.focusedOption]);
  };

  private removeValue = (option: OptionData) => () => {
    this.props.onChange(this.props.value.filter(o => o !== option));
  };

  private clearValues = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    this.props.onChange([]);
    this.focusInput();
    this.setState(prevState => ({
      ...prevState,
      inputValue: '',
    }));
  };

  private focusInput() {
    this.input.focus();
  }

  // not used in this component
  // private blurInput() {
  //   this.input.blur();
  // }

  private closeMenu() {
    this.setState({
      menuOpened: false,
    });
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
      focusedOption: option,
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
  private renderValue = value => {
    const { valueRenderer, labelKey, disabled } = this.props;
    console.log(value);
    return (
      <Value>
        {valueRenderer(value, labelKey)}
        <If condition={!disabled}>
          <span className="remove-value" onClick={this.removeValue(value)}>
            ×
          </span>
        </If>
      </Value>
    );
  };

  private renderValues() {
    const { value } = this.props;
    return <Values>{value.map(this.renderValue)}</Values>;
  }

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
        type="button"
        opened={this.state.menuOpened}
        onMouseDown={this.onMouseDownOnArrow}
        tabIndex={-1}
      />
    );
  }

  private renderClear() {
    return (
      <ClearButton
        type="button"
        className="dropdown-clear"
        onClick={this.clearValues}
      >
        ×
      </ClearButton>
    );
  }

  private renderMenu() {
    const {
      options: givenOptions,
      labelKey,
      noValidOptionMessage,
    } = this.props;
    const { inputValue } = this.state;

    this.filteredOptions = this.props.filterOptions(
      givenOptions,
      this.props.value,
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
          disabled,
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
      errorMessage,
    } = this.props;
    const { menuOpened, inputFocused } = this.state;
    return (
      <StyledDropdown
        className={cx('dropdown', className)}
        focused={inputFocused}
        hasValue={value.length > 0}
        innerRef={c => (this.wrapper = c)}
      >
        <DropdownControl
          onMouseDown={this.onMouseDownOnControl}
          onKeyDown={this.onKeyDown}
        >
          <If condition={label}>{this.renderLabel()}</If>
          <If condition={value}>{this.renderValues()}</If>
          <If condition={searchable && !disabled}>{this.renderInput()}</If>
          <If condition={value && clearable && !disabled}>
            {this.renderClear()}
          </If>
          <If condition={!disabled}>{this.renderArrow()}</If>
        </DropdownControl>
        <If condition={errorMessage}>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </If>
        <If condition={menuOpened}>{this.renderMenu()}</If>
      </StyledDropdown>
    );
  }
}

const defaultProps: Partial<Props> = {
  value: [],

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

  noValidOptionMessage: '선택 가능한 옵션이 없습니다',
};

export default withDefaultProps(defaultProps)(Dropdown);
