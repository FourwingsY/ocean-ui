import React, { Component, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import Highlight from 'react-highlight';

import { StyledDocumentation } from './style';
import { defaultTheme } from '../theme';

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
              <Highlight className="javascript">{usage}</Highlight>
            </>
          )}
          {tsInterface && (
            <>
              <h3>Props interface (Typescript)</h3>
              <Highlight className="typescript">{tsInterface}</Highlight>
            </>
          )}
        </div>
      </StyledDocumentation>
    );
  }
}
