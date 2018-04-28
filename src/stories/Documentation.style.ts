import styled from 'styled-components';

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
