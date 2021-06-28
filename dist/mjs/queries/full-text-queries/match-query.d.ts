export declare function matchQuery({ field, value, operator, }: {
    field: string;
    value: string;
    operator: string;
}): {
    match: {
        [x: string]: {
            query: string;
            operator: string;
        };
    };
};
