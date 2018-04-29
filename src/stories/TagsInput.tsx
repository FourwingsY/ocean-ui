import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { withState } from '@dump247/storybook-state';

import TagsInput from '../components/TagsInput';

import Documentation from './Documentation';

const DropdownProps = `\
  type Option = object

  interface Props {
    value: string[];
    onChange(changedValue: string[]): void;
  
    label?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    clearable?: boolean;
  
    onClear?(e): void;
    onFocus?(e): void;
    onBlur?(e): void;
  }
`;

const defaultUsage = `\
  <TagsInput
    value={this.state.value}
    onChange={this.onChange}
    label="String Array"
  />
`;

const emptyValue: string[] = [];

storiesOf('String/TagsInput', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withState({ value: emptyValue }, store => (
      <Documentation
        name="Tags Input"
        description="String array input을 위한 컴포넌트. 스페이스, 탭, 엔터, 콤마 키 입력시 태그를 구분한다."
        usage={defaultUsage}
        tsInterface={DropdownProps}
      >
        <TagsInput
          value={store.state.value}
          onChange={value => {
            store.set({ value });
            action('onChange')(value);
          }}
          label={text('label', 'String Array')}
          disabled={boolean('disabled', false)}
          clearable={boolean('clearable', true)}
        />
      </Documentation>
    ))
  );
