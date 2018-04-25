import styled, { css } from 'styled-components';
import AutosizeInput from 'react-input-autosize';
import { convert } from 'css-color-function';

import { color, border, text, fontSize, background } from '../styles/theme';

interface DropdownProps {
  focused: boolean;
  hasValue: boolean;
}

export const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  padding-top: 14px;
  border-bottom: 1px solid ${border.strong};
  ${(props: DropdownProps) => (props.focused ? onFocused : '')};
  ${(props: DropdownProps) => (props.hasValue ? hasValue : '')};
`;

export const DropdownControl = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const placeholderStyle = css`
  left: 5px;
  bottom: 0;
  font-size: ${fontSize.default};
  line-height: 30px;
  color: ${text.placeholder};
`;

interface LabelProps {
  asPlaceholder?: boolean;
}
export const Label = styled.span`
  position: absolute;
  bottom: 100%;
  left: 0;
  font-size: 11px;
  line-height: 14px;
  color: ${color.main};
  transition: bottom 0.2s linear, left 0.2s linear, line-height 0.2s linear,
    color 0.2s, font-size 0.1s;
  ${(props: LabelProps) => (props.asPlaceholder ? placeholderStyle : '')};
`;

export const Value = styled.div`
  padding-left: 5px;
  line-height: 30px;
  display: inline-block;
`;

export const Input = styled(AutosizeInput)`
  flex-grow: 1;
  & input {
    max-width: 100%;
    height: 30px;
    padding-left: 5px;
    border: 0;
    vertical-align: top;
    outline: none;
    box-sizing: content-box;
    -webkit-appearance: none;
    background: none;
  }
`;

const rotateArrow = css`
  transform: rotate(180deg) translateY(2px);
`;

interface ArrowProps {
  opened: boolean;
}

export const ToggleArrow = styled.button`
  &::before {
    content: '';
    display: inline-block;
    margin: 0 3px;
    border-width: 5px 5px 3px 5px;
    border-style: solid;
    border-color: ${border.strong} transparent transparent transparent;
    ${(props: ArrowProps) => (props.opened ? rotateArrow : '')};
  }
`;

export const ClearButton = styled.button`
  margin: 0 3px;
  &:focus,
  &:hover {
    color: ${color.warn};
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  left: 0;
  bottom: -14px;
  display: inline-block;
  padding: 1px 2px;
  margin: 0 3px;
  font-size: 11px;
  line-height: normal;
  color: ${color.warn};
  background: ${convert(`color(${color.warn} a(0.1))`)};
  border-radius: 3px;
`;

export const Menu = styled.div`
  position: absolute;
  width: 100%;
  max-height: 200px;
  border: 1px solid ${border.weak};
  box-sizing: border-box;
  background: white;
  overflow-y: scroll;
  z-index: 2;
  transform: translateY(1px);
  cursor: pointer;
  & .no-valid-option {
    display: block;
    padding: 8px 5px;
    font-size: ${fontSize.small};
    color: ${text.placeholder};
  }
`;

export const Option = styled.div`
  padding: 8px 5px;
  &.focused {
    background: ${background.hover};
  }
  &.disabled {
    color: ${text.placeholder};
    cursor: default;
  }
`;

/* Depends on Status */
const onFocused = css`
  border-bottom: 1px solid ${color.main};
  ${ToggleArrow}::before {
    border-color: ${color.main} transparent transparent transparent;
  }
`;

const hasValue = onFocused;