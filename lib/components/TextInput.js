"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const classnames_1 = require("classnames");
const If_1 = require("./If");
const withDefaultProps_1 = require("../utils/withDefaultProps");
const TextInput_style_1 = require("./TextInput.style");
const ignoreEvent = () => { };
exports.defaultProps = {
    type: 'text',
    label: '',
    autoFocus: false,
    disabled: false,
    clearable: true,
    onEnter: ignoreEvent,
    onClear: ignoreEvent,
    onFocus: ignoreEvent,
    onBlur: ignoreEvent,
};
class TextInput extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            focused: false,
        };
        this.onChange = (e) => {
            this.props.onChange(e.target.value);
        };
        this.onKeyDown = (e) => {
            const { keyCode } = e;
            const ENTER_KEY = 13;
            if (keyCode === ENTER_KEY) {
                this.props.onEnter(e);
            }
        };
        this.onClear = e => {
            this.props.onChange('');
            this.props.onClear(e);
        };
        this.onFocus = e => {
            this.props.onFocus(e);
            this.setState({
                focused: true,
            });
        };
        this.onBlur = e => {
            this.props.onBlur(e);
            this.setState({
                focused: false,
            });
        };
    }
    static getId() {
        TextInput.id += 1;
        return `text-input-${TextInput.id}`;
    }
    componentWillMount() {
        this.id = TextInput.getId();
    }
    render() {
        const { type, autoFocus, value, label, clearable, disabled, errorMessage, } = this.props;
        const { focused } = this.state;
        return (react_1.default.createElement(TextInput_style_1.StyledTextInput, { className: classnames_1.default({
                empty: value === '' && !focused,
                error: !!errorMessage,
            }) },
            react_1.default.createElement("div", { className: "text-input-control" },
                react_1.default.createElement(TextInput_style_1.Label, { asPlaceholder: value === '' && !focused },
                    react_1.default.createElement("span", null, label)),
                react_1.default.createElement(TextInput_style_1.Input, { type: type, autoFocus: autoFocus, id: this.id, value: value, onChange: this.onChange, onKeyDown: this.onKeyDown, onFocus: this.onFocus, onBlur: this.onBlur, disabled: disabled }),
                react_1.default.createElement(If_1.default, { condition: value !== '' && clearable && !disabled },
                    react_1.default.createElement(TextInput_style_1.ClearButton, { type: "button", onClick: this.onClear, tabIndex: -1 }, "\u2715")),
                this.props.children,
                react_1.default.createElement(If_1.default, { condition: !!errorMessage },
                    react_1.default.createElement(TextInput_style_1.ErrorMessage, null, errorMessage)))));
    }
}
TextInput.id = 0;
exports.default = withDefaultProps_1.default(exports.defaultProps)(TextInput);
