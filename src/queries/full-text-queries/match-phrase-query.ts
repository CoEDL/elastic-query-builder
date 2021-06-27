export function matchPhraseQuery({ field, value }: { field: string; value: string }) {
    return {
        match_phrase: {
            [field]: value,
        },
    };
}
