/**
 *
 * @memberof queries
 * @memberof term-level-queries
 * @description Assemble a rangeQuery fragment
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html}
 * @function rangeQuery
 * @param {Object} params
 * @param {string} params.field - the name of the field to perform the query against. Can be a dotted path like: publisher.name
 * @param {array} parmas.value - an array of bounds - [ min, max ]
 * @returns {Object} a query fragment
 * @example
 *  rangeQuery({ field: 'date', value: [ min, max] })
 */
export function rangeQuery({ field, value }) {
    return {
        range: {
            [field]: { gte: value[0], lte: value[1] },
        },
    };
}
