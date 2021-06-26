export class BoolQuery {
    private _queries: any[];
    
    constructor() {
        this._queries = []
    }
    must(query: any[]) {
        this._queries.push(query);
        return this;
    }
    filter() {
        return this;
    }
    should() {
        return this;
    }
    mustNot() {
        return this;
    }
}