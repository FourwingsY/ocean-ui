import styled from 'styled-components';

import { Label, ClearButton, ErrorMessage } from './common.style';
export { Label, ClearButton, ErrorMessage };

export const Input = styled.input`
  height: 30px;
  padding-left: 5px;
  border: 0;
  background: none;
`;

export const StyledTextInput = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  padding-top: 14px;
  text-align: left;
  border-bottom: 1px solid ${props => props.theme.color.highlight};
  & .text-input-control {
    display: flex;
    position: relative;
    align-items: center;
    & ${Input} {
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
