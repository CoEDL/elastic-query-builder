import { QueryResponseInterface } from "./interfaces";
interface QueryConstructor {
    size: number;
    from: number;
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
export declare class Query {
    private _size;
    private _from;
    private _sort;
    private _fields;
    private _query;
    private _aggs;
    constructor({ size, from }: QueryConstructor);
    /**
     * Define how many query results to return
     *
     * @param {number} size
     * @returns this
     * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html}
     * @example
     *  new Query({}).size(20)
     */
    size(size: number): this;
    /**
     * Define where to return results from (pagination)
     *
     * @param {number} from
     * @returns this
     * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html}
     * @example
     *  new Query({}).from(20)
     */
    from(from: number): this;
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
    sort(sort: string | any[]): this;
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
    fields(fields: string | any[]): this;
    /**
     * Append a query clause to this query
     *
     * @param {Object} query
     * @returns this
     * @example
     *  new Query({}).append( { some query clause } )
     */
    append(query: {}): this;
    /**
     * Append aggregations to this query
     *
     * @param {Object | array} query
     * @returns this
     * @example
     *  new Query({}).aggregation( [ array of aggregation clauses ] )
     */
    aggregation(agg: {} | any[]): this;
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    toJSON(): QueryResponseInterface;
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    toJson(): QueryResponseInterface;
}
export {};
