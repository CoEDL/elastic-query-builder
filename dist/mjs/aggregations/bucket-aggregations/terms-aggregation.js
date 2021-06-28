export function termsAggregation({ name, field, size = 10, }) {
    return {
        [name]: {
            terms: { field, size },
        },
    };
}
