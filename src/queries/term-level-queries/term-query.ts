/**
 *
 * @memberof term-level-queries
 * @description Assemble a termQuery fragment. Use this when you want to match a term exactly - normally this is used on a keyword mapping.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html}
 * @function termQuery
 * @param {string} field - the name of the field to perform the query against. Can be a dotted path like: publisher.name
 * @param {string} value - the value to look for
 * @returns {Object} a query fragment
 * @example
 *  termQuery({ field: 'name.keyword', value: 'some text' })
 */
export function termQuery({ field, value }: { field: string; value: string }) {
    return {
        term: {
            [field]: { value },
        },
    };
}
