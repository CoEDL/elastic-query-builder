export function termsAggregation({
    name,
    field,
    size = 10,
}: {
    name: string;
    field: string;
    size: number;
}) {
    return {
        [name]: {
            terms: { field, size },
        },
    };
}
