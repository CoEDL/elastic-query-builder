import { cloneDeep, flattenDeep, isEmpty } from "lodash";
/**
 * @module Query
 */
/**
 * @name Query
 * @description Assemble an elastic query.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/search-your-data.html}
 * @class
 * @example
 *  new Query()
 */
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
    /**
     * Define how many query results to return
     *
     * @param {number} size
     * @returns this
     * @example
     *  new Query({}).size(20)
     */
    size(size) {
        this._body.size = size;
        return this;
    }
    /**
     * Define where to return results from (pagination)
     *
     * @param {number} from
     * @returns this
     * @example
     *  new Query({}).from(20)
     */
    from(from) {
        this._body.from = from;
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
    append(query) {
        this._queries.push(query);
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
    aggregation(agg) {
        let aggs = flattenDeep([agg]);
        this._aggs = [...this._aggs, ...aggs];
        return this;
    }
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
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
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    toJson() {
        return this.toJSON();
    }
}
