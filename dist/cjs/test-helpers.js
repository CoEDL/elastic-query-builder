"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var path = require("path");
var execute = require("../dist/cjs/helpers").execute;
var readJSON = require("fs-extra").readJSON;
var _a = require("lodash"), isArray = _a.isArray, isPlainObject = _a.isPlainObject;
var Client = require("@elastic/elasticsearch").Client;
var elasticUrl = "http://localhost:9200";
module.exports = {
    getElasticClient: getElasticClient,
    queryIndex: queryIndex,
    deleteIndex: deleteIndex,
    load: load,
};
function deleteIndex(_a) {
    var index = _a.index;
    return __awaiter(this, void 0, void 0, function () {
        var client;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    client = getElasticClient();
                    return [4 /*yield*/, client.indices.delete({ index: index })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function load(_a) {
    var index = _a.index, file = _a.file;
    return __awaiter(this, void 0, void 0, function () {
        var json, client, docs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, readJSON(path.join(__dirname, file))];
                case 1:
                    json = _b.sent();
                    client = getElasticClient();
                    if (!isArray(json)) return [3 /*break*/, 3];
                    docs = json.flatMap(function (d, i) { return [
                        {
                            index: {
                                _index: index,
                                _id: file + "_#" + i,
                            },
                        },
                        d,
                    ]; });
                    return [4 /*yield*/, client.bulk({
                            refresh: true,
                            body: docs,
                        })];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!isPlainObject(json)) return [3 /*break*/, 5];
                    return [4 /*yield*/, client.index({ id: file, index: index, body: json, refresh: true })];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getElasticClient() {
    return new Client({
        node: elasticUrl,
    });
}
function queryIndex(_a) {
    var index = _a.index, query = _a.query;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, execute({
                        service: elasticUrl,
                        index: index,
                        query: query,
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
