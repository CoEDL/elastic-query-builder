const { Query } = require("../dist/cjs");
const { termsAggregation, cardinalityAggregation } = require("../dist/cjs/aggregations");
const { queryIndex, deleteIndex, load } = require("./test-helpers");

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
        query.aggregation(termsAggregation({ name: "type", field: "type.keyword", size: 1 }));
        let result = await queryIndex({ index, query: query.toJSON() });
        // console.log(JSON.stringify(result, null, 2));
        expect(result.aggregations.type.buckets).toEqual([{ key: "person", doc_count: 2 }]);

        // data
        query = new Query({});
        query.aggregation(
            cardinalityAggregation({ name: "type_count", field: "type.keyword", size: 1 })
        );
        result = await queryIndex({ index, query: query.toJSON() });
        // console.log(JSON.stringify(result, null, 2));
        expect(result.aggregations.type_count.value).toEqual(1);
    });
    test("it should be able to run multiple simple aggregations", async () => {
        await load({ index, file: "test-data/two-documents.json" });

        let query = new Query({});
        // data
        query.aggregation(termsAggregation({ name: "type", field: "type.keyword", size: 1 }));
        query.aggregation(
            cardinalityAggregation({ name: "type_count", field: "type.keyword", size: 1 })
        );
        let result = await queryIndex({ index, query: query.toJSON() });
        // console.log(JSON.stringify(result, null, 2));
        expect(Object.keys(result.aggregations).sort()).toEqual(["type", "type_count"]);
        expect(result.aggregations.type.buckets).toEqual([{ key: "person", doc_count: 2 }]);
        expect(result.aggregations.type_count.value).toEqual(1);
    });
});
