import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { withState } from '@dump247/storybook-state';

import TextInput from '../components/TextInput';

import Documentation from './Documentation';

const TextInputProps = `\
  interface TextInputProps {
    value: string,
    onChange(changedValue: string): void,

    type?: string,
    autoFocus?: boolean,
    disabled?: boolean,
    label?: string,
    clearable?: boolean,

    onEnter?(): void,
    onClear?(): void,
    onFocus?(): void,
    onBlur?(): void,
  }
`;

const usage = `\
  <TextInput
    value={value}
    onChange={this.onChange}
    label="Label"
  />
`;

storiesOf('TextInput', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withState({ value: '' }, store => (
      <Documentation
        name="TextInput"
        description="Text 입력을 받는 컴포넌트."
        usage={usage}
        tsInterface={TextInputProps}
      >
        <TextInput
          value={store.state.value}
          onChange={value => {
            store.set({ value });
            action('onChange')(value);
          }}
          onEnter={action('onEnter')}
          onClear={action('onClear')}
          onFocus={action('onFocus')}
          onBlur={action('onBlur')}
          label={text('label', 'Label')}
          clearable={boolean('clearable', true)}
          disabled={boolean('disalbed', false)}
        />
      </Documentation>
    ))
  );
