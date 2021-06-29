"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPhraseQuery = void 0;
/**
 *
 * @memberof full-text-queries
 * @description Assemble a matchPhraseQuery fragment. Use this when you want to match a phrase exactly.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase.html}
 * @function matchPhraseQuery
 * @param {Object} params
 * @param {string} params.field - the name of the field to perform the query against. Can be a dotted path like: publisher.name
 * @param {string} params.value - the value to look for
 * @returns {Object} a query fragment
 * @example
 *  matchPhraseQuery({ field: 'name.keyword', value: 'some text' })
 */
function matchPhraseQuery(_a) {
    var _b;
    var field = _a.field, value = _a.value;
    return {
        match_phrase: (_b = {},
            _b[field] = value,
            _b),
    };
}
exports.matchPhraseQuery = matchPhraseQuery;
