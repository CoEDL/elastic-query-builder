"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wildcardQuery = void 0;
function wildcardQuery(_a) {
    var _b;
    var field = _a.field, value = _a.value;
    return { wildcard: (_b = {}, _b[field] = value, _b) };
}
exports.wildcardQuery = wildcardQuery;
