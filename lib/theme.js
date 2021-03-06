"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const css_color_function_1 = require("css-color-function");
const color = {
    main: 'hsl(210, 60%, 54%)',
    warn: 'hsl(345, 48%, 54%)',
};
const background = {
    default: 'white',
    dark: 'hsl(210, 10%, 10%)',
    hover: 'hsla(210, 60%, 54%, 0.1)',
};
const text = {
    default: 'hsl(210, 10%, 25%)',
    dark: 'hsl(210, 10%, 10%)',
    placeholder: 'hsl(210, 10%, 70%)',
};
const border = {
    dark: 'hsl(210, 10%, 10%)',
    strong: 'hsl(210, 10%, 70%)',
    weak: 'hsl(210, 10%, 90%)',
};
const fontSize = {
    large: '16px',
    default: '14px',
    small: '12px',
};
const shadow = {
    layer: '1px 1px 3px rgba(0, 0, 0, 0.1)',
};
const baseTheme = {
    color,
    background,
    text,
    border,
    fontSize,
    shadow,
};
exports.extendsButtonTheme = (theme) => {
    const { color, background, border, text, fontSize } = theme;
    return Object.assign({}, theme, { buttons: {
            minWidth: '120px',
            height: '32px',
            fontSize: fontSize.default,
        }, primaryButton: {
            text: 'white',
            border: background.dark,
            bg: background.dark,
            bg_hover: css_color_function_1.convert(`color(${background.dark} l(30%))`),
        }, secondaryButton: {
            text: text.dark,
            border: border.dark,
            bg: 'transparent',
            bg_hover: css_color_function_1.convert(`color(${background.dark} l(90%))`),
        }, tertiaryButton: {
            text: color.main,
            border: color.main,
            bg: 'transparent',
            bg_hover: css_color_function_1.convert(`color(${color.main} l(90%))`),
        }, warnButton: {
            text: color.warn,
            border: color.warn,
            bg: 'transparent',
            bg_hover: css_color_function_1.convert(`color(${color.warn} l(90%))`),
        }, cancelButton: {
            text: text.placeholder,
            border: text.placeholder,
            bg: 'transparent',
            bg_hover: css_color_function_1.convert(`color(${text.placeholder} l(90%))`),
        } });
};
exports.extendsInputTheme = (theme) => {
    const { background, text, fontSize } = theme;
    return Object.assign({}, theme, { inputPlaceholder: {
            color: text.placeholder,
            fontSize: fontSize.default,
        }, inputLabel: {
            color: color.main,
            fontSize: fontSize.small,
        }, inputClearButton: {
            color: text.default,
            hoverColor: color.warn,
        }, inputErrorMessage: {
            color: color.warn,
            background: css_color_function_1.convert(`color(${color.warn} a(0.1))`),
        }, inputWrapper: {
            fontSize: fontSize.default,
            emptyBorderColor: border.strong,
            errorBorderColor: color.warn,
            focusBorderColor: color.main,
        }, dropdownArrow: {
            color: border.strong,
            focusedColor: color.main,
        }, dropdownMenu: {
            borderColor: border.weak,
            noValidOptionFontSize: fontSize.small,
            noValidOptionColor: text.placeholder,
        }, dropdownOption: {
            focusedBackground: background.hover,
            disabledColor: text.placeholder,
            disabledBackground: 'none',
        }, dropdown: {
            emptyBorderColor: border.strong,
            errorBorderColor: color.warn,
            focusBorderColor: color.main,
        }, dropdownMultiValue: {
            background: background.default,
            borderColor: border.weak,
        } });
};
exports.extendsCalendarTheme = (theme) => {
    const { background, text, fontSize } = theme;
    return Object.assign({}, theme, { calendar: {
            cellWidth: '34px',
            cellHeight: '28px',
            fontSize: fontSize.default,
            headerBackground: background.hover,
            weekdayColor: text.default,
            sundayColor: 'hsl(0, 80%, 50%)',
            todayColor: 'hsl(90, 50%, 50%)',
            expected: 'hsl(210, 70%, 95%)',
            selected: 'hsl(210, 70%, 90%)',
        } });
};
const compose = (...fns) => fns.reverse().reduce((prevFn, nextFn) => v => nextFn(prevFn(v)), v => v);
exports.defaultTheme = compose(exports.extendsButtonTheme, exports.extendsInputTheme, exports.extendsCalendarTheme)(baseTheme);
