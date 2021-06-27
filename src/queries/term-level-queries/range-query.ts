export function rangeQuery({ field, value }: { field: string; value: number[] }) {
    return {
        range: {
            [field]: { gte: value[0], lte: value[1] },
        },
    };
}
