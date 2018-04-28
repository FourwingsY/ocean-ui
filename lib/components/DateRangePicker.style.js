"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = require("styled-components");
const Calendar_style_1 = require("./Calendar.style");
const TextInput_style_1 = require("./TextInput.style");
exports.StyledDateRangePicker = styled_components_1.default.div `
  position: relative;
  width: 100%;
  text-align: center;
  & .calendar-layer {
    display: inline-block;
    & ${TextInput_style_1.StyledTextInput} {
      width: 120px;
    }
    & .fromto {
      margin: 0 10px;
    }
  }
`;
const selected = styled_components_1.css `
  background: #e9f2fb;
`;
const expected = styled_components_1.css `
  background: #d2e3f4;
  &:hover {
    background: #d2e3f4;
  }
`;
const rangeStart = styled_components_1.css `
  border-top-left-radius: 50%;
`;
const rangeEnd = styled_components_1.css `
  border-bottom-right-radius: 50%;
`;
exports.PickerCell = Calendar_style_1.DateCell.extend `
  ${(props) => (props.selected ? selected : '')};
  ${(props) => (props.selectedStart ? rangeStart : '')};
  ${(props) => (props.selectedEnd ? rangeEnd : '')};
  ${(props) => (props.expected ? expected : '')};
  ${(props) => (props.expectedStart ? rangeStart : '')};
  ${(props) => (props.expectedEnd ? rangeEnd : '')};
`;
