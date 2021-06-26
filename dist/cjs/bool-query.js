"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoolQuery = void 0;
var BoolQuery = /** @class */ (function () {
    function BoolQuery() {
        this._queries = [];
    }
    BoolQuery.prototype.must = function (query) {
        this._queries.push(query);
        return this;
    };
    BoolQuery.prototype.filter = function () {
        return this;
    };
    BoolQuery.prototype.should = function () {
        return this;
    };
    BoolQuery.prototype.mustNot = function () {
        return this;
    };
    return BoolQuery;
}());
exports.BoolQuery = BoolQuery;
