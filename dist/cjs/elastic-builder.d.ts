export declare const defaultAggregationCount = 5;
export declare function execute({ service, index, query }: {
    service: string;
    index: string;
    query: {};
}): Promise<{
    total?: undefined;
    documents?: undefined;
    aggregations?: undefined;
} | {
    total: any;
    documents: any;
    aggregations: any;
}>;
export declare function matchQuery({ path, field, value, operator }: {
    path: string;
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
export declare function matchPhraseQuery({ path, field, value }: {
    path: string;
    field: string;
    value: string;
}): {
    match_phrase: {
        [x: string]: {
            query: string;
        };
    };
} | {
    match_phrase: {
        [x: string]: string;
    };
};
export declare function simpleAggregation({ path, field, size }: {
    path: string;
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
};
export declare function nestedAggregation({ path, field, size }: {
    path: string;
    field: string;
    size: number;
}): {
    size: number;
    aggs: {
        [x: string]: {
            nested: {
                path: string;
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
export declare function wildcardQuery({ path, field, value }: {
    path: string;
    field: string;
    value: string;
}): {
    wildcard: {
        [x: string]: string;
    };
};
export declare function rangeQuery({ path, field, value }: {
    path: string;
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
