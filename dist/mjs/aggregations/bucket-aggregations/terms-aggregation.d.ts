/**
 *
 * @memberof bucket-aggregations
 * @description Assemble a termsAggregation fragment.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html}
 * @function termsAggregation
 * @param {Object} params
 * @param {string} params.name - the label for the aggregation
 * @param {string} params.field - the field on which to aggregate - can be a dotted path like publisher.name
 * @param {number} params.size - the number of buckets to return
 * @returns {Object} a query fragment
 * @example
 *  termsAggregation({ name: '@type', field: '@type.keyword', size: 12 })
 */
export declare function termsAggregation({ name, field, size, }: {
    name: string;
    field: string;
    size: number;
}): {
    [x: string]: {
        terms: {
            field: string;
            size: number;
        };
    };
};
