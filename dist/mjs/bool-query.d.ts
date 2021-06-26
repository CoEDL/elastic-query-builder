import { BoolQueryResponseInterface } from "./interfaces";
export declare class BoolQuery {
    private _must;
    private _should;
    private _filter;
    private _mustNot;
    constructor();
    must(query: {}): this;
    filter(query: {}): this;
    should(query: {}): this;
    mustNot(query: {}): this;
    toJSON(): BoolQueryResponseInterface;
    toJson(): BoolQueryResponseInterface;
}
