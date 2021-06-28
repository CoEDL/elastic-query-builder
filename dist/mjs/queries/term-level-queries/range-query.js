export function rangeQuery({ field, value }) {
    return {
        range: {
            [field]: { gte: value[0], lte: value[1] },
        },
    };
}
