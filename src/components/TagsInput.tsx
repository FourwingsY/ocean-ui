import React, {
  Component,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import withDefaultProps from '../utils/withDefaultProps';

import If from './If';

// TagsInput style is too similar with DropdownMulti
import {
  StyledDropdown,
  DropdownControl,
  Label,
  Values,
  Value,
  Input,
  ClearButton,
} from './DropdownMulti.style';

export interface Props {
  value: string[];
  onChange(changedValue: string[]): void;

  // default props
  autoFocus: boolean;
  disabled: boolean;

  label: string;
  clearable: boolean;

  onClear(e): void;
  onFocus(e): void;
  onBlur(e): void;
}

interface State {
  inputFocused: boolean;
  inputValue: string;
}

const doNothing = () => {};
export const defaultProps: Partial<Props> = {
  label: '',
  autoFocus: false,
  disabled: false,
  clearable: true,
  onClear: doNothing,
  onFocus: doNothing,
  onBlur: doNothing,
};

class TagsInput extends Component<Props, State> {
  private input: HTMLInputElement;

  public state = {
    inputFocused: this.props.autoFocus,
    inputValue: '',
  };

  private onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      inputValue,
    }));
  };

  private onInputFocus = () => {
    this.setState(prevState => ({
      ...prevState,
      inputFocused: true,
    }));
  };

  private onInputBlur = () => {
    this.flush();
    this.setState(prevState => ({
      ...prevState,
      inputFocused: false,
    }));
  };

  private onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // delete
      case 8: {
        if (!this.state.inputValue) {
          this.popTag();
          return;
        }
      }
      // tab, enter, space, comma
      case 9:
      case 13:
      case 32:
      case 188: {
        if (!this.state.inputValue) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        this.flush();
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
    this.focusInput();
  };

  private focusInput() {
    this.input.focus();
  }

  // input value를 비우고,
  // 해당 value를 tag로 전환한다.
  flush = () => {
    const newTag = this.state.inputValue;
    this.setState({ inputValue: '' });
    this.pushTag(newTag);
  };

  popTag = () => {
    this.props.onChange([...this.props.value.slice(0, -1)]);
  };

  pushTag = (newTag: string) => {
    if (!newTag) {
      return;
    }
    const tag = newTag.trim();
    if (!tag) {
      return;
    }

    // if comma-contained string is pasted
    const tags = tag.split(',');
    if (tags.length > 1) {
      return this.pushTags(tags);
    }

    // no duplicate
    if (this.props.value.includes(tag)) {
      return;
    }
    this.props.onChange([...this.props.value, tag]);
  };

  pushTags = (tags: string[]) => {
    const validTags = tags.map(tag => tag.trim()).filter(tag => tag.length > 0);
    const newTags = validTags.filter(tag => !this.props.value.includes(tag));
    this.props.onChange([...this.props.value, ...newTags]);
  };

  private clearValue = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    this.props.onChange([]);
    this.focusInput();
    this.setState(prevState => ({
      ...prevState,
      inputValue: '',
    }));
  };

  removeValue = (option: string) => () => {
    this.props.onChange(this.props.value.filter(o => o !== option));
  };

  /**
   * Render Functions
   */
  private renderValue = (value, index) => {
    return (
      <Value className="tag-input-value" key={index}>
        {value}
        <If condition={!this.props.disabled}>
          <span className="remove-value" onClick={this.removeValue(value)}>
            ×
          </span>
        </If>
      </Value>
    );
  };

  private renderLabel() {
    const { inputFocused } = this.state;
    const { value, label } = this.props;
    const hasValue = value && value.length > 0;
    return <Label asPlaceholder={!inputFocused && !hasValue}>{label}</Label>;
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
        onKeyDown={this.onKeyDown}
      />
    );
  }

  private renderClear() {
    return (
      <ClearButton className="tag-input-clear" onClick={this.clearValue}>
        ✕
      </ClearButton>
    );
  }

  render() {
    const { value, label, clearable, disabled } = this.props;
    const { inputFocused } = this.state;
    const hasValue = value && value.length > 0;

    return (
      <StyledDropdown
        className="tags-input"
        focused={inputFocused}
        hasValue={hasValue}
      >
        <DropdownControl onMouseDown={this.onMouseDownOnControl}>
          <If condition={Boolean(label)}>{this.renderLabel()}</If>
          <Values>
            <If condition={hasValue}>{value.map(this.renderValue)}</If>
            <If condition={!disabled}>{this.renderInput()}</If>
          </Values>
          <If condition={hasValue && clearable && !disabled}>
            {this.renderClear()}
          </If>
        </DropdownControl>
      </StyledDropdown>
    );
  }
}

export default withDefaultProps(defaultProps)(TagsInput);
