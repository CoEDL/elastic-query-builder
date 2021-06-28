"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.termQuery = void 0;
function termQuery(_a) {
    var _b;
    var field = _a.field, value = _a.value;
    return {
        term: (_b = {},
            _b[field] = { value: value },
            _b),
    };
}
exports.termQuery = termQuery;
