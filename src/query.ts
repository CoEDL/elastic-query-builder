import { QueryBodyInterface, QueryResponseInterface } from "./interfaces";
import { cloneDeep } from "lodash";

interface QueryConstructor {
    size: number;
    from: number;
}

export class Query {
    private _body: QueryBodyInterface;
    private _queries: any[];
    private _aggs: any[];

    constructor({ size = 10, from = 0 }: QueryConstructor) {
        this._body = {
            size,
            from,
            query: {},
        };
        this._queries = [];
        this._aggs = [];
    }

    size(size: number): this {
        this._body.size = size;
        return this;
    }

    from(from: number): this {
        this._body.from = from;
        return this;
    }

    append(query: {}): this {
        this._queries.push(query);
        return this;
    }
    toJSON(): QueryResponseInterface {
        let json = {
            ...cloneDeep(this._body),
        };
        json.query = {};
        if (this._queries.length) {
            let queries = this._queries.map((q) => {
                return q.toJSON ? q.toJSON : q;
            });
            json.query = queries.reduce((acc, query) => ({ ...acc, ...query }));
        }

        return json;
    }

    toJson(): QueryResponseInterface {
        return this.toJSON();
    }
}
