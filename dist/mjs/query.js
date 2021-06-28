import { cloneDeep, flattenDeep, isEmpty } from "lodash";
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
    aggregation(agg) {
        let aggs = flattenDeep([agg]);
        this._aggs = [...this._aggs, ...aggs];
        return this;
    }
    toJSON() {
        let json = {
            ...cloneDeep(this._body),
        };
        json.query = {};
        json.aggs = {};
        if (this._queries.length) {
            let queries = this._queries.map((q) => {
                return q.toJSON ? q.toJSON() : q;
            });
            json.query = queries.reduce((acc, query) => ({ ...acc, ...query }));
        }
        if (this._aggs.length) {
            json.aggs = this._aggs.reduce((acc, agg) => ({ ...acc, ...agg }));
        }
        if (isEmpty(json.query))
            delete json.query;
        if (isEmpty(json.aggs))
            delete json.aggs;
        return json;
    }
    toJson() {
        return this.toJSON();
    }
}
