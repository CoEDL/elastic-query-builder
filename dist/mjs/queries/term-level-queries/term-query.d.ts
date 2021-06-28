export declare function termQuery({ field, value }: {
    field: string;
    value: string;
}): {
    term: {
        [x: string]: {
            value: string;
        };
    };
};
