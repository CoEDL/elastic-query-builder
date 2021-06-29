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
export function wildcardQuery({ field, value }) {
    return { wildcard: { [field]: value } };
}
