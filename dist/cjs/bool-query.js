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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoolQuery = void 0;
var BoolQuery = /** @class */ (function () {
    function BoolQuery() {
        this._must = [];
        this._should = [];
        this._filter = [];
        this._mustNot = [];
    }
    BoolQuery.prototype.must = function (query) {
        this._must.push(query);
        return this;
    };
    BoolQuery.prototype.filter = function (query) {
        this._filter.push(query);
        return this;
    };
    BoolQuery.prototype.should = function (query) {
        this._should.push(query);
        return this;
    };
    BoolQuery.prototype.mustNot = function (query) {
        this._mustNot.push(query);
        return this;
    };
    BoolQuery.prototype.toJSON = function () {
        var _a;
        var json = {
            bool: {},
        };
        var props = ["_must", "_should", "_filter", "_mustNot"];
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var name = props_1[_i];
            if (this[name].length) {
                var result = this[name].map(function (acc, query) { return (__assign(__assign({}, acc), query)); });
                var key = "" + name.replace("_", "");
                json.bool = __assign(__assign({}, json.bool), (_a = {}, _a[key] = result, _a));
            }
        }
        return json;
    };
    BoolQuery.prototype.toJson = function () {
        return this.toJSON();
    };
    return BoolQuery;
}());
exports.BoolQuery = BoolQuery;
