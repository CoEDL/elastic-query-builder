const { Query } = require("../../../dist/cjs");
const { termsAggregation } = require("../../../dist/cjs/aggregations");
const { queryIndex, deleteIndex, load } = require("../../test-helpers");

test("it should be able to construct a simple aggregation", async () => {
    let a = termsAggregation({ name: "type", field: "type.keyword" });
    expect(a).toEqual({
        type: { terms: { field: "type.keyword", size: 10 } },
    });
});

test("it should be able to perform term aggregations against the index", async () => {
    const index = "term-aggregation-index";
    let query, result;
    try {
        await deleteIndex({ index });
    } catch (error) {}

    await load({ index, file: "test-data/data.json" });

    query = new Query({})
        .size(0)
        .aggregation(termsAggregation({ name: "type", field: "type.keyword" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.aggregations.type.buckets.length).toBe(3);
    expect(result.aggregations.type.buckets).toEqual([
        { key: "country", doc_count: 3 },
        { key: "dataset", doc_count: 3 },
        { key: "person", doc_count: 3 },
    ]);

    // no match
    query = new Query({})
        .size(0)
        .aggregation(termsAggregation({ name: "type", field: "dog.keyword" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.aggregations.type.buckets.length).toBe(0);
});
