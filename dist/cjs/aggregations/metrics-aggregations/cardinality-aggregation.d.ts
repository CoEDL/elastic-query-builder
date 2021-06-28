export declare function cardinalityAggregation({ name, field }: {
    name: string;
    field: string;
}): {
    [x: string]: {
        cardinality: {
            field: string;
        };
    };
};
