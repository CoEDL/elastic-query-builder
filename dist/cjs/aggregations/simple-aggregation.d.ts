export declare function simpleAggregation({ path, field, size, }: {
    path?: string | any;
    field: string;
    size: number;
}): {
    [x: string]: {
        terms: {
            field: string;
            size: number;
        };
        cardinality?: undefined;
    } | {
        cardinality: {
            field: string;
        };
        terms?: undefined;
    };
    [x: number]: {
        terms: {
            field: string;
            size: number;
        };
    };
};
