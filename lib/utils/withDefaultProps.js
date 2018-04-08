"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function withDefaultProps(defaultProps) {
    return Component => props => react_1.default.createElement(Component, Object.assign({}, defaultProps, props));
}
exports.default = withDefaultProps;
