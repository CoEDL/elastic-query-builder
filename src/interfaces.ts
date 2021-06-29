/**
 *
 * QueryBody interface
 *
 * @type
 */
export interface QueryBodyInterface {
    size: number;
    from: number;
    query?: {};
    aggs?: {};
}

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
