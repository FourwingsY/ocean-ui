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
          {Object.keys(color).map(key => (
            <li key={key}>
              <ColorChip name={`color.${key}`} color={color[key]} />
            </li>
          ))}
          <br />
          {Object.keys(background).map(key => (
            <li key={key}>
              <ColorChip name={`background.${key}`} color={background[key]} />
            </li>
          ))}
          <br />
          {Object.keys(border).map(key => (
            <li key={key}>
              <ColorChip name={`border.${key}`} color={border[key]} />
            </li>
          ))}
          <br />
          {Object.keys(text).map(key => (
            <li key={key}>
              <ColorChip name={`text.${key}`} color={text[key]} />
            </li>
          ))}
        </ul>
        <h2>Sizes</h2>
        <ul className="sizes">
          {Object.keys(fontSize).map(key => (
            <li key={key}>
              <b>{`fontSize.${key}`}</b>
              <span>{fontSize[key]}</span>
            </li>
          ))}
        </ul>
      </StyledDefaultThemePreview>
    );
  }
}
const defaultUsage = `\
  import { defaultTheme } from 'ocean-ui';

  <ThemeProvider theme={defaultTheme}>
    <YourApp />
  </ThemeProvider>

  // on YourApp
  render() {
    return (
      ...
      <TextInput
        value={value}
        onChange={this.onChange}
        label="Label"
      />
      ...
    )
  }
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

  // 전체 테마를 덮어쓰려면 여기에서,
  <ThemeProvider theme={defaultTheme}>
    <YourApp />
  </ThemeProvider>

  // on YourApp
  render() {
    // 일부 지역적인 테마를 덮어쓰려면 여기에서 ThemeProvider를 사용합니다.
    return (
      <ThemeProvider theme={theme}>
        <TextInput
          value={value}
          onChange={this.onChange}
          label="Label"
        />
      </ThemeProvider>
    )
  }
`;

const themeInterface = `\
interface ThemeProviderProps {  
  theme: {
    color: {
      main: ColorInString; // like 'red' or
      warn: ColorInString; // like 'hsl(0, 100%, 50%)';
    },
    background: {
      default: ColorInString;
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
    'How to use theme',
    withState({ value: '' }, store => (
      <>
        <Documentation
          name="How to use theme"
          description="ThemeProvider 컴포넌트를 사용하여 테마를 제공해야 합니다. defaultTheme을 사용할 수 있습니다."
          usage={defaultUsage}
          tsInterface={themeInterface}
        >
          <TextInput
            value={store.state.value}
            onChange={value => {
              store.set({ value });
            }}
            label="Label"
          />
        </Documentation>
        <DefaultThemePreview />
      </>
    ))
  )
  .add(
    'How to use Custom theme',
    withState({ value: '' }, store => (
      <Documentation
        name="How to use Custom theme"
        description="커스텀 테마를 사용하여 전체 테마 혹은 일부 컴포넌트의 테마를 덮어쓸 수 있습니다"
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
