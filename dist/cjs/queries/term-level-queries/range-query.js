"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeQuery = void 0;
function rangeQuery(_a) {
    var _b;
    var field = _a.field, value = _a.value;
    return {
        range: (_b = {},
            _b[field] = { gte: value[0], lte: value[1] },
            _b),
    };
}
exports.rangeQuery = rangeQuery;
