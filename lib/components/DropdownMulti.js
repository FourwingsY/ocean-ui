"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const classnames_1 = require("classnames");
const If_1 = require("./If");
const withDefaultProps_1 = require("../utils/withDefaultProps");
const DropdownMulti_style_1 = require("./DropdownMulti.style");
function mod(n, m) {
    if (n === 0) {
        return 0;
    }
    return (m % n + n) % n;
}
const defaultOptionRenderer = (option, labelKey) => (react_1.default.createElement("span", null, option && option[labelKey]));
const defaultFilterOptions = (givenOptions, currentSelected, inputValue, labelKey) => {
    let options = givenOptions.filter(o => !currentSelected.includes(o));
    if (inputValue) {
        options = options.filter(o => (o[labelKey] || '').indexOf(inputValue) >= 0);
    }
    return options;
};
class Dropdown extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            inputFocused: this.props.autoFocus || false,
            inputValue: '',
            focusedOption: this.props.value,
            menuOpened: false,
        };
        // data cache
        this.filteredOptions = [];
        this.onInputChange = (e) => {
            const inputValue = e.target.value;
            this.setState(prevState => (Object.assign({}, prevState, { inputValue, menuOpened: true })));
        };
        this.onInputFocus = e => {
            this.setState(prevState => (Object.assign({}, prevState, { inputFocused: true, menuOpened: true })));
            this.props.onFocus(e);
        };
        this.onInputBlur = e => {
            this.setState(prevState => (Object.assign({}, prevState, { inputFocused: false })));
            this.props.onBlur(e);
        };
        this.onKeyDown = (e) => {
            switch (e.keyCode) {
                case 9: {
                    // tab
                    if (e.shiftKey || !this.state.menuOpened) {
                        return;
                    }
                    this.selectFocusedOption();
                    this.closeMenu();
                    break;
                }
                case 13: {
                    // enter
                    if (!this.state.menuOpened) {
                        return;
                    }
                    e.stopPropagation();
                    this.selectFocusedOption();
                    break;
                }
                case 27: {
                    // escape
                    if (this.state.menuOpened) {
                        this.closeMenu();
                        e.stopPropagation();
                    }
                    break;
                }
                case 38: {
                    // up
                    const prevOption = this.lookupPreviousOption();
                    this.focusOption(prevOption)();
                    break;
                }
                case 40: {
                    // down
                    const nextOption = this.lookupNextOption();
                    this.focusOption(nextOption)();
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
            if (!this.state.menuOpened) {
                this.setState(prevState => (Object.assign({}, prevState, { menuOpened: true })));
            }
            this.focusInput();
        };
        // stop propagation to dropdown control, but focus on input
        this.onMouseDownOnMenu = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.focusInput();
        };
        this.onMouseDownOnArrow = (e) => {
            // will not rendered on disabled
            // if (this.props.disabled) {
            //   return
            // }
            e.stopPropagation();
            e.preventDefault();
            this.setState({
                menuOpened: !this.state.menuOpened,
            });
        };
        this.onMouseDownOutside = e => {
            if (!this.wrapper) {
                return;
            }
            if (!this.wrapper.contains(e.target)) {
                this.closeMenu();
            }
        };
        this.selectOption = (option) => () => {
            if (this.props.disableOption(option)) {
                return;
            }
            // this.blurInput();
            this.setState(prevState => (Object.assign({}, prevState, { 
                // menuOpened: false,
                inputValue: '' })));
            this.props.onChange([...this.props.value, option]);
        };
        this.selectFocusedOption = () => {
            // this.blurInput();
            this.setState(prevState => (Object.assign({}, prevState, { focusedOption: null, 
                // menuOpened: false,
                inputValue: '' })));
            this.props.onChange([...this.props.value, this.state.focusedOption]);
        };
        this.removeValue = (option) => () => {
            this.props.onChange(this.props.value.filter(o => o !== option));
        };
        this.clearValues = (e) => {
            e.stopPropagation();
            this.props.onChange([]);
            this.focusInput();
            this.setState(prevState => (Object.assign({}, prevState, { inputValue: '' })));
        };
        this.focusOption = (option) => () => {
            if (!option) {
                return;
            }
            if (this.props.disableOption(option)) {
                return;
            }
            this.setState(prevState => (Object.assign({}, prevState, { focusedOption: option })));
            this.scrollToFocusedOption(option);
        };
        /**
         * Render Functions
         */
        this.renderValue = value => {
            const { valueRenderer, labelKey, disabled } = this.props;
            return (react_1.default.createElement(DropdownMulti_style_1.Value, null,
                valueRenderer(value, labelKey),
                react_1.default.createElement(If_1.default, { condition: !disabled },
                    react_1.default.createElement("span", { className: "remove-value", onClick: this.removeValue(value) }, "\u2715"))));
        };
        this.renderOption = (option) => {
            const { valueKey, labelKey, optionRenderer, disableOption } = this.props;
            const { focusedOption } = this.state;
            const disabled = disableOption(option);
            return (react_1.default.createElement(DropdownMulti_style_1.Option, { className: classnames_1.default('dropdown-option', {
                    focused: option === focusedOption,
                    disabled,
                }), key: option[valueKey], onClick: this.selectOption(option), onMouseOver: this.focusOption(option) }, optionRenderer(option, labelKey)));
        };
    }
    componentDidUpdate(_, prevState) {
        if (prevState.menuOpened !== this.state.menuOpened) {
            this.toggleOutsideClickHandler(this.state.menuOpened);
        }
    }
    toggleOutsideClickHandler(menuOpened) {
        if (menuOpened) {
            document.addEventListener('mousedown', this.onMouseDownOutside);
        }
        else {
            document.removeEventListener('mousedown', this.onMouseDownOutside);
        }
    }
    focusInput() {
        this.input.focus();
    }
    // not used in this component
    // private blurInput() {
    //   this.input.blur();
    // }
    closeMenu() {
        this.setState({
            menuOpened: false,
        });
    }
    lookupPreviousOption() {
        const { focusedOption } = this.state;
        let startIndex = 0;
        if (focusedOption) {
            startIndex = this.filteredOptions.findIndex(o => o === focusedOption);
        }
        let lookupIndex = mod(this.filteredOptions.length, startIndex - 1);
        while (true) {
            let lookupOption = this.filteredOptions[lookupIndex];
            // if prev option is not disabled, then
            if (!this.props.disableOption(lookupOption)) {
                return lookupOption;
            }
            // lookup for a loop, but nothing matched.
            if (lookupIndex === startIndex) {
                return null;
            }
            lookupIndex = mod(this.filteredOptions.length, lookupIndex - 1);
        }
    }
    lookupNextOption() {
        const { focusedOption } = this.state;
        let startIndex = Math.max(this.filteredOptions.length - 1, 0);
        if (focusedOption) {
            startIndex = this.filteredOptions.findIndex(o => o === focusedOption);
        }
        let lookupIndex = mod(this.filteredOptions.length, startIndex + 1);
        while (true) {
            let lookupOption = this.filteredOptions[lookupIndex];
            // if next option is not disabled, then
            if (!this.props.disableOption(lookupOption)) {
                return lookupOption;
            }
            // lookup for a loop, but nothing matched.
            if (lookupIndex === startIndex) {
                return null;
            }
            lookupIndex = mod(this.filteredOptions.length, lookupIndex + 1);
        }
    }
    // this code is not testable in jsdom environment
    scrollToFocusedOption(option) {
        const index = this.filteredOptions.findIndex(o => o === option);
        const menuDOM = react_dom_1.default.findDOMNode(this.menu);
        if (!menuDOM) {
            return;
        }
        const focusedOptionDOM = menuDOM.children[index];
        const menuRect = menuDOM.getBoundingClientRect();
        const focusedOptionRect = focusedOptionDOM.getBoundingClientRect();
        if (focusedOptionRect.bottom > menuRect.bottom ||
            focusedOptionRect.top < menuRect.top) {
            menuDOM.scrollTop =
                focusedOptionDOM.offsetTop +
                    focusedOptionDOM.clientHeight -
                    menuDOM.offsetHeight;
        }
    }
    renderLabel() {
        const { inputFocused } = this.state;
        const { value, label } = this.props;
        const hasValue = value.length > 0;
        return react_1.default.createElement(DropdownMulti_style_1.Label, { asPlaceholder: !inputFocused && !hasValue }, label);
    }
    renderInput() {
        const { inputValue } = this.state;
        return (react_1.default.createElement(DropdownMulti_style_1.Input, { innerRef: c => {
                this.input = c;
            }, value: inputValue, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur }));
    }
    renderArrow() {
        return (react_1.default.createElement(DropdownMulti_style_1.ToggleArrow, { type: "button", opened: this.state.menuOpened, onMouseDown: this.onMouseDownOnArrow, tabIndex: -1 }));
    }
    renderClear() {
        return (react_1.default.createElement(DropdownMulti_style_1.ClearButton, { type: "button", className: "dropdown-clear", onClick: this.clearValues }, "\u2715"));
    }
    renderMenu() {
        const { options: givenOptions, labelKey, noValidOptionMessage, } = this.props;
        const { inputValue } = this.state;
        this.filteredOptions = this.props.filterOptions(givenOptions, this.props.value, inputValue, labelKey);
        return (react_1.default.createElement(DropdownMulti_style_1.Menu, { onMouseDown: this.onMouseDownOnMenu, innerRef: c => {
                this.menu = c;
            } },
            this.filteredOptions.map(this.renderOption),
            react_1.default.createElement(If_1.default, { condition: this.filteredOptions.length === 0 },
                react_1.default.createElement("span", { className: "no-valid-option" }, noValidOptionMessage))));
    }
    render() {
        const { className, label, value, searchable, clearable, disabled, errorMessage, } = this.props;
        const { menuOpened, inputFocused } = this.state;
        const hasValue = value.length > 0;
        return (react_1.default.createElement(DropdownMulti_style_1.StyledDropdown, { className: classnames_1.default('dropdown', className), focused: inputFocused, hasValue: hasValue, innerRef: c => (this.wrapper = c) },
            react_1.default.createElement(DropdownMulti_style_1.DropdownControl, { onMouseDown: this.onMouseDownOnControl, onKeyDown: this.onKeyDown },
                react_1.default.createElement(If_1.default, { condition: label }, this.renderLabel()),
                react_1.default.createElement(DropdownMulti_style_1.Values, null,
                    react_1.default.createElement(If_1.default, { condition: hasValue }, value.map(this.renderValue)),
                    react_1.default.createElement(If_1.default, { condition: searchable && !disabled }, this.renderInput())),
                react_1.default.createElement(If_1.default, { condition: hasValue && clearable && !disabled }, this.renderClear()),
                react_1.default.createElement(If_1.default, { condition: !disabled }, this.renderArrow())),
            react_1.default.createElement(If_1.default, { condition: errorMessage },
                react_1.default.createElement(DropdownMulti_style_1.ErrorMessage, null, errorMessage)),
            react_1.default.createElement(If_1.default, { condition: menuOpened }, this.renderMenu())));
    }
}
const defaultProps = {
    value: [],
    onFocus: () => { },
    onBlur: () => { },
    valueKey: 'value',
    labelKey: 'label',
    valueRenderer: defaultOptionRenderer,
    optionRenderer: defaultOptionRenderer,
    filterOptions: defaultFilterOptions,
    disableOption: option => !option || option.disabled,
    label: '',
    disabled: false,
    clearable: true,
    searchable: true,
    autoFocus: false,
    noValidOptionMessage: '선택 가능한 옵션이 없습니다',
};
exports.default = withDefaultProps_1.default(defaultProps)(Dropdown);
