import styled from 'styled-components';

const Button = styled.button`
  font: ${props => props.theme.font};
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;

const NormalButton = Button.extend`
  display: inline-block;
  min-width: ${props => props.theme.buttons.minWidth};
  height: ${props => props.theme.buttons.height};
  line-height: ${props => props.theme.buttons.height};
  padding: 0;
  margin: 0 5px;
  vertical-align: top;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: ${props => props.theme.buttons.fontSize};
  text-align: center;
`;

export const PrimaryButton = NormalButton.extend`
  color: ${props => props.theme.primary.text};
  border: 1px solid ${props => props.theme.primary.border};
  background: ${props => props.theme.primary.bg};
  &:hover {
    background: ${props => props.theme.primary.bg_hover};
  }
`;

export const SecondaryButton = NormalButton.extend`
  color: ${props => props.theme.secondary.text};
  border: 1px solid ${props => props.theme.secondary.border};
  background: ${props => props.theme.secondary.bg};
  &:hover {
    background: ${props => props.theme.secondary.bg_hover};
  }
`;

export const TertiaryButton = NormalButton.extend`
  color: ${props => props.theme.tertiary.text};
  border: 1px solid ${props => props.theme.tertiary.border};
  background: ${props => props.theme.tertiary.bg};
  &:hover {
    background: ${props => props.theme.tertiary.bg_hover};
  }
`;

export const WarnButton = NormalButton.extend`
  color: ${props => props.theme.warn.text};
  border: 1px solid ${props => props.theme.warn.border};
  background: ${props => props.theme.warn.bg};
  &:hover {
    background: ${props => props.theme.warn.bg_hover};
  }
`;

export const CancelButton = NormalButton.extend`
  color: ${props => props.theme.cancel.text};
  border: 1px solid ${props => props.theme.cancel.border};
  background: ${props => props.theme.cancel.bg};
  &:hover {
    background: ${props => props.theme.cancel.bg_hover};
  }
`;

export const CloseButton = Button.extend`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;

  &::after {
    content: '✕';
    font-size: 20px;
  }
`;
