import { BoolQueryResponseInterface } from "./interfaces";
import { flattenDeep } from "lodash";

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
    must(query: {} | any[]): this {
        let queries: any[] = flattenDeep([query]);
        this._must = [...this._must, ...queries];
        return this;
    }
    filter(query: {} | any[]): this {
        let queries: any[] = flattenDeep([query]);
        this._filter = [...this._filter, ...queries];
        return this;
    }
    should(query: {} | any[]): this {
        let queries: any[] = flattenDeep([query]);
        this._should = [...this._should, ...queries];
        return this;
    }
    mustNot(query: {} | any[]): this {
        let queries: any[] = flattenDeep([query]);
        this._mustNot = [...this._mustNot, ...queries];
        return this;
    }
    toJSON(): BoolQueryResponseInterface {
        let json: BoolQueryResponseInterface = {
            bool: {},
        };

        const props = ["_must", "_should", "_filter", "_mustNot"] as const;

        for (let name of props) {
            if (this[name].length) {
                const key = `${name.replace("_", "")}`;
                let data = this[name].map((q) => {
                    return q.toJSON ? q.toJSON() : q;
                });
                let result = data.map((acc: {}, query: {}) => ({
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
