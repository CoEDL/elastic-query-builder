export function termQuery({ field, value }: { field: string; value: string }) {
    return {
        term: {
            [field]: { value },
        },
    };
}
