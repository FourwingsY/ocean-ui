"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const common_style_1 = require("./common.style");
exports.Label = common_style_1.Label;
exports.ClearButton = common_style_1.ClearButton;
exports.ErrorMessage = common_style_1.ErrorMessage;
exports.Value = styled_components_1.default.div `
  padding-left: 5px;
  line-height: 30px;
  display: inline-block;
`;
exports.Input = styled_components_1.default.input `
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
const rotateArrow = styled_components_1.css `
  transform: rotate(180deg) translateY(2px);
`;
exports.ToggleArrow = styled_components_1.default.button `
  padding: 0 5px;
  background: none;
  border: 0;
  cursor: pointer;
  &::before {
    content: '';
    display: inline-block;
    border-width: 5px 5px 3px 5px;
    border-style: solid;
    border-color: ${props => props.theme.border.strong} transparent transparent
      transparent;
    ${(props) => (props.opened ? rotateArrow : '')};
  }
`;
exports.Menu = styled_components_1.default.div `
  position: absolute;
  width: 100%;
  max-height: 200px;
  border: 1px solid ${props => props.theme.border.weak};
  box-sizing: border-box;
  background: white;
  overflow-y: scroll;
  z-index: 2;
  transform: translateY(1px);
  cursor: pointer;
  & .no-valid-option {
    display: block;
    padding: 8px 5px;
    font-size: ${props => props.theme.fontSize.small};
    color: ${props => props.theme.text.placeholder};
  }
`;
exports.Option = styled_components_1.default.div `
  padding: 8px 5px;
  &.focused {
    background: ${props => props.theme.background.hover};
  }
  &.disabled {
    color: ${props => props.theme.text.placeholder};
    cursor: default;
  }
`;
/* Depends on Status */
const onFocused = styled_components_1.css `
  border-bottom: 1px solid ${props => props.theme.color.main};
  ${exports.ToggleArrow}::before {
    border-color: ${props => props.theme.color.main} transparent transparent
      transparent;
  }
`;
const hasValue = onFocused;
exports.DropdownControl = styled_components_1.default.div `
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  & ${exports.Input} {
    flex-grow: 1;
  }
`;
exports.StyledDropdown = styled_components_1.default.div `
  position: relative;
  display: inline-block;
  width: 100%;
  padding-top: 14px;
  border-bottom: 1px solid ${props => props.theme.border.strong};
  ${(props) => (props.focused ? onFocused : '')};
  ${(props) => (props.hasValue ? hasValue : '')};
`;
