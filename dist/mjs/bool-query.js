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
        this._must.push(query);
        return this;
    }
    filter(query) {
        this._filter.push(query);
        return this;
    }
    should(query) {
        this._should.push(query);
        return this;
    }
    mustNot(query) {
        this._mustNot.push(query);
        return this;
    }
    toJSON() {
        let json = {
            bool: {},
        };
        const props = ["_must", "_should", "_filter", "_mustNot"];
        for (let name of props) {
            if (this[name].length) {
                let result = this[name].map((acc, query) => ({
                    ...acc,
                    ...query,
                }));
                const key = `${name.replace("_", "")}`;
                json.bool = { ...json.bool, [key]: result };
            }
        }
        return json;
    }
    toJson() {
        return this.toJSON();
    }
}
