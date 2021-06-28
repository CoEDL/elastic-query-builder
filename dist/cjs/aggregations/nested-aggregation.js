"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedAggregation = void 0;
function nestedAggregation(_a) {
    var _b;
    var path = _a.path, field = _a.field, _c = _a.size, size = _c === void 0 ? 10 : _c;
    return {
        size: 0,
        aggs: (_b = {},
            _b[path] = {
                nested: {
                    path: path,
                },
                aggs: {
                    values: {
                        terms: { field: path + "." + field, size: size },
                    },
                    count: {
                        cardinality: {
                            field: path + "." + field,
                            // precision_threshold: 30000
                        },
                    },
                },
            },
            _b),
    };
}
exports.nestedAggregation = nestedAggregation;
