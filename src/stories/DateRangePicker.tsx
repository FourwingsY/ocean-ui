import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { withState } from '@dump247/storybook-state';
import { DateTime } from 'luxon';

import DateRangePicker from '../components/DateRangePicker';

import Documentation from './Documentation';

const DateRangePickerProps = `\
  interface Props {
    selectedDate: DateTime,
    onSelect(selectedDate: DateTime): void,

    label?: string,
  }
`;

const usage = `\
  <DateRangePicker
    selectedDateRange={this.state.selectedDateRange}
    onSelect={this.onSelect}
    label="How Long did you work?"
  />
`;

interface State {
  selectedDateRange: [DateTime | null, DateTime | null];
}
const initialState: State = {
  selectedDateRange: [null, null],
};

storiesOf('Date/DateRangePicker', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withState(initialState, store => (
      <Documentation
        name="DateRangePicker"
        description="기간 선택 기능을 위해 Calendar를 래핑한 컴포넌트."
        usage={usage}
        tsInterface={DateRangePickerProps}
      >
        <DateRangePicker
          selectedDateRange={store.state.selectedDateRange}
          onSelect={dateRange => {
            store.set({ selectedDateRange: dateRange });
            action('onSelect')(dateRange);
          }}
          label={text('label', 'How Long did you work?')}
        />
      </Documentation>
    ))
  );
