"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const Calendar_style_1 = require("./Calendar.style");
exports.StyledDatePicker = styled_components_1.default.div `
  width: 100%;
  text-align: center;
  & .calendar-layer {
    display: inline-block;
  }
`;
const selected = styled_components_1.css `
  background: ${props => props.theme.calendar.selected};
`;
exports.PickerCell = Calendar_style_1.DateCell.extend `
  ${(props) => (props.selected ? selected : '')};
`;
