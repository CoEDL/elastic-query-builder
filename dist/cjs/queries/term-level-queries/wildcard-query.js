"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wildcardQuery = void 0;
/**
 *
 * @memberof term-level-queries
 * @description Assemble a wildcardQuery fragment
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html}
 * @function wildcardQuery
 * @param {string} field - the name of the field to perform the query against. Can be a dotted path like: publisher.name
 * @param {string} value - the value to look for
 * @returns {Object} a query fragment
 * @example
 *  wildcardQuery({ field: 'name.keyword', value: 'some text' })
 */
function wildcardQuery(_a) {
    var _b;
    var field = _a.field, value = _a.value;
    return { wildcard: (_b = {}, _b[field] = value, _b) };
}
exports.wildcardQuery = wildcardQuery;
