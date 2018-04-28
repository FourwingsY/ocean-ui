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

export const ClearButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  &:focus,
  &:hover {
    color: ${props => props.theme.color.warn};
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: inline-block;
  padding: 1px 2px;
  margin: 1px 3px 0;
  font-size: 11px;
  line-height: normal;
  color: ${props => props.theme.color.warn};
  background: ${props => convert(`color(${props.theme.color.warn} a(0.1))`)};
  border-radius: 3px;
`;
