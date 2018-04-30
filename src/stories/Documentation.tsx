import React, { Component, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

import { StyledDocumentation } from './Documentation.style';
import { defaultTheme } from '../theme';

import D2CodingWoff2 from '../../assets/fonts/d2coding-ligature.woff2';

interface Props {
  name: string;
  description?: string | ReactNode;
  usage?: string;
  tsInterface?: string;
}

export default class Documentation extends Component<Props> {
  render() {
    const { name, description, usage, tsInterface, children } = this.props;
    return (
      <StyledDocumentation>
        <style>{`
          @font-face {
            font-family: 'D2Coding';
            font-weight: 400;
            src: url('${D2CodingWoff2}') format('woff2');
          }
      
          body {
            font-family: D2Coding;
          }
        `}</style>
        <header>
          <h1>{name}</h1>
          <h2>{description}</h2>
        </header>
        <div className="preview">
          <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
        </div>
        <div className="detail">
          {usage && (
            <>
              <h3>Usage</h3>
              <SyntaxHighlighter language="jsx" style={okaidia}>
                {usage}
              </SyntaxHighlighter>
            </>
          )}
          {tsInterface && (
            <>
              <h3>Props interface (Typescript)</h3>
              <SyntaxHighlighter language="typescript" style={okaidia}>
                {tsInterface}
              </SyntaxHighlighter>
            </>
          )}
        </div>
      </StyledDocumentation>
    );
  }
}
