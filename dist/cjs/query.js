"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
var lodash_1 = require("lodash");
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
var Query = /** @class */ (function () {
    function Query(_a) {
        var _b = _a.size, size = _b === void 0 ? 10 : _b, _c = _a.from, from = _c === void 0 ? 0 : _c;
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
    Query.prototype.size = function (size) {
        this._size = size;
        return this;
    };
    /**
     * Define where to return results from (pagination)
     *
     * @param {number} from
     * @returns this
     * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html}
     * @example
     *  new Query({}).from(20)
     */
    Query.prototype.from = function (from) {
        this._from = from;
        return this;
    };
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
    Query.prototype.sort = function (sort) {
        if (lodash_1.isUndefined(sort))
            return this;
        if (lodash_1.isString(sort))
            sort = [sort];
        this._sort = __spreadArray(__spreadArray([], this._sort), sort);
        return this;
    };
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
    Query.prototype.fields = function (fields) {
        if (lodash_1.isUndefined(fields))
            return this;
        if (lodash_1.isString(fields))
            fields = [fields];
        this._fields = __spreadArray(__spreadArray([], this._fields), fields);
        return this;
    };
    /**
     * Append a query clause to this query
     *
     * @param {Object} query
     * @returns this
     * @example
     *  new Query({}).append( { some query clause } )
     */
    Query.prototype.append = function (query) {
        this._query = query;
        return this;
    };
    /**
     * Append aggregations to this query
     *
     * @param {Object | array} query
     * @returns this
     * @example
     *  new Query({}).aggregation( [ array of aggregation clauses ] )
     */
    Query.prototype.aggregation = function (agg) {
        var aggs = lodash_1.flattenDeep([agg]);
        this._aggs = __spreadArray(__spreadArray([], this._aggs), aggs);
        return this;
    };
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    Query.prototype.toJSON = function () {
        var json = {
            size: this._size,
            from: this._from,
            sort: this._sort,
            query: {},
            aggs: {},
        };
        var query = this._query;
        if ("toJSON" in this._query) {
            query = this._query.toJSON();
        }
        json.query = query;
        if (this._aggs.length) {
            json.aggs = this._aggs.reduce(function (acc, agg) { return (__assign(__assign({}, acc), agg)); });
        }
        if (lodash_1.isEmpty(json.query))
            delete json.query;
        if (lodash_1.isEmpty(json.aggs))
            delete json.aggs;
        return json;
    };
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    Query.prototype.toJson = function () {
        return this.toJSON();
    };
    return Query;
}());
exports.Query = Query;
