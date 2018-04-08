"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const react_input_autosize_1 = require("react-input-autosize");
const css_color_function_1 = require("css-color-function");
const theme_1 = require("../styles/theme");
exports.StyledDropdown = styled_components_1.default.div `
  position: relative;
  display: inline-block;
  width: 100%;
  height: 30px;
  margin-top: 14px;
  border-bottom: 1px solid ${theme_1.border.strong};
  ${(props) => (props.focused ? onFocused : '')};
  ${(props) => (props.hasValue ? hasValue : '')};
`;
exports.DropdownControl = styled_components_1.default.div `
  position: relative;
  cursor: pointer;
`;
const placeholderStyle = styled_components_1.css `
  transform: translate(5px, 0);
  font-size: ${theme_1.fontSize.default};
  line-height: 30px;
  color: ${theme_1.text.placeholder};
`;
exports.Label = styled_components_1.default.span `
  position: absolute;
  top: 0;
  left: 0;
  font-size: 11px;
  line-height: 14px;
  color: ${theme_1.color.main};
  transform: translate(0, -100%);
  transition: transform 0.2s linear, line-height 0.2s linear, color 0.2s,
    font-size 0.1s;
  ${(props) => (props.asPlaceholder ? placeholderStyle : '')};
`;
exports.Value = styled_components_1.default.div `
  position: absolute;
  top: 0;
  left: 5px;
  line-height: 30px;
  display: inline-block;
`;
exports.Input = styled_components_1.default(react_input_autosize_1.default) `
  width: calc(100% - 40px);
  & input {
    max-width: 100%;
    height: 30px;
    padding-left: 5px;
    border: 0;
    outline: none;
    box-sizing: content-box;
    -webkit-appearance: none;
    background: none;
  }
`;
const rotateArrow = styled_components_1.css `
  transform: rotate(180deg) translateY(2px);
`;
exports.ToggleArrow = styled_components_1.default.button `
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translate(0, -50%);
  cursor: pointer;
  &::before {
    content: '';
    display: inline-block;
    border-width: 5px 5px 3px 5px;
    border-style: solid;
    border-color: ${theme_1.border.strong} transparent transparent transparent;
    ${(props) => (props.opened ? rotateArrow : '')};
  }
`;
exports.ClearButton = styled_components_1.default.button `
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);
  cursor: pointer;
  &:focus,
  &:hover {
    color: ${theme_1.color.warn};
  }
`;
exports.ErrorMessage = styled_components_1.default.div `
  position: absolute;
  left: 0;
  bottom: -14px;
  display: inline-block;
  padding: 1px 2px;
  font-size: 11px;
  line-height: normal;
  color: ${theme_1.color.warn};
  background: ${css_color_function_1.convert(`color(${theme_1.color.warn} a(0.1))`)};
  border-radius: 3px;
`;
exports.Menu = styled_components_1.default.div `
  position: absolute;
  width: 100%;
  max-height: 200px;
  border: 1px solid ${theme_1.border.weak};
  box-sizing: border-box;
  background: white;
  overflow: scroll;
  z-index: 2;
  transform: translateY(1px);
  cursor: pointer;
  & .no-valid-option {
    display: block;
    padding: 8px 5px;
    font-size: ${theme_1.fontSize.small};
    color: ${theme_1.text.placeholder};
  }
`;
exports.Option = styled_components_1.default.div `
  padding: 8px 5px;
  &.focused {
    background: ${theme_1.background.hover};
  }
  &.disabled {
    color: ${theme_1.text.placeholder};
    cursor: default;
  }
`;
/* Depends on Status */
const onFocused = styled_components_1.css `
  border-bottom: 1px solid ${theme_1.color.main};
  ${exports.ToggleArrow}::before {
    border-color: ${theme_1.color.main} transparent transparent transparent;
  }
`;
const hasValue = onFocused;
