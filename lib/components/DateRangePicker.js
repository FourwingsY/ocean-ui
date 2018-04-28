"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const luxon_1 = require("luxon");
// import { PrimaryButton, SecondaryButton } from '@src/styles/buttons';
const Calendar_1 = require("./Calendar");
const TextInput_1 = require("./TextInput");
const If_1 = require("./If");
const DateRangePicker_style_1 = require("./DateRangePicker.style");
const Calendar_2 = require("../icons/Calendar");
function isDateInRange(dateRange, date) {
    const [start, end] = dateRange;
    if (!start || !end) {
        return false;
    }
    if (date < start) {
        return false;
    }
    if (end < date) {
        return false;
    }
    return true;
}
function flipIfReversed(dateRange) {
    const [start, end] = dateRange;
    if (!start || !end) {
        return dateRange;
    }
    if (end < start) {
        return [end, start];
    }
    return [start, end];
}
// hasSame is too slow on storybook for doing 35+ times every render.
function isSameDay(date, other) {
    if (date.day !== other.day) {
        return false;
    }
    return date.hasSame(other, 'day');
}
class DateRangePicker extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            focused: false,
            target: 'startDate',
            startDate: this.props.selectedDateRange[0],
            endDate: this.props.selectedDateRange[1],
            expectedRange: [null, null],
        };
        this.onFocus = () => {
            this.setState({ focused: true });
        };
        this.onClear = () => {
            this.props.onSelect([null, null]);
            this.close();
        };
        this.apply = () => {
            const { startDate, endDate } = this.state;
            // have both values
            if (!startDate || !endDate) {
                return;
            }
            // and pass the validation
            const error = this.validate();
            if (!error.startDate && !error.endDate) {
                this.props.onSelect([startDate, endDate]);
                this.close();
            }
        };
        this.close = () => {
            this.setState({
                focused: false,
                target: 'startDate',
                startDate: null,
                endDate: null,
            });
        };
        this.onSelect = (date) => {
            const target = this.state.target;
            const nextTarget = {
                startDate: 'endDate',
                endDate: 'startDate',
            }[target];
            const dateRange = this.updateDateRange(this.state.target, date);
            this.setState({
                target: nextTarget,
                startDate: dateRange[0],
                endDate: dateRange[1],
            });
        };
        this.updateDateRange = (target, date) => {
            let range;
            switch (target) {
                case 'startDate': {
                    return [date, date];
                }
                case 'endDate': {
                    range = [this.state.startDate, date];
                    return flipIfReversed(range);
                }
                default: {
                    return [null, null];
                }
            }
        };
        this.expectRange = (date) => () => {
            const dateRange = this.updateDateRange(this.state.target, date);
            this.setState({
                expectedRange: dateRange,
            });
        };
        this.resetExpectedRange = () => {
            this.setState({ expectedRange: [null, null] });
        };
        this.validate = () => {
            const noError = {
                startDate: undefined,
                endDate: undefined,
            };
            if (!this.props.validate) {
                return noError;
            }
            const errorMessages = this.props.validate.reduce((messages, validator) => {
                const error = validator([this.state.startDate, this.state.endDate]);
                if (error && !messages[error.target]) {
                    return Object.assign({}, messages, { [error.target]: error.errorMessage });
                }
                return messages;
            }, noError);
            return errorMessages;
        };
        this.getSummary = () => {
            const [startDate, endDate] = this.props.selectedDateRange;
            if (!startDate || !endDate) {
                return '';
            }
            const startDateSummary = startDate.toFormat('yy.MM.dd');
            const endDateSummary = endDate.toFormat('yy.MM.dd');
            return `${startDateSummary} ~ ${endDateSummary}`;
        };
        this.renderDate = (date, view) => {
            const { target, startDate, endDate, expectedRange } = this.state;
            const [expectStart, expectEnd] = expectedRange;
            const expecting = target === 'endDate';
            const selected = !expecting && isDateInRange([startDate, endDate], date);
            const expected = expecting && isDateInRange([expectStart, expectEnd], date);
            return (react_1.default.createElement(DateRangePicker_style_1.PickerCell, { sun: date.weekday === 7, today: isSameDay(date, luxon_1.DateTime.local()), n: date.month !== view.month, selected: selected, selectedStart: selected && isSameDay(date, startDate), selectedEnd: selected && isSameDay(date, endDate), expected: expected, expectedStart: expected && isSameDay(date, expectStart), expectedEnd: expected && isSameDay(date, expectEnd), onMouseOver: this.expectRange(date) }, date.day));
        };
    }
    render() {
        const { label, errorMessage } = this.props;
        const { focused, startDate, endDate } = this.state;
        const summary = this.getSummary();
        const errorMessages = this.validate();
        return (react_1.default.createElement(DateRangePicker_style_1.StyledDateRangePicker, { className: "date-range-picker" },
            react_1.default.createElement(TextInput_1.default, { value: summary, label: label, onChange: () => { }, onFocus: this.onFocus, onClear: this.onClear, errorMessage: errorMessage },
                react_1.default.createElement(Calendar_2.default, { onClick: this.onFocus })),
            react_1.default.createElement(If_1.default, { condition: focused },
                react_1.default.createElement("div", { className: "calendar-layer" },
                    react_1.default.createElement(Calendar_1.default, { onSelect: this.onSelect, dateRenderer: this.renderDate, onMouseLeave: this.resetExpectedRange }),
                    react_1.default.createElement("hr", null),
                    react_1.default.createElement(TextInput_1.default, { value: startDate ? startDate.toFormat('yy.MM.dd') : '', label: '시작일', onChange: () => { }, clearable: false, errorMessage: errorMessages.startDate }),
                    react_1.default.createElement("span", { className: "fromto" }, "~"),
                    react_1.default.createElement(TextInput_1.default, { value: endDate ? endDate.toFormat('yy.MM.dd') : '', label: '종료일', onChange: () => { }, clearable: false, errorMessage: errorMessages.endDate }))),
            react_1.default.createElement("p", { className: "buttons" },
                react_1.default.createElement("button", { onClick: this.close }, "\uCDE8\uC18C"),
                react_1.default.createElement("button", { onClick: this.apply }, "\uC124\uC815"))));
    }
}
exports.default = DateRangePicker;
