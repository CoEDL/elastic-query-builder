export function simpleAggregation({
    path,
    field,
    size = 10,
}: {
    path?: string | any;
    field: string;
    size: number;
}) {
    return {
        [path]: {
            terms: { field: `${path}.${field}`, size },
        },
        [`${path}_count`]: { cardinality: { field: `${path}.${field}` } },
    };
}
