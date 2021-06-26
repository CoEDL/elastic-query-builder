import { QueryResponseInterface } from "./interfaces";
interface QueryConstructor {
    size: number;
    from: number;
}
export declare class Query {
    private _body;
    private _queries;
    private _aggs;
    constructor({ size, from }: QueryConstructor);
    size(size: number): this;
    from(from: number): this;
    append(query: {}): this;
    toJSON(): QueryResponseInterface;
    toJson(): QueryResponseInterface;
}
export {};
