"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const withDefaultProps_1 = require("../utils/withDefaultProps");
const If_1 = require("./If");
// TagsInput style is too similar with DropdownMulti
const DropdownMulti_style_1 = require("./DropdownMulti.style");
const doNothing = () => { };
exports.defaultProps = {
    label: '',
    autoFocus: false,
    disabled: false,
    clearable: true,
    onClear: doNothing,
    onFocus: doNothing,
    onBlur: doNothing,
};
class TagsInput extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputFocused: this.props.autoFocus,
            inputValue: '',
        };
        this.onInputChange = (e) => {
            const inputValue = e.target.value;
            this.setState(prevState => (Object.assign({}, prevState, { inputValue })));
        };
        this.onInputFocus = () => {
            this.setState(prevState => (Object.assign({}, prevState, { inputFocused: true })));
        };
        this.onInputBlur = () => {
            this.flush();
            this.setState(prevState => (Object.assign({}, prevState, { inputFocused: false })));
        };
        this.onKeyDown = (e) => {
            switch (e.keyCode) {
                // delete
                case 8: {
                    if (!this.state.inputValue) {
                        this.popTag();
                        return;
                    }
                }
                // tab, enter, space, comma
                case 9:
                case 13:
                case 32:
                case 188: {
                    if (!this.state.inputValue) {
                        return;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    this.flush();
                    break;
                }
            }
        };
        this.onMouseDownOnControl = (e) => {
            if (this.props.disabled) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            this.focusInput();
        };
        // input value를 비우고,
        // 해당 value를 tag로 전환한다.
        this.flush = () => {
            const newTag = this.state.inputValue;
            this.setState({ inputValue: '' });
            this.pushTag(newTag);
        };
        this.popTag = () => {
            this.props.onChange([...this.props.value.slice(0, -1)]);
        };
        this.pushTag = (newTag) => {
            if (!newTag) {
                return;
            }
            const tag = newTag.trim();
            if (!tag) {
                return;
            }
            // if comma-contained string is pasted
            const tags = tag.split(',');
            if (tags.length > 1) {
                return this.pushTags(tags);
            }
            // no duplicate
            if (this.props.value.includes(tag)) {
                return;
            }
            this.props.onChange([...this.props.value, tag]);
        };
        this.pushTags = (tags) => {
            const validTags = tags.map(tag => tag.trim()).filter(tag => tag.length > 0);
            const newTags = validTags.filter(tag => !this.props.value.includes(tag));
            this.props.onChange([...this.props.value, ...newTags]);
        };
        this.clearValue = (e) => {
            e.stopPropagation();
            this.props.onChange([]);
            this.focusInput();
            this.setState(prevState => (Object.assign({}, prevState, { inputValue: '' })));
        };
        this.removeValue = (option) => () => {
            this.props.onChange(this.props.value.filter(o => o !== option));
        };
        /**
         * Render Functions
         */
        this.renderValue = (value, index) => {
            return (react_1.default.createElement(DropdownMulti_style_1.Value, { className: "tag-input-value", key: index },
                value,
                react_1.default.createElement(If_1.default, { condition: !this.props.disabled },
                    react_1.default.createElement("span", { className: "remove-value", onClick: this.removeValue(value) }, "\u00D7"))));
        };
    }
    focusInput() {
        this.input.focus();
    }
    renderLabel() {
        const { inputFocused } = this.state;
        const { value, label } = this.props;
        const hasValue = value && value.length > 0;
        return react_1.default.createElement(DropdownMulti_style_1.Label, { asPlaceholder: !inputFocused && !hasValue }, label);
    }
    renderInput() {
        const { inputValue } = this.state;
        return (react_1.default.createElement(DropdownMulti_style_1.Input, { innerRef: c => {
                this.input = c;
            }, value: inputValue, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, onKeyDown: this.onKeyDown }));
    }
    renderClear() {
        return (react_1.default.createElement(DropdownMulti_style_1.ClearButton, { className: "tag-input-clear", onClick: this.clearValue }, "\u2715"));
    }
    render() {
        const { value, label, clearable, disabled } = this.props;
        const { inputFocused } = this.state;
        const hasValue = value && value.length > 0;
        return (react_1.default.createElement(DropdownMulti_style_1.StyledDropdown, { className: "tags-input", focused: inputFocused, hasValue: hasValue },
            react_1.default.createElement(DropdownMulti_style_1.DropdownControl, { onMouseDown: this.onMouseDownOnControl },
                react_1.default.createElement(If_1.default, { condition: Boolean(label) }, this.renderLabel()),
                react_1.default.createElement(DropdownMulti_style_1.Values, null,
                    react_1.default.createElement(If_1.default, { condition: hasValue }, value.map(this.renderValue)),
                    react_1.default.createElement(If_1.default, { condition: !disabled }, this.renderInput())),
                react_1.default.createElement(If_1.default, { condition: hasValue && clearable && !disabled }, this.renderClear()))));
    }
}
exports.default = withDefaultProps_1.default(exports.defaultProps)(TagsInput);
