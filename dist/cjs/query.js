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
exports.Query = void 0;
var lodash_1 = require("lodash");
var Query = /** @class */ (function () {
    function Query(_a) {
        var _b = _a.size, size = _b === void 0 ? 10 : _b, _c = _a.from, from = _c === void 0 ? 0 : _c;
        this._body = {
            size: size,
            from: from,
            query: {},
        };
        this._queries = [];
        this._aggs = [];
    }
    Query.prototype.size = function (size) {
        this._body.size = size;
        return this;
    };
    Query.prototype.from = function (from) {
        this._body.from = from;
        return this;
    };
    Query.prototype.append = function (query) {
        this._queries.push(query);
        return this;
    };
    Query.prototype.toJSON = function () {
        var json = __assign({}, lodash_1.cloneDeep(this._body));
        if (this._queries.length) {
            json.query = this._queries.reduce(function (acc, query) { return (__assign(__assign({}, acc), query)); });
        }
        return json;
    };
    Query.prototype.toJson = function () {
        return this.toJSON();
    };
    return Query;
}());
exports.Query = Query;
