import { cloneDeep } from "lodash";
export class Query {
    _body;
    _queries;
    _aggs;
    constructor({ size = 10, from = 0 }) {
        this._body = {
            size,
            from,
            query: {},
        };
        this._queries = [];
        this._aggs = [];
    }
    size(size) {
        this._body.size = size;
        return this;
    }
    from(from) {
        this._body.from = from;
        return this;
    }
    append(query) {
        this._queries.push(query);
        return this;
    }
    toJSON() {
        let json = {
            ...cloneDeep(this._body),
        };
        if (this._queries.length) {
            let queries = this._queries.map((q) => {
                return q.toJSON ? q.toJSON : q;
            });
            json.query = this._queries.reduce((acc, query) => ({ ...acc, ...query }));
        }
        return json;
    }
    toJson() {
        return this.toJSON();
    }
}
