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
exports.BoolQuery = void 0;
var lodash_1 = require("lodash");
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
var BoolQuery = /** @class */ (function () {
    function BoolQuery() {
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
    BoolQuery.prototype.must = function (query) {
        var queries = lodash_1.flattenDeep([query]);
        this._must = __spreadArray(__spreadArray([], this._must), queries);
        return this;
    };
    /**
     * Append a filter clause or array of filter clauses
     *
     * @param {Object | array } query - query clauses
     * @returns this
     * @example
     *  new BoolQuery().filter( [query clauses for filtering] )
     */
    BoolQuery.prototype.filter = function (query) {
        var queries = lodash_1.flattenDeep([query]);
        this._filter = __spreadArray(__spreadArray([], this._filter), queries);
        return this;
    };
    /**
     * Append a should clause or array of should clauses
     *
     * @param {Object | array } query - query clauses
     * @returns this
     * @example
     *  new BoolQuery().should( [query clauses that should match] )
     *
     */
    BoolQuery.prototype.should = function (query) {
        var queries = lodash_1.flattenDeep([query]);
        this._should = __spreadArray(__spreadArray([], this._should), queries);
        return this;
    };
    /**
     * Append a mustNot clause or array of mustNot clauses
     *
     * @param {Object | array } query - query clauses
     * @returns this
     * @example
     *  new BoolQuery().mustNot( [query clauses that mustNot match] )
     */
    BoolQuery.prototype.mustNot = function (query) {
        var queries = lodash_1.flattenDeep([query]);
        this._mustNot = __spreadArray(__spreadArray([], this._mustNot), queries);
        return this;
    };
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    BoolQuery.prototype.toJSON = function () {
        var _a;
        var json = {
            bool: {},
        };
        var props = ["_must", "_should", "_filter", "_mustNot"];
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var name = props_1[_i];
            if (this[name].length) {
                var key = "" + name.replace("_", "");
                var data = this[name].map(function (q) {
                    return q.toJSON ? q.toJSON() : q;
                });
                var result = data.map(function (acc, query) { return (__assign(__assign({}, acc), query)); });
                json.bool = __assign(__assign({}, json.bool), (_a = {}, _a[key] = result, _a));
            }
        }
        return json;
    };
    /**
     * Get a JSON representation of this object
     *
     * @returns {json}
     */
    BoolQuery.prototype.toJson = function () {
        return this.toJSON();
    };
    return BoolQuery;
}());
exports.BoolQuery = BoolQuery;
