import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../theme';

import TextInput from '../components/TextInput';

import Documentation from './Documentation';

const theme = {
  ...defaultTheme,
  color: {
    main: 'orange',
    warn: 'red',
  },
};

const defaultUsage = `\
  import { defaultTheme } from 'ocean-ui';

  <ThemeProvider theme={defaultTheme}>
    <TextInput
      value={value}
      onChange={this.onChange}
      label="Label"
    />
  </ThemeProvider>
`;

const customUsage = `\
  import { defaultTheme } from 'ocean-ui';
  
  const theme = {
    ...defaultTheme,
    color: {
      main: 'orange',
      warn: 'red',
    }
  };

  <ThemeProvider theme={theme}>
    <TextInput
      value={value}
      onChange={this.onChange}
      label="Label"
    />
  </ThemeProvider>
`;

const themeInterface = `\
{  
  theme: {
    color: {
      main: ColorInString; // like 'red' or
      warn: ColorInString; // like 'hsl(0, 100%, 50%)';
    },
    background: {
      white: ColorInString;
      hover: ColorInString;
    },
    text: {
      default: ColorInString;
      placeholder: ColorInString;
    },
    border: {
      dark: ColorInString;
      strong: ColorInString;
      weak: ColorInString;
    },
    fontSize: {
      large: SizeInString; // like '14px'
      default: SizeInString;
      small: SizeInString;
    },
  }
}
`;

storiesOf('Guide', module)
  .add(
    'default theme',
    withState({ value: '' }, store => (
      <Documentation
        name="Use ThemeProvider"
        description="ThemeProvider 컴포넌트를 사용하여 테마를 제공해야 합니다. defaultTheme을 사용할 수 있습니다."
        usage={defaultUsage}
        tsInterface={themeInterface}
      >
        <ThemeProvider theme={defaultTheme}>
          <TextInput
            value={store.state.value}
            onChange={value => {
              store.set({ value });
            }}
            label="Label"
          />
        </ThemeProvider>
      </Documentation>
    ))
  )
  .add(
    'custom theme',
    withState({ value: '' }, store => (
      <Documentation
        name="Use ThemeProvider with custom theme"
        description="커스텀 테마를 사용하여 테마를 덮어쓸 수 있습니다"
        usage={customUsage}
        tsInterface={themeInterface}
      >
        <ThemeProvider theme={theme}>
          <TextInput
            value={store.state.value}
            onChange={value => {
              store.set({ value });
            }}
            label="Label"
          />
        </ThemeProvider>
      </Documentation>
    ))
  );
