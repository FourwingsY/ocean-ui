import React, { Component } from 'react';
import { DateTime } from 'luxon';

import Calendar from './Calendar';
import TextInput from './TextInput';
import If from './If';
import CalendarIcon from '../icons/Calendar';

import { StyledDatePicker, PickerCell } from './DatePicker.style';

interface Props {
  selectedDate: DateTime | null;
  onSelect(selectedDate: DateTime | null): void;

  label?: string;
  errorMessage?: string;
  clearable?: boolean;
}

interface State {
  focused: boolean;
}

export default class DatePicker extends Component<Props, State> {
  public state = {
    focused: false,
  };

  private onFocus = () => {
    this.setState({ focused: true });
  };

  private onBlur = () => {
    this.setState({ focused: false });
  };

  private onClear = () => {
    this.props.onSelect(null);
  };

  private onSelect = (date: DateTime) => {
    this.props.onSelect(date);
    this.setState({ focused: false });
  };

  private renderDate = (date: DateTime, view: DateTime) => {
    return (
      <PickerCell
        sun={date.weekday === 7}
        today={date.hasSame(DateTime.local(), 'day')}
        n={date.month !== view.month}
        selected={
          this.props.selectedDate
            ? date.hasSame(this.props.selectedDate, 'day')
            : false
        }
      >
        {date.day}
      </PickerCell>
    );
  };

  public render() {
    const { label, selectedDate, errorMessage, clearable = true } = this.props;
    const { focused } = this.state;

    return (
      <StyledDatePicker className="date-picker">
        <TextInput
          value={selectedDate ? selectedDate.toFormat('yyyy-MM-dd') : ''}
          label={label}
          onChange={() => {}}
          onFocus={this.onFocus}
          onClear={this.onClear}
          errorMessage={errorMessage}
          clearable={clearable}
        >
          <CalendarIcon
            onClick={this.state.focused ? this.onBlur : this.onFocus}
          />
        </TextInput>
        <If condition={focused}>
          <div className="calendar-layer">
            <Calendar onSelect={this.onSelect} dateRenderer={this.renderDate} />
          </div>
        </If>
      </StyledDatePicker>
    );
  }
}
