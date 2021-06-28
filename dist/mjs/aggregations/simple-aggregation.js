export function simpleAggregation({ path, field, size = 10, }) {
    return {
        [path]: {
            terms: { field: `${path}.${field}`, size },
        },
        [`${path}_count`]: { cardinality: { field: `${path}.${field}` } },
    };
}
