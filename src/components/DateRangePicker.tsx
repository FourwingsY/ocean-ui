import React, { Component } from 'react';
import { DateTime } from 'luxon';

// import { PrimaryButton, SecondaryButton } from '@src/styles/buttons';
import Calendar from './Calendar';
import TextInput from './TextInput';
import If from './If';

import { StyledDateRangePicker, PickerCell } from './DateRangePicker.style';
import CalendarIcon from '../icons/Calendar';

function isDateInRange(dateRange: DateRange, date: DateTime): boolean {
  const [start, end] = dateRange;
  if (!start || !end) {
    return false;
  }
  if (date < start) {
    return false;
  }
  if (end < date) {
    return false;
  }
  return true;
}

function flipIfReversed(dateRange: DateRange): DateRange {
  const [start, end] = dateRange;
  if (!start || !end) {
    return dateRange;
  }
  if (end < start) {
    return [end, start];
  }
  return [start, end];
}

// hasSame is too slow on storybook for doing 35+ times every render.
function isSameDay(date: DateTime, other: DateTime) {
  if (date.day !== other.day) {
    return false;
  }
  return date.hasSame(other, 'day');
}

type Validator = (
  value: DateRange
) => undefined | { target: string; errorMessage: string };

type DateRange = [DateTime | null, DateTime | null];
interface Props {
  selectedDateRange: DateRange;
  onSelect(selectedDate: DateRange): void;

  label?: string;
  errorMessage?: string;
  validate?: Validator[];
}

interface State {
  focused: boolean;
  target: 'startDate' | 'endDate';
  startDate: DateTime | null;
  endDate: DateTime | null;
  expectedRange: DateRange;
}

class DateRangePicker extends Component<Props, State> {
  public state: State = {
    focused: false,
    target: 'startDate',
    startDate: this.props.selectedDateRange[0],
    endDate: this.props.selectedDateRange[1],
    expectedRange: [null, null],
  };

  private onFocus = () => {
    this.setState({ focused: true });
  };

  private onClear = () => {
    this.props.onSelect([null, null]);
    this.close();
  };

  private apply = () => {
    const { startDate, endDate } = this.state;

    // have both values
    if (!startDate || !endDate) {
      return;
    }

    // and pass the validation
    const error = this.validate();
    if (!error.startDate && !error.endDate) {
      this.props.onSelect([startDate, endDate]);
      this.close();
    }
  };

  private close = () => {
    this.setState({
      focused: false,
      target: 'startDate',
      startDate: null,
      endDate: null,
    });
  };

  private onSelect = (date: DateTime) => {
    const target = this.state.target;
    const nextTarget = {
      startDate: 'endDate',
      endDate: 'startDate',
    }[target] as State['target'];
    const dateRange = this.updateDateRange(this.state.target, date);

    this.setState({
      target: nextTarget,
      startDate: dateRange[0],
      endDate: dateRange[1],
    });
  };

  updateDateRange = (target: string, date: DateTime): DateRange => {
    let range: DateRange;
    switch (target) {
      case 'startDate': {
        return [date, date];
      }
      case 'endDate': {
        range = [this.state.startDate, date];
        return flipIfReversed(range);
      }
      default: {
        return [null, null];
      }
    }
  };

  expectRange = (date: DateTime) => () => {
    const dateRange = this.updateDateRange(this.state.target, date);
    this.setState({
      expectedRange: dateRange,
    });
  };

  resetExpectedRange = () => {
    this.setState({ expectedRange: [null, null] });
  };

  validate = () => {
    const noError = {
      startDate: undefined,
      endDate: undefined,
    };
    if (!this.props.validate) {
      return noError;
    }
    const errorMessages = this.props.validate.reduce((messages, validator) => {
      const error = validator([this.state.startDate, this.state.endDate]);
      if (error && !messages[error.target]) {
        return {
          ...messages,
          [error.target]: error.errorMessage,
        };
      }
      return messages;
    }, noError);
    return errorMessages;
  };

  getSummary = () => {
    const [startDate, endDate] = this.props.selectedDateRange;
    if (!startDate || !endDate) {
      return '';
    }

    const startDateSummary = startDate.toFormat('yy.MM.dd');
    const endDateSummary = endDate.toFormat('yy.MM.dd');
    return `${startDateSummary} ~ ${endDateSummary}`;
  };

  private renderDate = (date: DateTime, view: DateTime) => {
    const { target, startDate, endDate, expectedRange } = this.state;
    const [expectStart, expectEnd] = expectedRange;
    const expecting = target === 'endDate';
    const selected = !expecting && isDateInRange([startDate, endDate], date);
    const expected = expecting && isDateInRange([expectStart, expectEnd], date);

    return (
      <PickerCell
        sun={date.weekday === 7}
        today={isSameDay(date, DateTime.local())}
        n={date.month !== view.month}
        selected={selected}
        selectedStart={selected && isSameDay(date, startDate!)}
        selectedEnd={selected && isSameDay(date, endDate!)}
        expected={expected}
        expectedStart={expected && isSameDay(date, expectStart!)}
        expectedEnd={expected && isSameDay(date, expectEnd!)}
        onMouseOver={this.expectRange(date)}
      >
        {date.day}
      </PickerCell>
    );
  };

  render() {
    const { label, errorMessage } = this.props;
    const { focused, startDate, endDate } = this.state;
    const summary = this.getSummary();
    const errorMessages = this.validate();

    return (
      <StyledDateRangePicker className="date-range-picker">
        <TextInput
          value={summary}
          label={label}
          onChange={() => {}}
          onFocus={this.onFocus}
          onClear={this.onClear}
          errorMessage={errorMessage}
        >
          <CalendarIcon onClick={this.onFocus} />
        </TextInput>
        <If condition={focused}>
          <div className="calendar-layer">
            <Calendar
              onSelect={this.onSelect}
              dateRenderer={this.renderDate}
              onMouseLeave={this.resetExpectedRange}
            />
            <hr />
            <TextInput
              value={startDate ? startDate.toFormat('yy.MM.dd') : ''}
              label={'시작일'}
              onChange={() => {}}
              clearable={false}
              errorMessage={errorMessages.startDate}
            />
            <span className="fromto">~</span>
            <TextInput
              value={endDate ? endDate.toFormat('yy.MM.dd') : ''}
              label={'종료일'}
              onChange={() => {}}
              clearable={false}
              errorMessage={errorMessages.endDate}
            />
          </div>
        </If>
        <p className="buttons">
          <button onClick={this.close}>취소</button>
          <button onClick={this.apply}>설정</button>
        </p>
      </StyledDateRangePicker>
    );
  }
}

export default DateRangePicker;
