"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const Button = styled_components_1.default.button `
  font: ${props => props.theme.font};
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;
const NormalButton = Button.extend `
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
exports.PrimaryButton = NormalButton.extend `
  color: ${props => props.theme.primaryButton.text};
  border: 1px solid ${props => props.theme.primaryButton.border};
  background: ${props => props.theme.primaryButton.bg};
  &:hover {
    background: ${props => props.theme.primaryButton.bg_hover};
  }
`;
exports.SecondaryButton = NormalButton.extend `
  color: ${props => props.theme.secondaryButton.text};
  border: 1px solid ${props => props.theme.secondaryButton.border};
  background: ${props => props.theme.secondaryButton.bg};
  &:hover {
    background: ${props => props.theme.secondaryButton.bg_hover};
  }
`;
exports.TertiaryButton = NormalButton.extend `
  color: ${props => props.theme.tertiaryButton.text};
  border: 1px solid ${props => props.theme.tertiaryButton.border};
  background: ${props => props.theme.tertiaryButton.bg};
  &:hover {
    background: ${props => props.theme.tertiaryButton.bg_hover};
  }
`;
exports.WarnButton = NormalButton.extend `
  color: ${props => props.theme.warnButton.text};
  border: 1px solid ${props => props.theme.warnButton.border};
  background: ${props => props.theme.warnButton.bg};
  &:hover {
    background: ${props => props.theme.warnButton.bg_hover};
  }
`;
exports.CancelButton = NormalButton.extend `
  color: ${props => props.theme.cancelButton.text};
  border: 1px solid ${props => props.theme.cancelButton.border};
  background: ${props => props.theme.cancelButton.bg};
  &:hover {
    background: ${props => props.theme.cancelButton.bg_hover};
  }
`;
exports.CloseButton = Button.extend `
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
