"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchQuery = void 0;
function matchQuery(_a) {
    var _b;
    var field = _a.field, value = _a.value, _c = _a.operator, operator = _c === void 0 ? "AND" : _c;
    return {
        match: (_b = {}, _b[field] = { query: value, operator: operator }, _b),
    };
}
exports.matchQuery = matchQuery;
