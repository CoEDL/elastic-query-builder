export function cardinalityAggregation({ name, field }: { name: string; field: string }) {
    return {
        [name]: { cardinality: { field } },
    };
}
