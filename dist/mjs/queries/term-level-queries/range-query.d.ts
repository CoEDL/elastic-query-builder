export declare function rangeQuery({ field, value }: {
    field: string;
    value: number[];
}): {
    range: {
        [x: string]: {
            gte: number;
            lte: number;
        };
    };
};
