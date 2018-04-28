import styled, { css } from 'styled-components';
import { convert } from 'css-color-function';

const placeholderStyle = css`
  bottom: 0;
  left: 5px;
  font-size: ${props => props.theme.fontSize.default};
  line-height: 30px;
  color: ${props => props.theme.text.placeholder};
  cursor: text;
`;

interface LabelProps {
  asPlaceholder: boolean;
}
export const Label = styled.span`
  position: absolute;
  bottom: 100%;
  left: 0;
  font-size: 11px;
  line-height: 14px;
  color: ${props => props.theme.color.main};
  transition: bottom 0.2s linear, left 0.2s linear, line-height 0.2s linear,
    color 0.2s, font-size 0.1s;
  pointer-events: none;
  ${(props: LabelProps) => (props.asPlaceholder ? placeholderStyle : '')};
`;

export const Input = styled.input`
  height: 30px;
  padding-left: 5px;
  border: 0;
  background: none;
`;

export const ClearButton = styled.button`
  padding: 0 5px;
  background: none;
  border: 0;
  cursor: pointer;
  &:focus,
  &:hover {
    color: #d0021b;
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  display: inline-block;
  padding: 1px 2px;
  margin-top: 1px;
  font-size: 11px;
  line-height: normal;
  color: ${props => props.theme.color.warn};
  background: ${props => convert(`color(${props.theme.color.warn} a(0.1))`)};
  border-radius: 3px;
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
    & ${Input} {
      flex-grow: 1;
    }
    & ${ClearButton} {
      align-self: center;
      margin: 0 5px;
    }
    & .icon {
      align-self: center;
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
