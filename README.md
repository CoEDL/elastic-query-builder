# Elastic Query Builder

- [Elastic Query Builder](#elastic-query-builder)
  - [Developing the library](#developing-the-library)
  - [Folder setup](#folder-setup)
  - [Adding a query or aggregation](#adding-a-query-or-aggregation)
  - [Publishing a new version](#publishing-a-new-version)
  - [Usage - tutorial](#usage---tutorial)

Inspired by [https://elastic-builder.js.org/docs/](https://elastic-builder.js.org/docs/). I couldn't
get it to work in the browser but the ideas are very cool so I thought I'd use this opportunity to
setup up a typescript library that supports both CommonJS (cjs) and ES (mjs) modules.

API documentation is available at
[https://coedl.github.io/elastic-query-builder/](https://coedl.github.io/elastic-query-builder/)

## Developing the library

In a terminal:

```
> npm run develop
```

This sets up typescript in watch mode to compile the code.

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
-   `docs`: the API docs - built by jsdoc - you should never be working in this folder
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
-   Register the query in `src/queries/index.ts`

## Publishing a new version

-   Build the distributables `(dist)`: `> npm run build`
-   Check it in: `> git add dist docs && git commit`
-   Bump the version: `npm version [major | minor | patch ]` as required
-   Publish: `npm publish`

## Usage - tutorial

The base building block is the `Query` class. Instantiate this to start building a query:

```
import { Query } from '@coedl/elastic-query-builder'

let query = new Query({})
```

Once you have a query object you can append a query clause to it:

```
import { termQuery } from '@coedl/elastic-query-builder/queries'

query = query.append(termQuery({}))

```

Or if you have a complex set of queries append a `BoolQuery`:

```
import { BoolQuery } from '@coedl/elastic-query-builder'
import { termQuery, matchQuery, rangeQuery } from '@coedl/elastic-query-builder/queries'

query = query.append(
    new BoolQuery()
        .must( [termQuery()] )
        .should( [matchQuery(), rangeQuery({}) ])
```

Multi level compound queries are supported:

```
query = query.append(
    new BoolQuery()
        .must( [
            termQuery(),
            new BoolQuery()
                .should( [termQuery, rangeQuery] )
        ] )
        .should( [matchQuery(), rangeQuery({}) ])
```

Notice we're always storing the return query.

When you're ready to search get the JSON representation of the query and search away:

```
query = query.toJSON()

// this is however you execute a query against elastic: see helpers.ts for the method let result =
await execute({ index, query });

```

Aggregations are added in the same way:

```
import { termsAggregation } from '@coed/elastic-query-builder/aggregations'

query = query.aggregation(termsAggregation({}))
```

Or many aggregations:

```
import { termsAggregation, cardinalityAggregation } from '@coed/elastic-query-builder/aggregations'

query = query.aggregation([ termsAggregation({}), cardinalityAggregation({}) ])
```

And then execute:

```
query = query.toJSON()

// this is however you execute a query against elastic: see helpers.ts for the method let result
await execute({ index, query });
```
