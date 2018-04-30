import styled, { css } from 'styled-components';

import { Label, ClearButton, ErrorMessage } from './common.style';
export { Label, ClearButton, ErrorMessage };

export const Value = styled.div`
  padding-left: 5px;
  line-height: 30px;
  display: inline-block;
`;

export const Input = styled.input`
  max-width: 100%;
  height: 30px;
  padding-left: 5px;
  border: 0;
  vertical-align: top;
  outline: none;
  box-sizing: content-box;
  -webkit-appearance: none;
  background: none;
`;

const rotateArrow = css`
  transform: rotate(180deg) translateY(2px);
`;

interface ArrowProps {
  opened: boolean;
}

export const ToggleArrow = styled.button`
  padding: 0 5px;
  background: none;
  border: 0;
  cursor: pointer;
  &::before {
    content: '';
    display: inline-block;
    border-width: 5px 5px 3px 5px;
    border-style: solid;
    border-color: ${props => props.theme.dropdownArrow.color} transparent
      transparent transparent;
    ${(props: ArrowProps) => (props.opened ? rotateArrow : '')};
  }
`;

export const Menu = styled.div`
  position: absolute;
  width: 100%;
  max-height: 200px;
  border: 1px solid ${props => props.theme.dropdownMenu.borderColor};
  box-sizing: border-box;
  background: white;
  overflow-y: scroll;
  z-index: 2;
  transform: translateY(1px);
  cursor: pointer;
  & .no-valid-option {
    display: block;
    padding: 8px 5px;
    font-size: ${props => props.theme.dropdownMenu.noValidOptionFontSize};
    color: ${props => props.theme.dropdownMenu.noValidOptionColor};
  }
`;

export const Option = styled.div`
  padding: 8px 5px;
  &.focused {
    background: ${props => props.theme.dropdownOption.focusedBackground};
  }
  &.disabled {
    color: ${props => props.theme.dropdownOption.disabledColor};
    background: ${props => props.theme.dropdownOption.disabledBackground};
    cursor: default;
  }
`;

/* Depends on Status */
const onFocused = css`
  border-bottom: 1px solid ${props => props.theme.dropdown.focusBorderColor};
  ${ToggleArrow}::before {
    border-color: ${props => props.theme.dropdownArrow.focusedColor} transparent
      transparent transparent;
  }
`;

const hasValue = onFocused;

export const DropdownControl = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  & ${Input} {
    flex-grow: 1;
  }
`;

interface DropdownProps {
  focused: boolean;
  hasValue: boolean;
}

export const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  padding-top: 14px;
  border-bottom: 1px solid ${props => props.theme.dropdown.emptyBorderColor};
  ${(props: DropdownProps) => (props.focused ? onFocused : '')};
  ${(props: DropdownProps) => (props.hasValue ? hasValue : '')};
`;
