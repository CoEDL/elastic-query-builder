export declare function matchPhraseQuery({ field, value }: {
    field: string;
    value: string;
}): {
    match_phrase: {
        [x: string]: string;
    };
};
