export function cardinalityAggregation({ name, field }) {
    return {
        [name]: { cardinality: { field } },
    };
}
