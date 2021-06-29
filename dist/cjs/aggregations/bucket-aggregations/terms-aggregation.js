"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.termsAggregation = void 0;
/**
 *
 * @memberof bucket-aggregations
 * @description Assemble a termsAggregation fragment.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html}
 * @function termsAggregation
 * @param {string} name - the label for the aggregation
 * @param {string} field - the field on which to aggregate - can be a dotted path like publisher.name
 * @param {number} size - the number of buckets to return
 * @returns {Object} a query fragment
 * @example
 *  termsAggregation({ name: '@type', field: '@type.keyword', size: 12 })
 */
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
