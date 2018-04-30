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
exports.extendsButtonTheme = theme => {
    const { color, background, border, text, fontSize } = theme;
    return Object.assign({}, theme, { buttons: {
            minWidth: '120px',
            height: '32px',
            fontSize: fontSize.default,
        }, primary: {
            text: 'white',
            border: background.dark,
            bg: background.dark,
            bg_hover: css_color_function_1.convert(`color(${background.dark} l(30%))`),
        }, secondary: {
            text: text.dark,
            border: border.dark,
            bg: 'transparent',
            bg_hover: css_color_function_1.convert(`color(${background.dark} l(90%))`),
        }, tertiary: {
            text: color.main,
            border: color.main,
            bg: 'transparent',
            bg_hover: css_color_function_1.convert(`color(${color.main} l(90%))`),
        }, warn: {
            text: color.warn,
            border: color.warn,
            bg: 'transparent',
            bg_hover: css_color_function_1.convert(`color(${color.warn} l(90%))`),
        }, cancel: {
            text: text.placeholder,
            border: text.placeholder,
            bg: 'transparent',
            bg_hover: css_color_function_1.convert(`color(${text.placeholder} l(90%))`),
        } });
};
const baseTheme = {
    color,
    background,
    text,
    border,
    fontSize,
};
exports.defaultTheme = exports.extendsButtonTheme(baseTheme);
