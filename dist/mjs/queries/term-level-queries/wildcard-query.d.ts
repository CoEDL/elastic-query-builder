export declare function wildcardQuery({ field, value }: {
    field: string;
    value: string;
}): {
    wildcard: {
        [x: string]: string;
    };
};
