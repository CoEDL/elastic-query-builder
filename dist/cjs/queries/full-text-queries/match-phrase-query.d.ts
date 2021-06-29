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
export declare function matchPhraseQuery({ field, value }: {
    field: string;
    value: string;
}): {
    match_phrase: {
        [x: string]: string;
    };
};
