"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const classnames_1 = require("classnames");
const withDefaultProps_1 = require("../utils/withDefaultProps");
const defaultProps = {
    width: 16,
    height: 16,
    fill: '#B1B9BB',
};
class Calendar extends react_1.PureComponent {
    render() {
        const _a = this.props, { className } = _a, rest = __rest(_a, ["className"]);
        return (react_1.default.createElement("svg", Object.assign({ className: classnames_1.default('icon calendar', className) }, rest, { viewBox: "0 0 16 16" }),
            react_1.default.createElement("title", null, "Calendar icon"),
            react_1.default.createElement("g", null,
                react_1.default.createElement("path", { d: `
						M4,0 L12,0 L11,0 L11,2 C11,2.55 11.44,3 12,3 L13,3 C13.55,3 14,2.55 14,2 L14,0.17 C15.16,0.58 16,1.69 16,3 L16,13 C16,14.65 14.66,16 13,16 L3,16 C1.34,16 0,14.66 0,13 L0,3 C0,1.69 0.82,0.58 2,0.17 L2,2 C2,2.55 2.44,3 2.99,3 L4,3 C4.55,3 5,2.55 5,2 L5,0 L4,0 Z
						M14,5 L2,5 L2,13 C2,13.55 2.45,14 3,14 L13,14 C13.55,14 14,13.55 14,13 L14,5 Z
						M12,0 L13,0 L13,1.5 C13,1.77 12.76,2 12.5,2 C12.22,2 12,1.78 12,1.5 L12,0 Z
						M3,0 L4,0 L4,1.5 C4,1.77 3.77,2 3.5,2 C3.22,2 3,1.79 3,1.5 L3,0 Z` }),
                react_1.default.createElement("g", { id: "rects" },
                    react_1.default.createElement("rect", { x: "4", y: "7", width: "2", height: "2" }),
                    react_1.default.createElement("rect", { x: "7", y: "7", width: "2", height: "2" }),
                    react_1.default.createElement("rect", { x: "10", y: "7", width: "2", height: "2" }),
                    react_1.default.createElement("rect", { x: "10", y: "10", width: "2", height: "2" }),
                    react_1.default.createElement("rect", { x: "7", y: "10", width: "2", height: "2" }),
                    react_1.default.createElement("rect", { x: "4", y: "10", width: "2", height: "2" })))));
    }
}
exports.default = withDefaultProps_1.default(defaultProps)(Calendar);
