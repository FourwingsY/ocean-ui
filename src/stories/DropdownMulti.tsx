import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { withState } from '@dump247/storybook-state';

import DropdownMulti from '../components/DropdownMulti';

import Documentation from './Documentation';

const DropdownProps = `\
  type Option = object

  interface Props {
    options: Option[]
    value: Option | null
    onChange: (option: Option) => void

    valueKey?: string
    labelKey?: string
    valueRenderer?: (selectedOption: Option, labelKey: string) => ReactNode
    optionRenderer?: (option: Option, labelKey: string) => ReactNode
    filterOptions?: (options: Option[], inputValue: string, labelKey: string) => Option[]
    disableOption?: (option: Option) => boolean
    label?: string
    noValidOptionMessage?: string

    onFocus: (e: FocusEvent) => void
    onBlur: (e: FocusEvent) => void

    disabled?: boolean
    clearable?: boolean
    searchable?: boolean
    autoFocus?: boolean
  }
`;

const defaultUsage = `\
  const Options = [
    { label: 'Option 0', value: 0 },
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
  ]

  <Dropdown
    options={Options}
    value={this.state.value}
    onChange={this.onChange}
    label="DropdownMulti"
  />
`;

const customRendererUsage = `\
  const Options = [
    { label: 'Option 0', value: 0 },
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
  ]

  const exampleOptionRenderer = (option, labelKey) => {
    if (!option) {
      return null
    }
    const kanjiEmoji = ['🐭', '🐮', '🐯', '🐰', '🐲']
    return <span>{kanjiEmoji[option.value]} {option[labelKey]}</span>
  }

  const exampleValueRenderer = (option, valueKey) => {
    if (!option) {
      return null
    }
    const kanjiEmoji = ['🐭', '🐮', '🐯', '🐰', '🐲']
    return <span>{kanjiEmoji[option.value]}</span>
  }

  <Dropdown
    options={Options}
    value={this.state.value}
    onChange={this.onChange}
    label="DropdownMulti"
    optionRenderer={exampleOptionRenderer}
    valueRenderer={exampleValueRenderer}
  />
`;

const disableOptionUsage = `\
  const Options = [
    { label: 'Option 0', value: 0 },
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
  ]

  const disableOddOption = option => {
    return option.value % 2 === 1
  }

  <Dropdown
    options={Options}
    value={this.state.value}
    onChange={this.onChange}
    label="DropdownMulti"
    disableOption={disableOddOption}
  />
`;

const noValidOptionUsage = `\
  const Options = []

  <Dropdown
    options={Options}
    value={this.state.value}
    onChange={this.onChange}
    label="DropdownMulti"
    noValidOptionMessage="use custom message"
  />
`;

const Options = [
  { label: 'Option 0', value: 0 },
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 4', value: 4 },
];

const exampleOptionRenderer = (option, labelKey) => {
  if (!option) {
    return null;
  }
  const kanjiEmoji = ['🐭', '🐮', '🐯', '🐰', '🐲'];
  return (
    <span>
      {kanjiEmoji[option.value]} {option[labelKey]}
    </span>
  );
};
const exampleValueRenderer = option => {
  if (!option) {
    return null;
  }
  const kanjiEmoji = ['🐭', '🐮', '🐯', '🐰', '🐲'];
  return <span>{kanjiEmoji[option.value]}</span>;
};

const disableOddOption = option => {
  return option.value % 2 === 1;
};

const emptyValue: any[] = [];

storiesOf('DropdownMulti', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withState({ value: emptyValue }, store => (
      <Documentation
        name="DropdownMulti"
        description="react-select의 간략화된 컴포넌트."
        usage={defaultUsage}
        tsInterface={DropdownProps}
      >
        <DropdownMulti
          options={Options}
          value={store.state.value}
          onChange={value => {
            store.set({ value });
            action('onChange')(value);
          }}
          label={text('label', 'Dropdown')}
          disabled={boolean('disabled', false)}
          clearable={boolean('clearable', true)}
          searchable={boolean('searchable', true)}
        />
      </Documentation>
    ))
  )
  .add(
    'custom option/value renderer',
    withState({ value: [Options[2]] }, store => (
      <Documentation
        name="DropdownMulti"
        description="react-select의 간략화된 컴포넌트."
        usage={customRendererUsage}
        tsInterface={DropdownProps}
      >
        <DropdownMulti
          options={Options}
          value={store.state.value}
          onChange={value => {
            store.set({ value });
            action('onChange')(value);
          }}
          label={text('label', 'Dropdown')}
          disabled={boolean('disabled', false)}
          clearable={boolean('clearable', true)}
          searchable={boolean('searchable', true)}
          optionRenderer={exampleOptionRenderer}
          valueRenderer={exampleValueRenderer}
        />
      </Documentation>
    ))
  )
  .add(
    'disable some options',
    withState({ value: emptyValue }, store => (
      <Documentation
        name="DropdownMulti"
        description="react-select의 간략화된 컴포넌트."
        usage={disableOptionUsage}
        tsInterface={DropdownProps}
      >
        <DropdownMulti
          options={Options}
          value={store.state.value}
          onChange={value => {
            store.set({ value });
            action('onChange')(value);
          }}
          label={text('label', 'Dropdown')}
          disabled={boolean('disabled', false)}
          clearable={boolean('clearable', true)}
          searchable={boolean('searchable', true)}
          disableOption={disableOddOption}
        />
      </Documentation>
    ))
  )
  .add(
    'no options available',
    withState({ value: emptyValue }, store => (
      <Documentation
        name="DropdownMulti"
        description="react-select의 간략화된 컴포넌트."
        usage={noValidOptionUsage}
        tsInterface={DropdownProps}
      >
        <DropdownMulti
          options={[]}
          value={store.state.value}
          onChange={value => {
            store.set({ value });
            action('onChange')(value);
          }}
          label={text('label', 'Dropdown')}
          disabled={boolean('disabled', false)}
          clearable={boolean('clearable', true)}
          searchable={boolean('searchable', true)}
          noValidOptionMessage={text(
            'noValidOptionMessage',
            'use custom message'
          )}
        />
      </Documentation>
    ))
  );
