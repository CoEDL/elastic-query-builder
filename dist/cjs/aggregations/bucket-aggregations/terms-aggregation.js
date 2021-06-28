"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.termsAggregation = void 0;
function termsAggregation(_a) {
    var _b;
    var name = _a.name, field = _a.field, _c = _a.size, size = _c === void 0 ? 10 : _c;
    return _b = {},
        _b[name] = {
            terms: { field: field, size: size },
        },
        _b;
}
exports.termsAggregation = termsAggregation;
