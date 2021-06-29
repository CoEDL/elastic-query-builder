/**
 *
 * @memberof term-level-queries
 * @description Assemble a wildcardQuery fragment
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html}
 * @function wildcardQuery
 * @param {Object} params
 * @param {string} params.field - the name of the field to perform the query against. Can be a dotted path like: publisher.name
 * @param {string} params.value - the value to look for
 * @returns {Object} a query fragment
 * @example
 *  wildcardQuery({ field: 'name.keyword', value: 'some text' })
 */
export declare function wildcardQuery({ field, value }: {
    field: string;
    value: string;
}): {
    wildcard: {
        [x: string]: string;
    };
};
