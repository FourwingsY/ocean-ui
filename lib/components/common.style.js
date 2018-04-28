"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const css_color_function_1 = require("css-color-function");
const placeholderStyle = styled_components_1.css `
  bottom: 0;
  left: 5px;
  font-size: ${props => props.theme.fontSize.default};
  line-height: 30px;
  color: ${props => props.theme.text.placeholder};
  cursor: text;
`;
exports.Label = styled_components_1.default.span `
  position: absolute;
  bottom: 100%;
  left: 0;
  font-size: 11px;
  line-height: 14px;
  color: ${props => props.theme.color.main};
  transition: bottom 0.2s linear, left 0.2s linear, line-height 0.2s linear,
    color 0.2s, font-size 0.1s;
  pointer-events: none;
  ${(props) => (props.asPlaceholder ? placeholderStyle : '')};
`;
exports.ClearButton = styled_components_1.default.button `
  background: none;
  border: 0;
  cursor: pointer;
  &:focus,
  &:hover {
    color: ${props => props.theme.color.warn};
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
  color: ${props => props.theme.color.warn};
  background: ${props => css_color_function_1.convert(`color(${props.theme.color.warn} a(0.1))`)};
  border-radius: 3px;
`;
