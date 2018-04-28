import React, { PureComponent, ChangeEvent, KeyboardEvent } from 'react';
import cx from 'classnames';

import If from './If';
import withDefaultProps from '../utils/withDefaultProps';

import {
  StyledTextInput,
  Label,
  Input,
  ClearButton,
  ErrorMessage,
} from './TextInput.style';

export interface Props {
  value: string;
  onChange(changedValue: string): void;
  errorMessage?: string;
  type: string;
  autoFocus: boolean;
  disabled: boolean;

  label: string;
  clearable: boolean;

  onEnter(e): void;
  onClear(e): void;
  onFocus(e): void;
  onBlur(e): void;
}

const ignoreEvent = () => {};
export const defaultProps = {
  type: 'text',
  label: '',
  autoFocus: false,
  disabled: false,
  clearable: true,
  onEnter: ignoreEvent,
  onClear: ignoreEvent,
  onFocus: ignoreEvent,
  onBlur: ignoreEvent,
};

class TextInput extends PureComponent<Props> {
  private id: string;
  private static id = 0;
  private static getId() {
    TextInput.id += 1;
    return `text-input-${TextInput.id}`;
  }

  public state = {
    focused: false,
  };

  public componentWillMount() {
    this.id = TextInput.getId();
  }

  private onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
  };

  private onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    const ENTER_KEY = 13;

    if (keyCode === ENTER_KEY) {
      this.props.onEnter(e);
    }
  };

  private onClear = e => {
    this.props.onChange('');
    this.props.onClear(e);
  };

  private onFocus = e => {
    this.props.onFocus(e);
    this.setState({
      focused: true,
    });
  };

  private onBlur = e => {
    this.props.onBlur(e);
    this.setState({
      focused: false,
    });
  };

  public render() {
    const {
      type,
      autoFocus,
      value,
      label,
      clearable,
      disabled,
      errorMessage,
    } = this.props;
    const { focused } = this.state;

    return (
      <StyledTextInput
        className={cx({
          empty: value === '' && !focused,
          error: !!errorMessage,
        })}
      >
        <div className="text-input-control">
          <Label asPlaceholder={value === '' && !focused}>
            <span>{label}</span>
          </Label>
          <Input
            type={type}
            autoFocus={autoFocus}
            id={this.id}
            value={value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            disabled={disabled}
          />
          <If condition={value !== '' && clearable && !disabled}>
            <ClearButton type="button" onClick={this.onClear} tabIndex={-1}>
              ✕
            </ClearButton>
          </If>
          {/* normally icon */}
          {this.props.children}
          <If condition={!!errorMessage}>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </If>
        </div>
      </StyledTextInput>
    );
  }
}

export default withDefaultProps(defaultProps)(TextInput);
