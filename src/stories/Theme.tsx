import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../theme';

import TextInput from '../components/TextInput';

import Documentation from './Documentation';

import { StyledDefaultThemePreview, StyledColorChip } from './Theme.style';

const theme = {
  ...defaultTheme,
  color: {
    main: 'orange',
    warn: 'red',
  },
};

function ColorChip(props) {
  return (
    <StyledColorChip>
      <b>{props.name}</b>
      <div style={{ backgroundColor: props.color }} />
      <span>{props.color}</span>
    </StyledColorChip>
  );
}
class DefaultThemePreview extends Component {
  render() {
    const { color, background, border, text, fontSize } = defaultTheme;
    return (
      <StyledDefaultThemePreview>
        <h2>Colors</h2>
        <ul className="colors">
          <li>
            <ColorChip name="color.main" color={color.main} />
          </li>
          <li>
            <ColorChip name="color.warn" color={color.warn} />
          </li>
          <li>
            <ColorChip name="background.white" color={background.white} />
          </li>
          <li>
            <ColorChip name="background.hover" color={background.hover} />
          </li>
          <li>
            <ColorChip name="border.strong" color={border.strong} />
          </li>
          <li>
            <ColorChip name="border.weak" color={border.weak} />
          </li>
          <li>
            <ColorChip name="text.default" color={text.default} />
          </li>
          <li>
            <ColorChip name="text.placeholder" color={text.placeholder} />
          </li>
        </ul>
        <h2>Sizes</h2>
        <ul className="sizes">
          <li>
            <b>fontSize.large</b>
            <span>{fontSize.large}</span>
          </li>
          <li>
            <b>fontSize.default</b>
            <span>{fontSize.default}</span>
          </li>
          <li>
            <b>fontSize.small</b>
            <span>{fontSize.small}</span>
          </li>
        </ul>
      </StyledDefaultThemePreview>
    );
  }
}
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
      <>
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
        <DefaultThemePreview />
      </>
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
