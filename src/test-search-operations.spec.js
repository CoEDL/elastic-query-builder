const fetch = require("node-fetch");
const { Query, BoolQuery } = require("../dist/cjs");
const { termQuery, matchQuery, matchPhraseQuery } = require("../dist/cjs/queries");
const { execute } = require("../dist/cjs/helpers");
const path = require("path");
const { readJSON } = require("fs-extra");
const { isArray, isPlainObject } = require("lodash");
const { Client } = require("@elastic/elasticsearch");

const elasticUrl = "http://localhost:9200";
const index = "default";

describe("Test search builder capabailities", () => {
    beforeEach(async () => {
        await deleteIndex();
    });
    test("it should not be able to run an empty query", async () => {
        let query = new Query({});
        // console.log("query", JSON.stringify(query, null, 2));

        let result = await queryIndex(query);
        expect(result.error.reason).toMatch("query malformed");
    });
    test("it should be able to run a simple match query ", async () => {
        await load("test-data/single-document.json");
        let query = new Query({});
        query.append(matchQuery({ field: "type", value: "person" }));
        let result = await queryIndex(query);
        expect(result.total).toBe(1);
    });
    test("it should be able to run a simple match phrase query ", async () => {
        await load("test-data/single-document.json");
        let query = new Query({});
        query.append(matchPhraseQuery({ field: "type", value: "person" }));
        let result = await queryIndex(query);
        expect(result.total).toBe(1);
    });
    test("it should be able to run a simple term query ", async () => {
        await load("test-data/single-document.json");
        let query = new Query({});
        query.append(termQuery({ field: "type.keyword", value: "person" }));
        let result = await queryIndex(query);
        expect(result.total).toBe(1);
    });
    test("it should be able to run a boolean query ", async () => {
        await load("test-data/single-document.json");
        let query = new Query({});

        let boolQuery = new BoolQuery();
        boolQuery = boolQuery.must([
            matchQuery({ field: "author.email.keyword", value: "persona@email.com" }),
            matchPhraseQuery({ field: "type", value: "person" }),
        ]);
        query.append(boolQuery);
        let result = await queryIndex(query);
        expect(result.total).toBe(1);
    });
    test("it should be able to run a multi level boolean query ", async () => {
        await load("test-data/single-document.json");
        let query = new Query({});

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
        let result = await queryIndex(query);
        expect(result.total).toBe(1);
    });
});

async function deleteIndex() {
    let client = getElasticClient();
    await client.indices.delete({ index: "_all" });
}

async function load(file) {
    let json = await readJSON(path.join(__dirname, file));
    let client = getElasticClient();
    if (isArray(json)) {
        let docs = json.flatMap((d, i) => [
            {
                index: {
                    _index,
                    _id: `${file}_#${i}`,
                },
                d,
            },
        ]);
        await elasticClient.bulk({
            refresh: true,
            body: docs,
        });
    } else if (isPlainObject(json)) {
        await client.index({ id: file, index: "default", body: json, refresh: true });
    }
}

function getElasticClient() {
    return new Client({
        node: elasticUrl,
    });
}

async function queryIndex(query) {
    return await execute({
        service: elasticUrl,
        index,
        query,
    });
}
