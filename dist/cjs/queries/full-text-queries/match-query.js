"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchQuery = void 0;
/**
 *
 * @memberof full-text-queries
 * @description Assemble a matchQuery fragment. Use this when you want to match a set of words with an operator (AND or OR) exactly.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html}
 * @function matchQuery
 * @param {string} field - the name of the field to perform the query against. Can be a dotted path like: publisher.name
 * @param {string} value - the value to look for
 * @param {string} operator [ 'AND', 'OR' ] - the operator to use for the search
 * @returns {Object} a query fragment
 * @example
 *  matchQuery({ field: 'name.keyword', value: 'some text', operator: 'AND })
 * @example
 *   matchQuery({ field: 'name.keyword', value: 'some text', operator: 'OR})
 */
function matchQuery(_a) {
    var _b;
    var field = _a.field, value = _a.value, _c = _a.operator, operator = _c === void 0 ? "AND" : _c;
    return {
        match: (_b = {}, _b[field] = { query: value, operator: operator }, _b),
    };
}
exports.matchQuery = matchQuery;
