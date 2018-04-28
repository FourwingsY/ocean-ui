"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const css_color_function_1 = require("css-color-function");
const cell = {
    width: '34px',
    height: '28px',
    radius: '10px',
};
/* Layout */
exports.StyledCalendar = styled_components_1.default.div `
  position: relative;
  width: calc(${cell.width} * 7);
  padding: 15px;
  background: white;
  border: 1px solid ${props => props.theme.border.weak};
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  color: #434343;
  text-align: center;
`;
exports.Navigator = styled_components_1.default.div `
  position: relative;
  padding: 12px 0;
  text-align: center;
  & button {
    background: none;
    border: 0;
    cursor: pointer;
    min-width: 40px;
    height: 34px;
    vertical-align: middle;
    color: #bbb;
    top: 50%;
    transform: translateY(-50%);
  }
  & .Select-input input {
    height: auto;
  }
  & .prev,
  & .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) scaleX(0.6);
  }
  & .prev {
    left: 0;
  }
  & .next {
    right: 0;
  }
  & .year,
  & .month {
    display: inline-block;
    vertical-align: bottom;
    width: 70px;
    margin: 0 3px;
    font-size: 13px;
  }
  & .month {
    width: 50px;
  }
`;
exports.DateSelector = styled_components_1.default.div `
  display: inline-block;
  &.targeted .date-selector-body {
    & span {
      cursor: pointer;
    }
  }
`;
exports.DateSelectorHeader = styled_components_1.default.div `
  background: #f3f6f8;
  border-radius: 5px;
  margin-bottom: 5px;
  & span {
    cursor: default;
  }
`;
exports.DateSelectorBody = styled_components_1.default.div ``;
const today = styled_components_1.css `
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    display: block;
    width: 20px;
    height: 3px;
    background: #8cc054;
    z-index: 1;
  }
`;
const getDateColor = (props) => {
    const baseColor = props.sun ? '#f66e73' : '#434343';
    const opacity = props.n ? 0.5 : 1;
    return css_color_function_1.convert(`color(${baseColor} a(${opacity}))`);
};
exports.DateCell = styled_components_1.default('span') `
  position: relative;
  display: inline-block;
  width: ${cell.width};
  height: ${cell.height};
  line-height: calc(${cell.height} + 2px);
  color: ${props => getDateColor(props)};
  text-align: center;
  cursor: pointer;
  outline: none;
  &.selected {
    background: #d2e3f4;
  }
  ${props => (props.today ? today : '')};
`;
