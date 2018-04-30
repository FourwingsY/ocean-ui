"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const common_style_1 = require("./common.style");
exports.Label = common_style_1.Label;
exports.ClearButton = common_style_1.ClearButton;
exports.ErrorMessage = common_style_1.ErrorMessage;
exports.Input = styled_components_1.default.input `
  max-width: 100%;
  height: 30px;
  padding-left: 5px;
  border: 0;
  background: none;
  box-sizing: border-box;
`;
exports.StyledTextInput = styled_components_1.default.div `
  position: relative;
  display: inline-block;
  width: 100%;
  padding-top: 14px;
  font-size: ${props => props.theme.fontSize.default};
  text-align: left;
  border-bottom: 1px solid ${props => props.theme.color.main};
  & .text-input-control {
    display: flex;
    position: relative;
    align-items: center;
    & ${exports.Input} {
      font-size: inherit;
      flex-grow: 1;
    }
    & .icon {
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
