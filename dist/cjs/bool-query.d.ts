export declare class BoolQuery {
    private _queries;
    constructor();
    must(query: any[]): this;
    filter(): this;
    should(): this;
    mustNot(): this;
}
