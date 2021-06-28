export declare function termsAggregation({ name, field, size, }: {
    name: string;
    field: string;
    size: number;
}): {
    [x: string]: {
        terms: {
            field: string;
            size: number;
        };
    };
};
