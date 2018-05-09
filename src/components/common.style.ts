import styled, { css } from 'styled-components';

const placeholderStyle = css`
  bottom: 0;
  left: 5px;
  font-size: ${props => props.theme.inputPlaceholder.fontSize};
  line-height: 30px;
  color: ${props => props.theme.inputPlaceholder.color};
  cursor: text;
`;

interface LabelProps {
  asPlaceholder: boolean;
}
export const Label = styled.span`
  position: absolute;
  bottom: 100%;
  left: 0;
  font-size: ${props => props.theme.inputLabel.fontSize};
  line-height: 14px;
  color: ${props => props.theme.inputLabel.color};
  transition: bottom 0.2s, left 0.2s, line-height 0.2s, color 0.2s,
    font-size 0.1s;
  pointer-events: none;
  ${(props: LabelProps) => (props.asPlaceholder ? placeholderStyle : '')};
`;

export const ClearButton = styled.button`
  color: ${props => props.theme.inputClearButton.color};
  background: none;
  border: 0;
  cursor: pointer;
  &:focus,
  &:hover {
    color: ${props => props.theme.inputClearButton.hoverColor};
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
  color: ${props => props.theme.inputErrorMessage.color};
  background: ${props => props.theme.inputErrorMessage.background};
  border-radius: 3px;
`;
