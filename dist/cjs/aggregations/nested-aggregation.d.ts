export declare function nestedAggregation({ path, field, size, }: {
    path?: string | any;
    field: string;
    size: number;
}): {
    size: number;
    aggs: {
        [x: number]: {
            nested: {
                path: any;
            };
            aggs: {
                values: {
                    terms: {
                        field: string;
                        size: number;
                    };
                };
                count: {
                    cardinality: {
                        field: string;
                    };
                };
            };
        };
    };
};
