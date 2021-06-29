"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.termQuery = void 0;
/**
 *
 * @memberof term-level-queries
 * @description Assemble a termQuery fragment. Use this when you want to match a term exactly - normally this is used on a keyword mapping.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html}
 * @function termQuery
 * @param {Object} params
 * @param {string} params.field - the name of the field to perform the query against. Can be a dotted path like: publisher.name
 * @param {string} params.value - the value to look for
 * @returns {Object} a query fragment
 * @example
 *  termQuery({ field: 'name.keyword', value: 'some text' })
 */
function termQuery(_a) {
    var _b;
    var field = _a.field, value = _a.value;
    return {
        term: (_b = {},
            _b[field] = { value: value },
            _b),
    };
}
exports.termQuery = termQuery;
