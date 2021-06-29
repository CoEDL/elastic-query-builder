"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeQuery = void 0;
/**
 *
 * @memberof term-level-queries
 * @description Assemble a rangeQuery fragment
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html}
 * @function rangeQuery
 * @param {string} field - the name of the field to perform the query against. Can be a dotted path like: publisher.name
 * @param {array} value - an array of bounds - [ min, max ]
 * @returns {Object} a query fragment
 * @example
 *  rangeQuery({ field: 'date', value: [ min, max] })
 */
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
