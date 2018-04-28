import styled from 'styled-components';

import { Label, ClearButton, ErrorMessage } from './common.style';
export { Label, ClearButton, ErrorMessage };

export const Input = styled.input`
  max-width: 100%;
  height: 30px;
  padding-left: 5px;
  border: 0;
  background: none;
  box-sizing: border-box;
`;

export const StyledTextInput = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  padding-top: 14px;
  font-size: ${props => props.theme.fontSize.default};
  text-align: left;
  border-bottom: 1px solid ${props => props.theme.color.highlight};
  & .text-input-control {
    display: flex;
    position: relative;
    align-items: center;
    & ${Input} {
      font-size: inherit;
      flex-grow: 1;
    }
    & .icon {
      margin: 0 5px;
      cursor: pointer;
    }
  }
  &.empty {
    border-color: ${props => props.theme.border.strong};
  }
  &.error {
    border-color: ${props => props.theme.color.warn};
  }
`;
