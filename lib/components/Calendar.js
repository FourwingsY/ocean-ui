"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const luxon_1 = require("luxon");
const withDefaultProps_1 = require("../utils/withDefaultProps");
const Calendar_style_1 = require("./Calendar.style");
const defaultDateRenderer = (date, view) => {
    const SUNDAY = 7;
    return (react_1.default.createElement(Calendar_style_1.DateCell, { sun: date.weekday === SUNDAY, today: date.hasSame(luxon_1.DateTime.local(), 'day'), n: date.month !== view.month }, date.day));
};
const doNothing = () => { };
const defaultProps = {
    onSelect: doNothing,
    dateRenderer: defaultDateRenderer,
    onMouseLeave: doNothing,
};
class Calendar extends react_1.Component {
    constructor(props) {
        super(props);
        /* Common Methods */
        this.getCurrentView = () => {
            return luxon_1.DateTime.fromObject({
                year: this.state.year,
                month: this.state.month,
            });
        };
        this.moveNavigator = (amount, unit) => (e) => {
            e.stopPropagation();
            const to = this.getCurrentView().plus({ [unit]: amount });
            this.setState({ year: to.year, month: to.month });
        };
        /* Selector Methods */
        this.onClickDate = (date) => (e) => {
            e.stopPropagation();
            this.props.onSelect(date);
        };
        this.renderDateSelectorHeader = () => {
            const days = [0, 1, 2, 3, 4, 5, 6];
            return (react_1.default.createElement(Calendar_style_1.DateSelectorHeader, null, days.map(d => (react_1.default.createElement(Calendar_style_1.DateCell, { key: d, sun: d === 0 }, luxon_1.DateTime.local()
                .set({ weekday: d })
                .toFormat('ccc'))))));
        };
        this.renderDate = (date) => {
            const view = this.getCurrentView();
            return (react_1.default.createElement("span", { key: date.ordinal, onClick: this.onClickDate(date) }, this.props.dateRenderer(date, view)));
        };
        this.state = {
            // Navigator
            year: luxon_1.DateTime.local().year,
            month: luxon_1.DateTime.local().month,
        };
    }
    /* Renderer Methods */
    renderNavigator() {
        const currentView = this.getCurrentView();
        return (react_1.default.createElement(Calendar_style_1.Navigator, null,
            react_1.default.createElement("button", { className: "prev", onClick: this.moveNavigator(-1, 'months') }, "\u25C0"),
            react_1.default.createElement("span", null, currentView.toFormat('yyyy MMMM')),
            react_1.default.createElement("button", { className: "next", onClick: this.moveNavigator(1, 'months') }, "\u25B6")));
    }
    renderDateSelector() {
        return (react_1.default.createElement(Calendar_style_1.DateSelector, null,
            this.renderDateSelectorHeader(),
            this.renderDateSelectorBody()));
    }
    renderDateSelectorBody() {
        const SUNDAY = 0;
        const SATURDAY = 6;
        const currentView = this.getCurrentView();
        const firstDateOfMonth = currentView.startOf('month');
        const firstDateOfCalendar = firstDateOfMonth.set({ weekday: SUNDAY });
        const lastDateOfMonth = currentView.endOf('month');
        const lastDateOfCalendar = lastDateOfMonth.set({ weekday: SATURDAY });
        const days = [];
        let date = firstDateOfCalendar;
        const aDay = luxon_1.Duration.fromObject({ days: 1 });
        while (date < lastDateOfCalendar) {
            days.push(date);
            date = date.plus(aDay);
        }
        return react_1.default.createElement(Calendar_style_1.DateSelectorBody, null, days.map(this.renderDate));
    }
    render() {
        return (react_1.default.createElement(Calendar_style_1.StyledCalendar, { className: "calendar", onMouseLeave: this.props.onMouseLeave },
            this.renderNavigator(),
            this.renderDateSelector()));
    }
}
exports.default = withDefaultProps_1.default(defaultProps)(Calendar);
