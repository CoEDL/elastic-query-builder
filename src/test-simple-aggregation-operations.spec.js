const { Query } = require("../dist/cjs");
const { simpleAggregation } = require("../dist/cjs/aggregations");
const { execute } = require("../dist/cjs/helpers");
const path = require("path");
const { readJSON } = require("fs-extra");
const { isArray, isPlainObject } = require("lodash");
const { Client } = require("@elastic/elasticsearch");

const elasticUrl = "http://localhost:9200";

describe("Test simple aggregation capabilities", () => {
    const index = "aggregation-tests";
    beforeEach(async () => {
        try {
            await deleteIndex({ index });
        } catch (error) {}
    });
    test("it should be able to run a simple aggregation", async () => {
        await load({ index, file: "test-data/two-documents.json" });

        // data
        let query = new Query({});
        query.aggregation(simpleAggregation({ path: "type", field: "keyword", size: 1 }));
        query = query.toJSON();
        let result = await queryIndex({ index, query });
        // console.log(JSON.stringify(result, null, 2));
        expect(result.aggregations.type_count.value).toEqual(1);

        // data
        query = new Query({});
        query.aggregation(simpleAggregation({ path: "name", field: "keyword", size: 1 }));
        query = query.toJSON();
        result = await queryIndex({ index, query });
        // console.log(JSON.stringify(result, null, 2));
        expect(result.aggregations.name_count.value).toEqual(2);
    });
    test("it should be able to run multiple simple aggregations", async () => {
        await load({ index, file: "test-data/two-documents.json" });

        let query = new Query({});
        // data
        query.aggregation(simpleAggregation({ path: "type", field: "keyword", size: 1 }));
        query.aggregation(simpleAggregation({ path: "name", field: "keyword", size: 1 }));
        query = query.toJSON();
        let result = await queryIndex({ index, query });
        // console.log(JSON.stringify(result, null, 2));
        expect(Object.keys(result.aggregations).sort()).toEqual([
            "name",
            "name_count",
            "type",
            "type_count",
        ]);
        expect(result.aggregations.type_count.value).toEqual(1);
        expect(result.aggregations.name_count.value).toEqual(2);
    });
});

async function deleteIndex({ index }) {
    let client = getElasticClient();
    await client.indices.delete({ index });
}

async function load({ index, file }) {
    let json = await readJSON(path.join(__dirname, file));
    let client = getElasticClient();
    if (isArray(json)) {
        let docs = json.flatMap((d, i) => [
            {
                index: {
                    _index: index,
                    _id: `${file}_#${i}`,
                },
            },
            d,
        ]);
        await client.bulk({
            refresh: true,
            body: docs,
        });
    } else if (isPlainObject(json)) {
        await client.index({ id: file, index, body: json, refresh: true });
    }
}

function getElasticClient() {
    return new Client({
        node: elasticUrl,
    });
}

async function queryIndex({ index, query }) {
    return await execute({
        service: elasticUrl,
        index,
        query,
    });
}
