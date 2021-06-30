import { QueryResponseInterface } from "./interfaces";
import { cloneDeep, flattenDeep, isEmpty, isString, isUndefined, zipObject } from "lodash";

interface QueryConstructor {
    size: number;
    from: number;
}

interface QueryBodyInterface {
    size: number;
    from: number;
    sort?: any[];
    fields?: any[];
    query?: {};
    aggs?: {};
}

/**
 * @module Query
 */

/**
 * @name Query
 * @description Assemble an elastic query.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-your-data.html}
 * @class
 * @param {Object} init
 * @param {number} init.size - the number of query results to return
 * @param {number} init.from - where to return results from
 * @example
 *  new Query({})
 * @example
 *  new Query({ size: 20 })
 * @example
 *  new Query({ size: 20, from 123 })
 */
export class Query {
    private _size: number;
    private _from: number;
    private _sort: any[];
    private _fields: any[];
    private _query: { toJSON?: any };
    private _aggs: any[];

    constructor({ size = 10, from = 0 }: QueryConstructor) {
        this._size = size;
        this._from = from;
        this._sort = [];
        this._fields = [];
        this._query = {};
        this._aggs = [];
    }

    /**
     * Define how many query results to return
     *
     * @param {number} size
     * @returns this
     * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html}
     * @example
     *  new Query({}).size(20)
     */
    size(size: number): this {
        this._size = size;
        return this;
    }

    /**
     * Define where to return results from (pagination)
     *
     * @param {number} from
     * @returns this
     * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html}
     * @example
     *  new Query({}).from(20)
     */
    from(from: number): this {
        this._from = from;
        return this;
    }

    /**
     * Define result sorting
     *
     * @param {string | array } sort
     * @returns this
     * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/sort-search-results.html}
     * @example
     *  new Query({}).sort('user')
     * @example
     *  new Query({}).sort(['user', '_score'])
     */
    sort(sort: string | any[]): this {
        if (isUndefined(sort)) return this;
        if (isString(sort)) sort = [sort];
        this._sort = [...this._sort, ...sort];
        return this;
    }

    /**
     * Define which fields to return
     *
     * @param {string | array } fields
     * @returns this
     * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-fields.html}
     * @example
     *  new Query({}).fields('user.id')
     * @example
     *  new Query({}).fields(['user.id', 'http.response.*'])
     */
    fields(fields: string | any[]): this {
        if (isUndefined(fields)) return this;
        if (isString(fields)) fields = [fields];
        this._fields = [...this._fields, ...fields];
        return this;
    }

    /**
     * Append a query clause to this query
     *
     * @param {Object} query
     * @returns this
     * @example
     *  new Query({}).append( { some query clause } )
     */
    append(query: {}): this {
        this._query = query;
        return this;
    }

    /**
     * Append aggregations to this query
     *
     * @param {Object | array} query
     * @returns this
     * @example
     *  new Query({}).aggregation( [ array of aggregation clauses ] )
     */
    aggregation(agg: {} | any[]): this {
        let aggs: any[] = flattenDeep([agg]);
        this._aggs = [...this._aggs, ...aggs];
        return this;
    }

    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    toJSON(): QueryResponseInterface {
        let json: QueryBodyInterface = {
            size: this._size,
            from: this._from,
            sort: this._sort,
            query: {},
            aggs: {},
        };
        let query = this._query;
        if ("toJSON" in this._query) {
            query = this._query.toJSON();
        }
        json.query = query;
        if (this._aggs.length) {
            json.aggs = this._aggs.reduce((acc, agg) => ({ ...acc, ...agg }));
        }
        if (isEmpty(json.query)) delete json.query;
        if (isEmpty(json.aggs)) delete json.aggs;
        return json;
    }

    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    toJson(): QueryResponseInterface {
        return this.toJSON();
    }
}
