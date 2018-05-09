"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const placeholderStyle = styled_components_1.css `
  bottom: 0;
  left: 5px;
  font-size: ${props => props.theme.inputPlaceholder.fontSize};
  line-height: 30px;
  color: ${props => props.theme.inputPlaceholder.color};
  cursor: text;
`;
exports.Label = styled_components_1.default.span `
  position: absolute;
  bottom: 100%;
  left: 0;
  font-size: ${props => props.theme.inputLabel.fontSize};
  line-height: 14px;
  color: ${props => props.theme.inputLabel.color};
  transition: bottom 0.2s, left 0.2s, line-height 0.2s, color 0.2s,
    font-size 0.1s;
  pointer-events: none;
  ${(props) => (props.asPlaceholder ? placeholderStyle : '')};
`;
exports.ClearButton = styled_components_1.default.button `
  color: ${props => props.theme.inputClearButton.color};
  background: none;
  border: 0;
  cursor: pointer;
  &:focus,
  &:hover {
    color: ${props => props.theme.inputClearButton.hoverColor};
  }
`;
exports.ErrorMessage = styled_components_1.default.div `
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
