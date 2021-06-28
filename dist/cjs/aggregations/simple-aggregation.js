"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleAggregation = void 0;
function simpleAggregation(_a) {
    var _b;
    var path = _a.path, field = _a.field, _c = _a.size, size = _c === void 0 ? 10 : _c;
    return _b = {},
        _b[path] = {
            terms: { field: path + "." + field, size: size },
        },
        _b[path + "_count"] = { cardinality: { field: path + "." + field } },
        _b;
}
exports.simpleAggregation = simpleAggregation;
