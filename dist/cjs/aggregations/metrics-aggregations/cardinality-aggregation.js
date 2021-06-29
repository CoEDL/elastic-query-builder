"use strict";
/**
 *
 * @memberof metrics-aggregations
 * @description Assemble a cardinalityAggregation fragment. That is - count the uniq occurences in a field.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html}
 * @function cardinalityAggregation
 * @param {Object} params
 * @param {string} params.name - the label for the aggregation
 * @param {string} params.field - the field on which to aggregate and count - can be a dotted path like publisher.field
 * @returns {Object} a query fragment
 * @example
 *  cardinalityAggregation({ name: '@type', field: '@type.keyword' })
 */
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
