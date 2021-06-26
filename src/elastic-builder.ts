// "use strict";

// const { uniqBy, isPlainObject, isString, isArray, compact, difference } = require("lodash");
import { Headers } from 'headers-utils';
const fetch = require('node-fetch')

export const defaultAggregationCount = 5;

export async function execute({ service, index, query }: { service: string, index: string, query: {} }) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    index = index ? `${service}/${index}/_search` : `${service}/${index}`;
    let response = await fetch(index, {
        method: "POST",
        headers,
        body: JSON.stringify(query),
    });
    if (response.status !== 200) {
        console.log((await response.json()).error);
        return {};
    }
    response = await response.json();
    const total = response.hits.total.value;
    const aggregations = response.aggregations;
    const documents =  response.hits.hits;
    return { total, documents, aggregations };
}

export function matchQuery({ path, field, value, operator = "AND" } : { path: string, field: string, value: string, operator: string}) {
    if (path) {
        return {
            match: {
                [`${path}.${field}`]: {
                    query: value,
                    operator,
                },
            },
        };
    } else {
        return {
            match: { [field]: { query: value, operator } },
        };
    }
}

export function matchPhraseQuery({ path, field, value } : { path: string, field: string, value: string }) {
    if (path) {
        return {
            match_phrase: {
                [`${path}.${field}`]: { query: value },
            },
        };
    } else {
        return {
            match_phrase: {
                [field]: value,
            },
        };
    }
}

export function simpleAggregation({ path, field, size = 10 } : { path: string, field: string, size: number }) {
    return {
        [path]: {
            terms: { field: `${path}.${field}`, size },
        },
        [`${path}_count`]: { cardinality: { field: `${path}.${field}` } },
    };
}

export function nestedAggregation({ path, field, size = 10 } : { path: string, field: string, size: number }) {
    return {
        size: 0,
        aggs: {
            [path]: {
                nested: {
                    path,
                },
                aggs: {
                    values: {
                        terms: { field: `${path}.${field}`, size },
                    },
                    count: {
                        cardinality: {
                            field: `${path}.${field}`,
                            // precision_threshold: 30000
                        },
                    },
                },
            },
        },
    };
}

export function wildcardQuery({ path, field, value }: { path: string, field: string, value: string}) {
    if (path) {
        return {
            wildcard: { [`${path}.${field}`]: value },
        };
    } else {
        return { wildcard: { [field]: value } };
    }
}

export function rangeQuery({ path, field, value }: { path: string, field: string, value: number[] }) {
    if (path) {
        return {
            range: {
                [`${path}.${field}`]: { gte: value[0], lte: value[1] },
            },
        };
    } else {
        return {
            range: {
                [field]: { gte: value[0], lte: value[1] },
            },
        };
    }
}


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


