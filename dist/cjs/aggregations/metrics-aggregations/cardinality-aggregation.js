"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardinalityAggregation = void 0;
function cardinalityAggregation(_a) {
    var _b;
    var name = _a.name, field = _a.field;
    return _b = {},
        _b[name] = { cardinality: { field: field } },
        _b;
}
exports.cardinalityAggregation = cardinalityAggregation;
