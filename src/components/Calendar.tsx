import React, { Component, MouseEvent } from 'react';
import { DateTime, Duration } from 'luxon';
import withDefaultProps from '../utils/withDefaultProps';

import {
  StyledCalendar,
  Navigator,
  DateSelector,
  DateCell,
  DateSelectorHeader,
  DateSelectorBody,
} from './Calendar.style';

interface Props {
  onSelect(selected: DateTime): void;
  dateRenderer(date: DateTime, view: DateTime): React.ReactNode;
  onMouseLeave?(e): void;
}

interface State {
  year: number;
  month: number;
}

const defaultDateRenderer = (date: DateTime, view: DateTime) => {
  const SUNDAY = 7;

  return (
    <DateCell
      sun={date.weekday === SUNDAY}
      today={date.hasSame(DateTime.local(), 'day')}
      n={date.month !== view.month}
    >
      {date.day}
    </DateCell>
  );
};

const doNothing = e => {};
const defaultProps: Props = {
  onSelect: doNothing,
  dateRenderer: defaultDateRenderer,
  onMouseLeave: doNothing,
};

class Calendar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      // Navigator
      year: DateTime.local().year,
      month: DateTime.local().month, // 0 for January
    };
  }

  /* Common Methods */
  private getCurrentView = () => {
    return DateTime.fromObject({
      year: this.state.year,
      month: this.state.month,
    });
  };

  private moveNavigator = (amount: number, unit: string) => (
    e: MouseEvent<HTMLElement>
  ) => {
    e.stopPropagation();
    const to = this.getCurrentView().plus({ [unit]: amount });
    this.setState({ year: to.year, month: to.month });
  };

  /* Selector Methods */
  private onClickDate = (date: DateTime) => (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.props.onSelect(date);
  };

  /* Renderer Methods */
  private renderNavigator() {
    const currentView = this.getCurrentView();

    return (
      <Navigator>
        <button className="prev" onClick={this.moveNavigator(-1, 'months')}>
          ◀
        </button>
        <span>{currentView.toFormat('yyyy MMMM')}</span>
        <button className="next" onClick={this.moveNavigator(1, 'months')}>
          ▶
        </button>
      </Navigator>
    );
  }

  private renderDateSelector() {
    return (
      <DateSelector>
        {this.renderDateSelectorHeader()}
        {this.renderDateSelectorBody()}
      </DateSelector>
    );
  }

  private renderDateSelectorHeader = () => {
    const days = [0, 1, 2, 3, 4, 5, 6];
    return (
      <DateSelectorHeader>
        {days.map(d => (
          <DateCell key={d} sun={d === 0}>
            {DateTime.local()
              .set({ weekday: d })
              .toFormat('ccc')}
          </DateCell>
        ))}
      </DateSelectorHeader>
    );
  };

  private renderDateSelectorBody() {
    const SUNDAY = 0;
    const SATURDAY = 6;
    const currentView = this.getCurrentView();
    const firstDateOfMonth = currentView.startOf('month');
    const firstDateOfCalendar = firstDateOfMonth.set({ weekday: SUNDAY });
    const lastDateOfMonth = currentView.endOf('month');
    const lastDateOfCalendar = lastDateOfMonth.set({ weekday: SATURDAY });

    const days: DateTime[] = [];
    let date = firstDateOfCalendar;

    const aDay = Duration.fromObject({ days: 1 });
    while (date < lastDateOfCalendar) {
      days.push(date);
      date = date.plus(aDay);
    }

    return <DateSelectorBody>{days.map(this.renderDate)}</DateSelectorBody>;
  }

  private renderDate = (date: DateTime) => {
    const view = this.getCurrentView();

    return (
      <span key={date.ordinal} onClick={this.onClickDate(date)}>
        {this.props.dateRenderer(date, view)}
      </span>
    );
  };

  public render() {
    return (
      <StyledCalendar
        className="calendar"
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.renderNavigator()}
        {this.renderDateSelector()}
      </StyledCalendar>
    );
  }
}

export default withDefaultProps(defaultProps)(Calendar);
