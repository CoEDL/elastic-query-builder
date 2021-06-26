"use strict";
// "use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedAggregation = exports.simpleAggregation = exports.rangeQuery = exports.wildcardQuery = exports.matchPhraseQuery = exports.matchQuery = exports.termQuery = exports.execute = exports.defaultAggregationCount = void 0;
// const { uniqBy, isPlainObject, isString, isArray, compact, difference } = require("lodash");
var headers_utils_1 = require("headers-utils");
var fetch = require("node-fetch");
exports.defaultAggregationCount = 5;
function execute(_a) {
    var service = _a.service, index = _a.index, query = _a.query;
    return __awaiter(this, void 0, void 0, function () {
        var headers, response, _b, _c, total, aggregations, documents;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    headers = new headers_utils_1.Headers();
                    headers.append("Content-Type", "application/json");
                    index = index ? service + "/" + index + "/_search" : service + "/" + index;
                    return [4 /*yield*/, fetch(index, {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify(query),
                        })];
                case 1:
                    response = _d.sent();
                    if (!(response.status !== 200)) return [3 /*break*/, 3];
                    _c = (_b = console).log;
                    return [4 /*yield*/, response.json()];
                case 2:
                    _c.apply(_b, [(_d.sent()).error]);
                    return [2 /*return*/, {}];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    response = _d.sent();
                    total = response.hits.total.value;
                    aggregations = response.aggregations;
                    documents = response.hits.hits;
                    return [2 /*return*/, { total: total, documents: documents, aggregations: aggregations }];
            }
        });
    });
}
exports.execute = execute;
function termQuery(_a) {
    var _b;
    var path = _a.path, field = _a.field, value = _a.value;
    field = path ? path + "." + field : field;
    return {
        term: (_b = {},
            _b[field] = { value: value },
            _b),
    };
}
exports.termQuery = termQuery;
function matchQuery(_a) {
    var _b, _c;
    var path = _a.path, field = _a.field, value = _a.value, _d = _a.operator, operator = _d === void 0 ? "AND" : _d;
    if (path) {
        return {
            match: (_b = {},
                _b[path + "." + field] = {
                    query: value,
                    operator: operator,
                },
                _b),
        };
    }
    else {
        return {
            match: (_c = {}, _c[field] = { query: value, operator: operator }, _c),
        };
    }
}
exports.matchQuery = matchQuery;
function matchPhraseQuery(_a) {
    var _b, _c;
    var path = _a.path, field = _a.field, value = _a.value;
    if (path) {
        return {
            match_phrase: (_b = {},
                _b[path + "." + field] = { query: value },
                _b),
        };
    }
    else {
        return {
            match_phrase: (_c = {},
                _c[field] = value,
                _c),
        };
    }
}
exports.matchPhraseQuery = matchPhraseQuery;
function wildcardQuery(_a) {
    var _b, _c;
    var path = _a.path, field = _a.field, value = _a.value;
    if (path) {
        return {
            wildcard: (_b = {}, _b[path + "." + field] = value, _b),
        };
    }
    else {
        return { wildcard: (_c = {}, _c[field] = value, _c) };
    }
}
exports.wildcardQuery = wildcardQuery;
function rangeQuery(_a) {
    var _b, _c;
    var path = _a.path, field = _a.field, value = _a.value;
    if (path) {
        return {
            range: (_b = {},
                _b[path + "." + field] = { gte: value[0], lte: value[1] },
                _b),
        };
    }
    else {
        return {
            range: (_c = {},
                _c[field] = { gte: value[0], lte: value[1] },
                _c),
        };
    }
}
exports.rangeQuery = rangeQuery;
function simpleAggregation(_a) {
    var _b;
    var path = _a.path, field = _a.field, _c = _a.size, size = _c === void 0 ? 10 : _c;
    return _b = {},
        _b[path] = {
            terms: { field: path + "." + field, size: size },
        },
        _b[path + "_count"] = { cardinality: { field: path + "." + field } },
        _b;
}
exports.simpleAggregation = simpleAggregation;
function nestedAggregation(_a) {
    var _b;
    var path = _a.path, field = _a.field, _c = _a.size, size = _c === void 0 ? 10 : _c;
    return {
        size: 0,
        aggs: (_b = {},
            _b[path] = {
                nested: {
                    path: path,
                },
                aggs: {
                    values: {
                        terms: { field: path + "." + field, size: size },
                    },
                    count: {
                        cardinality: {
                            field: path + "." + field,
                            // precision_threshold: 30000
                        },
                    },
                },
            },
            _b),
    };
}
exports.nestedAggregation = nestedAggregation;
// export class SearchService {
//     constructor({ store }) {
//         this.store = store;
//         this.service = store.state.configuration.service.search;
//         this.headers = new Headers();
//         this.headers.append("Content-Type", "application/json");
//         this.indexerMetadataNamespace = store.state.configuration.indexerMetadataNamespace;
//     }
//     async applyFilter({ filter }) {
//         filter.id = await this.createFilterIdentifier({ filter });
//         let filters = [...this.store.state.search.filters];
//         filters.push(filter);
//         filters = uniqBy(filters, (filter) => `${filter.field}${filter.value}`);
//         this.search({ filters, page: 0 });
//     }
//     async createFilterIdentifier({ filter }) {
//         const encoder = new TextEncoder();
//         const data = encoder.encode(`${filter.field}${filter.value}`);
//         let id = await crypto.subtle.digest("SHA-512", data);
//         id = Array.from(new Uint8Array(id));
//         id = id.map((b) => b.toString(16).padStart(2, "0")).join("");
//         return id;
//     }
//     async removeFilter({ filter }) {
//         filter.id = await this.createFilterIdentifier({ filter });
//         let filters = [...this.store.state.search.filters];
//         filters = filters.filter((f) => f.id !== filter.id);
//         this.search({ filters, page: 0 });
//     }
//     async negateFilter({ filter }) {
//         filter.id = await this.createFilterIdentifier({ filter });
//         let filters = [...this.store.state.search.filters];
//         filters = filters.map((f) => {
//             if (f.id === filter.id) {
//                 filter = { ...filter, negate: !f.negate };
//                 return filter;
//             } else {
//                 return f;
//             }
//         });
//         this.search({ filters, page: 0 });
//     }
//     async clearAllFilters() {
//         this.search({ filters: [], page: 0 });
//     }
//     async search({ filters, page }) {
//         const pageSize = 10;
//         if (!filters) filters = [...this.store.state.search.filters];
//         let query = this.assembleQuery({ filters });
//         // console.log(JSON.stringify(query, null, 2));
//         let payload = { filters, query };
//         this.store.commit("updateFiltersAndQuery", payload);
//         // console.log(JSON.stringify(query, null, 2));
//         let response = await this.execute({
//             query: { query, from: page * pageSize, size: pageSize },
//         });
//         const total = response.hits.total.value;
//         const documents = response.hits.hits;
//         this.store.commit("updateQueryResults", { total, documents });
//     }
//     assembleQuery({ filters }) {
//         let query = {
//             bool: {
//                 must: [],
//                 must_not: [],
//             },
//         };
//         filters.forEach((filter) => {
//             let term;
//             switch (filter.field) {
//                 case "domain":
//                     term = constructDomainQuery({ filter });
//                     break;
//                 case "contributor":
//                     term = constructContributorQuery({ filter });
//                     break;
//                 case "type":
//                     term = constructTypeQuery({ filter });
//                     break;
//                 case "hasContent":
//                     term = constructHasContentQuery({ filter });
//                     break;
//                 case "publisher":
//                     term = constructPublisherQuery({ filter });
//                     break;
//                 case "contentType":
//                     term = constructContentTypeQuery({ filter });
//                     break;
//                 case "dateCreated":
//                     term = constructDateQuery({ filter });
//                 case "dateModified":
//                     term = constructDateQuery({ filter });
//             }
//             if (!filter.negate) query.bool.must.push(term);
//             if (filter.negate) query.bool.must_not.push(term);
//         });
//         return query;
//         function constructDomainQuery({ filter }) {
//             return {
//                 nested: {
//                     path: "identifier",
//                     query: {
//                         bool: {
//                             must: [
//                                 {
//                                     term: {
//                                         "identifier.name": "domain",
//                                     },
//                                 },
//                                 {
//                                     term: {
//                                         "identifier.value": filter.value,
//                                     },
//                                 },
//                             ],
//                         },
//                     },
//                 },
//             };
//         }
//         function constructContributorQuery({ filter }) {
//             return {
//                 nested: {
//                     path: "contributor",
//                     query: {
//                         bool: {
//                             must: [
//                                 {
//                                     term: {
//                                         "contributor.name": filter.value,
//                                     },
//                                 },
//                                 {
//                                     term: {
//                                         "contributor.role": filter.role,
//                                     },
//                                 },
//                             ],
//                         },
//                     },
//                 },
//             };
//         }
//         function constructTypeQuery({ filter }) {
//             return {
//                 term: { additionalType: filter.value },
//             };
//         }
//         function constructHasContentQuery({ filter }) {
//             return {
//                 term: { hasContent: filter.value },
//             };
//         }
//         function constructPublisherQuery({ filter }) {
//             return {
//                 nested: {
//                     path: "publisher",
//                     query: {
//                         term: { "publisher.name": filter.value },
//                     },
//                 },
//             };
//         }
//         function constructContentTypeQuery({ filter }) {
//             return {
//                 nested: {
//                     path: "hasPart",
//                     query: {
//                         term: { "hasPart.encodingFormat": filter.value },
//                     },
//                 },
//             };
//         }
//         function constructDateQuery({ filter }) {
//             return {
//                 range: {
//                     [filter.field]: {
//                         gte: filter.dateRange.min,
//                         lte: filter.dateRange.max,
//                     },
//                 },
//             };
//         }
//     }
//     async getDateRange({ field = "dateCreated" }) {
//         let query = {
//             size: 0,
//             aggs: {
//                 dateRange: {
//                     stats: { field },
//                 },
//             },
//         };
//         let filters = [...this.store.state.search.filters];
//         let q = this.assembleQuery({ filters });
//         query = {
//             query: q,
//             ...query,
//         };
//         let response = await this.execute({ query });
//         return {
//             min: response.aggregations.dateRange.min_as_string,
//             max: response.aggregations.dateRange.max_as_string,
//         };
//     }
//     async aggregateContentTypes({ size = numberOfAggregations }) {
//         let query = {
//             size: 0,
//             aggs: {
//                 type: {
//                     nested: {
//                         path: "hasPart",
//                     },
//                     aggs: {
//                         values: {
//                             terms: {
//                                 field: "hasPart.encodingFormat",
//                                 size,
//                             },
//                         },
//                     },
//                 },
//             },
//         };
//         let filters = [...this.store.state.search.filters];
//         let q = this.assembleQuery({ filters });
//         query = {
//             query: q,
//             ...query,
//         };
//         let response = await this.execute({ query });
//         let types = response.aggregations.type.values.buckets;
//         return types;
//     }
//     async aggregateDomains({ size = numberOfAggregations }) {
//         let query = {
//             size: 0,
//             aggs: {
//                 domains: {
//                     nested: {
//                         path: "identifier",
//                     },
//                     aggs: {
//                         results: {
//                             filter: {
//                                 term: {
//                                     "identifier.name": "domain",
//                                 },
//                             },
//                             aggs: {
//                                 values: {
//                                     terms: {
//                                         field: "identifier.value",
//                                         size,
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         };
//         let filters = [...this.store.state.search.filters];
//         let q = this.assembleQuery({ filters });
//         query = {
//             query: q,
//             ...query,
//         };
//         let response = await this.execute({ query });
//         let domains = response.aggregations.domains.results.values.buckets;
//         return domains;
//     }
//     async aggregateContributors({ size = numberOfAggregations }) {
//         let query = {
//             size: 0,
//             aggs: {
//                 contributors: {
//                     nested: {
//                         path: "contributor",
//                     },
//                     aggs: {
//                         roles: {
//                             terms: {
//                                 field: "contributor.role",
//                                 size,
//                             },
//                             aggs: {
//                                 names: {
//                                     terms: {
//                                         field: "contributor.name",
//                                         size,
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         };
//         let filters = [...this.store.state.search.filters];
//         let q = this.assembleQuery({ filters });
//         query = {
//             query: q,
//             ...query,
//         };
//         let response = await this.execute({ query });
//         let contributors = response.aggregations.contributors.roles.buckets.map((role) => {
//             return {
//                 role: role.key,
//                 names: role.names.buckets,
//             };
//         });
//         return contributors;
//     }
//     async aggregatePublishers({ size = numberOfAggregations }) {
//         let query = {
//             size: 0,
//             aggs: {
//                 publishers: {
//                     nested: {
//                         path: "publisher",
//                     },
//                     aggs: {
//                         values: {
//                             terms: {
//                                 field: "publisher.name",
//                                 size,
//                             },
//                         },
//                     },
//                 },
//             },
//         };
//         let filters = [...this.store.state.search.filters];
//         let q = this.assembleQuery({ filters });
//         query = {
//             query: q,
//             ...query,
//         };
//         let response = await this.execute({ query });
//         let publishers = response.aggregations.publishers.values.buckets;
//         return publishers;
//     }
//     async aggregateTypes({ size = numberOfAggregations }) {
//         let query = {
//             size: 0,
//             aggs: {
//                 type: {
//                     terms: {
//                         field: "additionalType",
//                         size,
//                     },
//                 },
//             },
//         };
//         let filters = [...this.store.state.search.filters];
//         let q = this.assembleQuery({ filters });
//         query = {
//             query: q,
//             ...query,
//         };
//         // console.log(JSON.stringify(query, null, 2));
//         let response = await this.execute({ query });
//         let types = response.aggregations.type.buckets;
//         return types;
//     }
//     async aggregateOverField({ type, nested, path, field, size = 5 }) {
//         const aggregations = this.aggregationBuilder({
//             type,
//             nested,
//             path,
//             field,
//             size,
//         });
//         let response = await this.execute({ query: aggregations });
//         let data;
//         if (nested) {
//             data = response.aggregations[path].values.buckets;
//         } else {
//             data = response.aggregations[field].buckets;
//         }
//         return { [field]: data };
//     }
//     async getStats() {
//         let data = {};
//         const typeAggregation = this.aggregationBuilder({
//             field: "additionalType",
//             size: 10,
//         });
//         let response = await this.execute({ query: typeAggregation });
//         const types = response.aggregations.additionalType.buckets;
//         types.forEach((t) => (data[t.key] = t.doc_count));
//         const publisherAggregation = this.aggregationBuilder({
//             nested: true,
//             path: "publisher",
//             field: "name.raw",
//             size: 1,
//         });
//         response = await this.execute({ query: publisherAggregation });
//         data.publishers = response.aggregations.publisher.count.value;
//         const contributorAggregation = this.aggregationBuilder({
//             nested: true,
//             path: "contributor",
//             field: "name.raw",
//             size: 1,
//         });
//         response = await this.execute({ query: contributorAggregation });
//         data.contributors = response.aggregations.contributor.count.value;
//         return data;
//     }
//     async getRecentlyUpdatedItems({ size = 5 }) {
//         const query = {
//             size,
//             sort: [{ dateModified: "desc" }],
//             query: {
//                 match: {
//                     [`${this.indexerMetadataNamespace}:type`]: "document",
//                 },
//             },
//         };
//         let { documents, total } = await this.execute({ query });
//         return { documents };
//     }
//     async textSearch({ fields, operator = "AND", phraseSearch = true }) {
//         if (!this.verifyFields({ fields })) {
//             return { documents: [], total: 0 };
//         }
//         let query = {
//             size: 20,
//             query: {
//                 bool: {
//                     should: fields.map((f) => {
//                         return this.queryBuilder({
//                             ...f,
//                             operator,
//                             phraseSearch,
//                         });
//                     }),
//                 },
//             },
//         };
//         // console.log(JSON.stringify(query, null, 2));
//         let { total, documents } = await this.execute({ query });
//         return { documents, total };
//     }
//     async execute({ query }) {
//         let index = this.store.state.configuration.domain
//             ? `${this.store.state.configuration.domain}/_search`
//             : "/_search";
//         index = `${this.service}/${index}`;
//         let response = await fetch(index, {
//             method: "POST",
//             headers: this.headers,
//             body: JSON.stringify(query),
//         });
//         if (response.status !== 200) {
//             console.log((await response.json()).error);
//             return {};
//         }
//         response = await response.json();
//         const total = response.hits.total.value;
//         const aggregations = response.aggregations;
//         const documents = response.hits.hits.map((hit) => this.getItemMetadata({ item: hit }));
//         return { total, documents, aggregations };
//     }
//     queryBuilder({
//         type,
//         nested = false,
//         path,
//         field,
//         fields,
//         value,
//         operator = "OR",
//         phraseSearch = false,
//     }) {
//         // if (!value) return undefined;
//         let query = {};
//         // is it a nested query
//         if (nested) {
//             query = assembleNestedQuery({
//                 type,
//                 path,
//                 field,
//                 fields,
//                 value,
//                 operator,
//                 phraseSearch,
//             });
//         } else {
//             query = assembleSimpleQuery({
//                 type,
//                 field,
//                 value,
//                 operator,
//                 phraseSearch,
//             });
//         }
//         return query;
//         function assembleSimpleQuery({ type, field, value, operator, phraseSearch }) {
//             if (!value) return undefined;
//             if (type === "text") {
//                 let wildcard = value ? value.match(/\?|\*/g) : false;
//                 query = wildcard
//                     ? assembleWildcardQuery({ field, value })
//                     : phraseSearch
//                     ? assembleMatchPhraseQuery({ field, value })
//                     : assembleMatchQuery({ field, value, operator });
//             }
//             if (type === "date") {
//                 query = assembleRangeQuery({ field, value });
//             }
//             return query;
//         }
//         function assembleNestedQuery({ type, path, field, fields, value, operator, phraseSearch }) {
//             let query = {
//                 nested: {
//                     path,
//                     query: {},
//                 },
//             };
//             let wildcard;
//             if (type === "text") {
//                 wildcard = value.match(/\?|\*/g);
//                 query.nested.query = wildcard
//                     ? assembleWildcardQuery({ path, field, value })
//                     : phraseSearch
//                     ? assembleMatchPhraseQuery({ path, field, value })
//                     : assembleMatchQuery({
//                           path,
//                           field,
//                           value,
//                           operator,
//                       });
//             } else if (type === "multi") {
//                 query.nested.query = {
//                     bool: {
//                         must: fields.map((f) => {
//                             if (f.field && f.value) {
//                                 wildcard = f.value.match(/\?|\*/g);
//                                 return wildcard
//                                     ? assembleWildcardQuery({
//                                           path,
//                                           field: f.field,
//                                           value: f.value,
//                                       })
//                                     : phraseSearch
//                                     ? assembleMatchPhraseQuery({
//                                           path,
//                                           field: f.field,
//                                           value: f.value,
//                                       })
//                                     : assembleMatchQuery({
//                                           path,
//                                           field: f.field,
//                                           value: f.value,
//                                       });
//                             }
//                         }),
//                     },
//                 };
//                 query.nested.query.bool.must = compact(query.nested.query.bool.must);
//             } else if (type === "date") {
//                 query = {
//                     nested: {
//                         path,
//                         query: assembleRangeQuery({ field, value }),
//                     },
//                 };
//             }
//             return query;
//         }
//     }
//     aggregationBuilder({ nested, path, field, size }) {
//         if (nested) {
//             return assembleNestedAggregation({ path, field, size });
//         } else {
//             return assembleSimpleAggregation({ field, size });
//         }
//     }
//     getItemMetadata({ item }) {
//         const configuration = this.store.state.configuration;
//         if (item._source[`${this.indexerMetadataNamespace}:type`] === "document") {
//             return {
//                 id: item._source.identifier
//                     .filter((i) => i.name === "id")[0]
//                     .value.replace(this.store.state.configuration.domain, "view"),
//                 domain: item._source.identifier.filter((i) => i.name === "domain")[0].value,
//                 name: item._source.name,
//                 description: item._source.description,
//                 type: item._source["additionalType"],
//                 contentTypes: getDataTypes({ configuration, item }),
//                 source: item._source,
//             };
//         } else if (item._source[`${this.indexerMetadataNamespace}:type`] === "segment") {
//             return {
//                 ...item._source,
//             };
//         }
//         function getDataTypes({ configuration, item }) {
//             const types = {
//                 images: [],
//                 audio: [],
//                 video: [],
//                 documents: [],
//                 transcriptions: [],
//             };
//             let parts = item._source.hasPart ? item._source.hasPart : [];
//             if (isPlainObject(parts)) parts = [parts];
//             parts.forEach((part) => {
//                 types.images.push(checkIncludes(configuration.imageFormats, part.encodingFormat));
//                 types.audio.push(checkIncludes(configuration.audioFormats, part.encodingFormat));
//                 types.video.push(checkIncludes(configuration.videoFormats, part.encodingFormat));
//                 types.documents.push(
//                     checkIncludes(configuration.documentFileExtensions, part.name.split(".").pop())
//                 );
//                 types.transcriptions.push(
//                     checkIncludes(
//                         configuration.transcriptionFileExtensions,
//                         part.name.split(".").pop()
//                     )
//                 );
//             });
//             for (let type of Object.keys(types)) {
//                 types[type] = types[type].includes(true) ? true : false;
//             }
//             return types;
//         }
//         function checkIncludes(struct, thing) {
//             return struct.includes(thing) ? true : false;
//         }
//     }
//     verifyFields({ fields, disableFields = [] }) {
//         let properties = ["label", "enabled"];
//         properties = difference(properties, disableFields);
//         let fieldDataVerifies = true;
//         for (let field of fields) {
//             if (!field.type || !["text", "multi", "date", "select"].includes(field.type)) {
//                 console.error(
//                     `Each field must have a property 'type' which is one of ['text', 'multi', 'date', 'select']`
//                 );
//                 fieldDataVerifies = false;
//                 break;
//             }
//             for (let prop of properties) {
//                 if (!(prop in field)) {
//                     console.error(`Each field must have a property '${prop}'`);
//                     fieldDataVerifies = false;
//                     break;
//                 }
//             }
//             if ("nested" in field) {
//                 // if (!("path" in field)) {
//                 //     console.error(
//                 //         `Each nested field must have a property 'path'`
//                 //     );
//                 //     fieldDataVerifies = false;
//                 //     break;
//                 // }
//             }
//         }
//         return fieldDataVerifies;
//     }
// }
// // export function query({ bool, size = 10 }) {
// //     return {
// //         size,
// //         query: {
// //             ...bool,
// //         },
// //     };
// // }
// // export function bool({ must, filter, should, mustNot }) {
// //     return {
// //         bool: {
// //             must,
// //             filter,
// //             should,
// //             mustNot,
// //         },
// //     };
// // }
// let agg = {
//     size: 0,
//     query: matchQuery({ path: "@type", field: "keyword", value: "Person" }),
//     aggs: simpleAggregation({
//         path: "name",
//         field: "keyword",
//     }),
// };
