import { BoolQueryResponseInterface } from "./interfaces";

export class BoolQuery {
    private _must: any[];
    private _should: any[];
    private _filter: any[];
    private _mustNot: any[];

    constructor() {
        this._must = [];
        this._should = [];
        this._filter = [];
        this._mustNot = [];
    }
    must(query: {}): this {
        this._must.push(query);
        return this;
    }
    filter(query: {}): this {
        this._filter.push(query);
        return this;
    }
    should(query: {}): this {
        this._should.push(query);
        return this;
    }
    mustNot(query: {}): this {
        this._mustNot.push(query);
        return this;
    }
    toJSON(): BoolQueryResponseInterface {
        let json: BoolQueryResponseInterface = {
            bool: {},
        };

        const props = ["_must", "_should", "_filter", "_mustNot"] as const;
        for (let name of props) {
            if (this[name].length) {
                let result = this[name].map((acc: {}, query: {}) => ({
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
