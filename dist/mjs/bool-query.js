import { flattenDeep } from "lodash";
/**
 * @module BoolQuery
 */
/**
 * @name BoolQuery
 * @description Assemble Boolean query.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html}
 * @class
 * @example
 *  new BoolQuery()
 */
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
    /**
     * Append a must clause or array of must clauses
     *
     * @param {Object | array } query - query clauses
     * @returns this
     * @example
     *  new BoolQuery().must( [query clauses that must match] )
     */
    must(query) {
        let queries = flattenDeep([query]);
        this._must = [...this._must, ...queries];
        return this;
    }
    /**
     * Append a filter clause or array of filter clauses
     *
     * @param {Object | array } query - query clauses
     * @returns this
     * @example
     *  new BoolQuery().filter( [query clauses for filtering] )
     */
    filter(query) {
        let queries = flattenDeep([query]);
        this._filter = [...this._filter, ...queries];
        return this;
    }
    /**
     * Append a should clause or array of should clauses
     *
     * @param {Object | array } query - query clauses
     * @returns this
     * @example
     *  new BoolQuery().should( [query clauses that should match] )
     *
     */
    should(query) {
        let queries = flattenDeep([query]);
        this._should = [...this._should, ...queries];
        return this;
    }
    /**
     * Append a mustNot clause or array of mustNot clauses
     *
     * @param {Object | array } query - query clauses
     * @returns this
     * @example
     *  new BoolQuery().mustNot( [query clauses that mustNot match] )
     */
    mustNot(query) {
        let queries = flattenDeep([query]);
        this._mustNot = [...this._mustNot, ...queries];
        return this;
    }
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
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
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    toJson() {
        return this.toJSON();
    }
}
