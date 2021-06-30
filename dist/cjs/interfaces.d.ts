export interface QueryResponseInterface {
    size: number;
    from: number;
    query?: {};
    aggs?: {};
}
export interface BoolQueryResponseInterface {
    bool: {
        must?: {};
        should?: {};
        filter?: {};
        mustNot?: {};
    };
}
