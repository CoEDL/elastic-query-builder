import { BoolQueryResponseInterface } from "./interfaces";
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
export declare class BoolQuery {
    private _must;
    private _should;
    private _filter;
    private _mustNot;
    constructor();
    /**
     * Append a must clause or array of must clauses
     *
     * @param {Object | array } query - must query clauses
     * @returns this
     * @example
     *  new BoolQuery().must( [query clauses that must match] )
     */
    must(query: {} | any[]): this;
    /**
     * Append a filter clause or array of filter clauses
     *
     * @param {Object | array } query - filter query clauses
     * @returns this
     * @example
     *  new BoolQuery().filter( [query clauses for filtering] )
     */
    filter(query: {} | any[]): this;
    /**
     * Append a should clause or array of should clauses
     *
     * @param {Object | array } query - should query clauses
     * @returns this
     * @example
     *  new BoolQuery().should( [query clauses that should match] )
     *
     */
    should(query: {} | any[]): this;
    /**
     * Append a mustNot clause or array of mustNot clauses
     *
     * @param {Object | array } query - mustNot query clauses
     * @returns this
     * @example
     *  new BoolQuery().mustNot( [query clauses that mustNot match] )
     */
    mustNot(query: {} | any[]): this;
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    toJSON(): BoolQueryResponseInterface;
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    toJson(): BoolQueryResponseInterface;
}
