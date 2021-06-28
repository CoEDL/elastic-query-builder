export function matchPhraseQuery({ field, value }) {
    return {
        match_phrase: {
            [field]: value,
        },
    };
}
