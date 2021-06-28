# Elastic Query Builder

- [Elastic Query Builder](#elastic-query-builder)
  - [Developing the library](#developing-the-library)
  - [Folder setup](#folder-setup)
  - [Adding a query or aggregation](#adding-a-query-or-aggregation)
  - [Publishing a new version](#publishing-a-new-version)
  - [Usage - queries](#usage---queries)
    - [Building a basic match query](#building-a-basic-match-query)
    - [Building a simple Bool query](#building-a-simple-bool-query)
    - [Building a multiple level nested Bool query](#building-a-multiple-level-nested-bool-query)
  - [Usage - aggregations](#usage---aggregations)
    - [Building a single aggregation query](#building-a-single-aggregation-query)
    - [Building multi aggregation query](#building-multi-aggregation-query)

Inspired by [https://elastic-builder.js.org/docs/](https://elastic-builder.js.org/docs/). I couldn't
get it to work in the browser but the ideas are very cool so I thought I'd use this opportunity to
setup up a typescript library that supports both CommonJS (cjs) and ES (mjs) modules.

## Developing the library

In a terminal:

```
> npm run develop
```

This setups typescript in watch mode to compile the code.

In another terminal:

```
> npm run tests:watch
```

This gets Jest going in watch mode to run the tests. With regard to Jest - support for ES modules
support is experimental
({https://jestjs.io/docs/ecmascript-modules(https://jestjs.io/docs/ecmascript-modules)}) so note
that the tests use cjs imports from the cjs bundles in `dist`.

## Folder setup

-   `dist`: the built code - built by typescript - you should never be working in this folder
-   `src/queries/*`: the query fragment generators. Folder structure follows the categorisation @
    [https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)
-   `src/aggregations/*`: the aggregation fragment generators. Folder structure follows the
    categorisation @
    [https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)

## Adding a query or aggregation

Say you needed an interval query as defined in `QueryDSL: Full Text Queries`:

-   Add `src/queries/full-text-queries/interval-query.ts` with code to return the query fragment
-   Add a test for it in `src/queries/full-text-queries/interval-query.spec.js` (note the JS
    suffix - see note above re: jest and es modules)
-   Register the query in `src/queris/index.ts`
-   Add an actual test for the query in `test-simple-operations.spec.js` (remember that local query
    test should just check that the returned JSON fragment is correct)

## Publishing a new version

-   Build the distributables `(dist)`: `> npm run build`
-   Check it in: `> git add dist && git commit`
-   Bump the version: `npm version [major | minor | patch ]` as required
-   Publish: `npm publish`

## Usage - queries

To see how to create a whole set of queries look at `test-search-operations.spec.js`

### Building a basic match query

```
const { Query } = require("@coedl/elastic-query-builder");
const {
    matchQuery,
} = require("@coedl/elastic-query-builder/queries");

let query = new Query({});
query.append(matchQuery({ field: "type", value: "person" }));

// this is however you execute a query against elastic: see helpers.ts for the method
let result = await execute({ index, query });
```

### Building a simple Bool query

```
const { Query, BoolQuery } = require("@coedl/elastic-query-builder");
const {
    matchQuery,
    matchPhraseQuery
} = require("@coedl/elastic-query-builder/queries");

query.append(
    new BoolQuery()
        .must([
            matchQuery({ field: "author.email.keyword", value: "persona@email.com" }),
            matchPhraseQuery({ field: "type", value: "person" }),
        ])
)

// this is however you execute a query against elastic: see helpers.ts for the method
let result = await execute({ index, query: query.toJSON() });
```

### Building a multiple level nested Bool query

```
const { Query, BoolQuery } = require("@coedl/elastic-query-builder");
const {
    matchQuery,
    matchPhraseQuery
} = require("@coedl/elastic-query-builder/queries");

query.append(
    new BoolQuery()
        .must([
            matchQuery({ field: "author.email.keyword", value: "persona@email.com" }),
            matchPhraseQuery({ field: "type", value: "person" }),
            new BoolQuery().should(
                matchQuery({ field: "author.email.keyword", value: "persona@email.com" }),
                matchQuery({ field: "author.email.keyword", value: "personb@email.com" })
            ),
        ])
        .should([])
);

// this is however you execute a query against elastic: see helpers.ts for the method
let result = await queryIndex({ index, query: query.toJSON() });
```

## Usage - aggregations

To see how to create a whole set of aggregations look at `test-simple-aggregation-operations.js`

### Building a single aggregation query

```
const { Query } = require("@coedl/elastic-query-builder")
const { termsAggregation } = require("@coedl/elastic-query-builder/aggregations")

let query = new Query({});
query.aggregation(termsAggregation({ name: "type", field: "type.keyword", size: 1 }));

// this is however you execute a query against elastic: see helpers.ts for the method
let result = await execute({ index, query: query.toJSON() });
```

### Building multi aggregation query

```
const { Query } = require("@coedl/elastic-query-builder")
const { termsAggregation, cardinalityAggregation } = require("@coedl/elastic-query-builder/aggregations")

let query = new Query({});
query.aggregation(termsAggregation({ name: "type", field: "type.keyword", size: 1 }));
query.aggregation(
    cardinalityAggregation({ name: "type_count", field: "type.keyword", size: 1 })
)

// this is however you execute a query against elastic: see helpers.ts for the method
let result = await execute({ index, query: query.toJSON() });
```
