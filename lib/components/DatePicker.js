"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const luxon_1 = require("luxon");
const Calendar_1 = require("./Calendar");
const TextInput_1 = require("./TextInput");
const If_1 = require("./If");
const Calendar_2 = require("../icons/Calendar");
const DatePicker_style_1 = require("./DatePicker.style");
class DatePicker extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            focused: false,
        };
        this.onFocus = () => {
            this.setState({ focused: true });
        };
        this.onBlur = () => {
            this.setState({ focused: false });
        };
        this.onClear = () => {
            this.props.onSelect(null);
        };
        this.onSelect = (date) => {
            this.props.onSelect(date);
            this.setState({ focused: false });
        };
        this.renderDate = (date, view) => {
            return (react_1.default.createElement(DatePicker_style_1.PickerCell, { sun: date.weekday === 7, today: date.hasSame(luxon_1.DateTime.local(), 'day'), n: date.month !== view.month, selected: this.props.selectedDate
                    ? date.hasSame(this.props.selectedDate, 'day')
                    : false }, date.day));
        };
    }
    render() {
        const { label, selectedDate, errorMessage, clearable = true } = this.props;
        const { focused } = this.state;
        return (react_1.default.createElement(DatePicker_style_1.StyledDatePicker, { className: "date-picker" },
            react_1.default.createElement(TextInput_1.default, { value: selectedDate ? selectedDate.toFormat('yyyy-MM-dd') : '', label: label, onChange: () => { }, onFocus: this.onFocus, onClear: this.onClear, errorMessage: errorMessage, clearable: clearable },
                react_1.default.createElement(Calendar_2.default, { onClick: this.state.focused ? this.onBlur : this.onFocus })),
            react_1.default.createElement(If_1.default, { condition: focused },
                react_1.default.createElement("div", { className: "calendar-layer" },
                    react_1.default.createElement(Calendar_1.default, { onSelect: this.onSelect, dateRenderer: this.renderDate })))));
    }
}
exports.default = DatePicker;
