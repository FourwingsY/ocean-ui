"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const If = props => {
    if (props.condition) {
        return props.children;
    }
    return null;
};
exports.default = If;
