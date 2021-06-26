const fetch = require("node-fetch");
const { Query, BoolQuery, termQuery, matchQuery, execute } = require("../dist/cjs");
const path = require("path");
const { readJSON } = require("fs-extra");
const { isArray, isPlainObject } = require("lodash");
const { Client } = require("@elastic/elasticsearch");

const elasticUrl = "http://localhost:9200";
const index = "default";

describe("Test search builder capabailities", () => {
    beforeAll(async () => {
        await deleteIndex();
    });
    test("it should be able to run a term query on a keyword field", async () => {
        await load("test-data/single-document.json");

        let boolQuery = new BoolQuery();
        boolQuery = boolQuery.must([
            termQuery({ path: "author", field: "email.keyword", value: "persona@email.com" }),
            termQuery({ field: "author.email.keyword", value: "persona@email.com" }),
            termQuery({ field: "type.keyword", value: "person" }),
            termQuery({ path: "type", field: "keyword", value: "person" }),
            new BoolQuery().should(
                termQuery({ path: "author", field: "email.keyword", value: "persona@email.com" })
            ),
        ]);
        boolQuery = boolQuery.mustNot(
            termQuery({ path: "type", field: "keyword", value: "person" })
        );

        let query = new Query({});
        query.append(boolQuery);

        console.log(JSON.stringify(query.toJSON(), null, 2));
        let result = await queryIndex(query);
        console.log(JSON.stringify(result, null, 2));
        // expect(result.total).toBe(1);
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
