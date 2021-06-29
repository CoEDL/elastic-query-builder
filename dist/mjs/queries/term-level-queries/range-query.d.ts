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
export declare function rangeQuery({ field, value }: {
    field: string;
    value: number[];
}): {
    range: {
        [x: string]: {
            gte: number;
            lte: number;
        };
    };
};
