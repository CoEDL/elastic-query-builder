import { flattenDeep } from "lodash";
export class BoolQuery {
    _must;
    _should;
    _filter;
    _mustNot;
    constructor() {
        this._must = [];
        this._should = [];
        this._filter = [];
        this._mustNot = [];
    }
    must(query) {
        let queries = flattenDeep([query]);
        this._must = [...this._must, ...queries];
        return this;
    }
    filter(query) {
        let queries = flattenDeep([query]);
        this._filter = [...this._filter, ...queries];
        return this;
    }
    should(query) {
        let queries = flattenDeep([query]);
        this._should = [...this._should, ...queries];
        return this;
    }
    mustNot(query) {
        let queries = flattenDeep([query]);
        this._mustNot = [...this._mustNot, ...queries];
        return this;
    }
    toJSON() {
        let json = {
            bool: {},
        };
        const props = ["_must", "_should", "_filter", "_mustNot"];
        for (let name of props) {
            if (this[name].length) {
                const key = `${name.replace("_", "")}`;
                let data = this[name].map((q) => {
                    return q.toJSON ? q.toJSON() : q;
                });
                let result = data.map((acc, query) => ({
                    ...acc,
                    ...query,
                }));
                json.bool = { ...json.bool, [key]: result };
            }
        }
        return json;
    }
    toJson() {
        return this.toJSON();
    }
}
