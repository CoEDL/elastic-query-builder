import { BoolQueryResponseInterface } from "./interfaces";
export declare class BoolQuery {
    private _must;
    private _should;
    private _filter;
    private _mustNot;
    constructor();
    must(query: {} | any[]): this;
    filter(query: {} | any[]): this;
    should(query: {} | any[]): this;
    mustNot(query: {} | any[]): this;
    toJSON(): BoolQueryResponseInterface;
    toJson(): BoolQueryResponseInterface;
}
