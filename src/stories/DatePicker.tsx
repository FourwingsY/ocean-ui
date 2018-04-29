import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { withState } from '@dump247/storybook-state';
import { DateTime } from 'luxon';

import DatePicker from '../components/DatePicker';

import Documentation from './Documentation';

const DatePickerProps = `\
  interface Props {
    selectedDate: DateTime,
    onSelect(selectedDate: DateTime): void,

    label?: string,
  }
`;

const usage = `\
  <DatePicker
    selectedDate={this.state.selectedDate}
    onSelect={this.onSelect}
    label="Select your Birthday"
  />
`;

interface State {
  selectedDate: DateTime | null;
}
const initialState: State = {
  selectedDate: null,
};

storiesOf('Date/DatePicker', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withState(initialState, store => (
      <Documentation
        name="DatePicker"
        description="단일 일자 선택 기능을 위해 Calendar를 래핑한 컴포넌트."
        usage={usage}
        tsInterface={DatePickerProps}
      >
        <DatePicker
          selectedDate={store.state.selectedDate}
          onSelect={date => {
            store.set({ selectedDate: date });
            action('onSelect')(date);
          }}
          label={text('label', 'Select your Birthday')}
        />
      </Documentation>
    ))
  );
