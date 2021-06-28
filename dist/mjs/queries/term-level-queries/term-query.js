export function termQuery({ field, value }) {
    return {
        term: {
            [field]: { value },
        },
    };
}
