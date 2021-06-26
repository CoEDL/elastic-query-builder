export interface QueryBodyInterface {
    size: number;
    from: number;
    query: {};
    aggs?: {};
}

export interface QueryResponseInterface {
    size: number;
    from: number;
    query: {};
}

export interface BoolQueryResponseInterface {
    bool: {
        must?: {};
        should?: {};
        filter?: {};
        mustNot?: {};
    };
}
