import styled, { injectGlobal } from 'styled-components';

import D2CodingWoff2 from '../../assets/fonts/d2coding-ligature.woff2';

// Original highlight.js style
injectGlobal`
  @font-face {
    font-family: 'D2Coding';
    font-weight: 400;
    src: url('${D2CodingWoff2}') format('woff2');
  }

  body {
    font-family: D2Coding;
  }

  /*

  Atom One Dark by Daniel Gamage
  Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax

  base:    #282c34
  mono-1:  #abb2bf
  mono-2:  #818896
  mono-3:  #5c6370
  hue-1:   #56b6c2
  hue-2:   #61aeee
  hue-3:   #c678dd
  hue-4:   #98c379
  hue-5:   #e06c75
  hue-5-2: #be5046
  hue-6:   #d19a66
  hue-6-2: #e6c07b

  */

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #abb2bf;
    background: #282c34;
    font: 14px 'D2Coding';
  }

  .hljs-comment,
  .hljs-quote {
    color: #5c6370;
    font-style: italic;
  }

  .hljs-doctag,
  .hljs-keyword,
  .hljs-formula {
    color: #c678dd;
  }

  .hljs-section,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-deletion,
  .hljs-subst {
    color: #e06c75;
  }

  .hljs-literal {
    color: #56b6c2;
  }

  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta-string {
    color: #98c379;
  }

  .hljs-built_in,
  .hljs-class .hljs-title {
    color: #e6c07b;
  }

  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-type,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-number {
    color: #d19a66;
  }

  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-title {
    color: #61aeee;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .hljs-link {
    text-decoration: underline;
  }
`;

export const StyledDocumentation = styled.div`
  padding: 20px;
  h1 {
    margin-bottom: 10px;
    font-size: 25px;
    font-weight: bold;
  }
  h2 {
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }
  .preview {
    position: relative;
    padding: 20px;
    margin: 20px 0;
    background: #f8f9fa;
    &::before {
      content: 'Example';
      position: absolute;
      top: -5px;
      left: 0;
    }
  }
  h3 {
    font-size: 15px;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  pre {
    margin: 10px;
    margin-bottom: 20px;
    & code {
      padding: 20px;
    }
  }
`;
