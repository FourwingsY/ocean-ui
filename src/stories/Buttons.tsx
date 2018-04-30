import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  WarnButton,
  CancelButton,
} from '../components/Buttons';

import Documentation from './Documentation';

const doNothing = () => {};

const defaultUsage = `\
  import {
    PrimaryButton,
    SecondaryButton,
    TertiaryButton,
    WarnButton,
    CancelButton,
  } from 'ocean-ui';

  <PrimaryButton onClick={doNothing} />
  <SecondaryButton onClick={doNothing} />
  <TertiaryButton onClick={doNothing} />
  <WarnButton onClick={doNothing} />
  <CancelButton onClick={doNothing} />
`;

const customUsage = `\
  import {
    PrimaryButton,
    SecondaryButton,
    TertiaryButton,
    WarnButton,
    CancelButton,
  } from 'ocean-ui';

  const customTheme = {
    buttons: {
      minWidth: '50px',
      height: '25px',
      fontSize: '10px',
    }
  }

  // or use functional theme

  const customThemeFunc = (parentTheme) => ({
    ...parentTheme,
    buttons: {
      minWidth: '50px',
      height: '25px',
      fontSize: '10px';
    }
  })

  <ThemeProvider theme={customTheme}>
    <PrimaryButton onClick={doNothing} />
    <SecondaryButton onClick={doNothing} />
    <TertiaryButton onClick={doNothing} />
    <WarnButton onClick={doNothing} />
    <CancelButton onClick={doNothing} />
  </ThemeProvider>
`;

const themeInterface = `\
interface ButtonsTheme {
  buttons: {
    minWidth: SizeInString;
    height: SizeInString;
    fontSize: SizeInString;
  },

  primary: {
    text: ColorInString;
    bg: ColorInString;
    bg_hover: ColorInString;
  },
  secondary: {
    text: ColorInString;
    border: ColorInString;
    bg: ColorInString;
    bg_hover: ColorInString;
  },
  tertiary: {
    text: ColorInString;
    border: ColorInString;
    bg: ColorInString;
    bg_hover: ColorInString;
  },
  warn: {
    text: ColorInString;
    border: ColorInString;
    bg: ColorInString;
    bg_hover: ColorInString;
  },
  cancel: {
    text: ColorInString;
    border: ColorInString;
    bg: ColorInString;
    bg_hover: ColorInString;
  },
  }
`;

const customTheme = {
  buttons: {
    minWidth: '50px',
    height: '25px',
    fontSize: '10px',
  },
};

storiesOf('Button', module)
  .add('default theme', () => (
    <Documentation
      name="Buttons"
      description="기본 버튼. Styled component button 엘리먼트."
      usage={defaultUsage}
      tsInterface={themeInterface}
    >
      <>
        <PrimaryButton onClick={doNothing}>확인</PrimaryButton>
        <SecondaryButton onClick={doNothing}>흐음</SecondaryButton>
        <TertiaryButton onClick={doNothing}>딴거</TertiaryButton>
        <WarnButton onClick={doNothing}>어허</WarnButton>
        <CancelButton onClick={doNothing}>안해</CancelButton>
      </>
    </Documentation>
  ))
  .add('custom theme', () => (
    <Documentation
      name="Customize ButtonsTheme"
      description="테마를 커스터마이징할 수 있습니다"
      usage={customUsage}
      tsInterface={themeInterface}
    >
      <ThemeProvider theme={customTheme}>
        <>
          <PrimaryButton onClick={doNothing}>확인</PrimaryButton>
          <SecondaryButton onClick={doNothing}>흐음</SecondaryButton>
          <TertiaryButton onClick={doNothing}>딴거</TertiaryButton>
          <WarnButton onClick={doNothing}>어허</WarnButton>
          <CancelButton onClick={doNothing}>안해</CancelButton>
        </>
      </ThemeProvider>
    </Documentation>
  ));
