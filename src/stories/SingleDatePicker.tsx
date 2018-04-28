import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import { withState } from '@dump247/storybook-state';
import { DateTime } from 'luxon';

import SingleDatePicker from '../components/SingleDatePicker';

import Documentation from './Documentation';

const SingleDatePickerProps = `\
  interface Props {
    selectedDate: DateTime,
    onSelect(selectedDate: DateTime): void,

    label?: string,
  }
`;

const usage = `\
  <SingleDatePicker
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

storiesOf('SingleDatePicker', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withState(initialState, store => (
      <Documentation
        name="SingleDatePicker"
        description="단일 일자 선택 기능을 위해 Calendar를 래핑한 컴포넌트."
        usage={usage}
        tsInterface={SingleDatePickerProps}
      >
        <SingleDatePicker
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
