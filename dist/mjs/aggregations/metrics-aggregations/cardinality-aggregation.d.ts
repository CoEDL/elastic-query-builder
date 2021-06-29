/**
 *
 * @memberof metrics-aggregations
 * @description Assemble a cardinalityAggregation fragment. That is - count the uniq occurences in a field.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-cardinality-aggregation.html}
 * @function cardinalityAggregation
 * @param {Object} params
 * @param {string} params.name - the label for the aggregation
 * @param {string} params.field - the field on which to aggregate and count - can be a dotted path like publisher.field
 * @returns {Object} a query fragment
 * @example
 *  cardinalityAggregation({ name: '@type', field: '@type.keyword' })
 */
export declare function cardinalityAggregation({ name, field }: {
    name: string;
    field: string;
}): {
    [x: string]: {
        cardinality: {
            field: string;
        };
    };
};
