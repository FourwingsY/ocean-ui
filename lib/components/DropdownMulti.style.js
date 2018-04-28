"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
var Dropdown_style_1 = require("./Dropdown.style");
exports.StyledDropdown = Dropdown_style_1.StyledDropdown;
exports.DropdownControl = Dropdown_style_1.DropdownControl;
exports.Label = Dropdown_style_1.Label;
exports.Input = Dropdown_style_1.Input;
exports.ToggleArrow = Dropdown_style_1.ToggleArrow;
exports.ClearButton = Dropdown_style_1.ClearButton;
exports.ErrorMessage = Dropdown_style_1.ErrorMessage;
exports.Menu = Dropdown_style_1.Menu;
exports.Option = Dropdown_style_1.Option;
exports.Values = styled_components_1.default.div `
  display: inline-block;
  flex-grow: 1;
  line-height: 30px;
`;
exports.Value = styled_components_1.default.div `
  display: inline-block;
  padding: 2px 5px;
  font-size: 12px;
  line-height: 18px;
  background: ${props => props.theme.background.white};
  border: 1px solid ${props => props.theme.border.weak};
  border-radius: 3px;
  margin: 2px;
  & .remove-value {
    margin-left: 3px;
    cursor: pointer;
  }
`;
