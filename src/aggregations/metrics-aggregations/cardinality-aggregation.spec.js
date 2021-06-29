const { Query } = require("../../../dist/cjs");
const { cardinalityAggregation } = require("../../../dist/cjs/aggregations");
const { queryIndex, deleteIndex, load } = require("../../test-helpers");

test("it should be able to construct a simple aggregation", async () => {
    let a = cardinalityAggregation({ name: "type_count", field: "type.keyword" });
    expect(a).toEqual({
        type_count: { cardinality: { field: "type.keyword" } },
    });
});

test("it should be able to perform cardinality aggregations against the index", async () => {
    const index = "cardinality-aggregation-index";
    let query, result;
    try {
        await deleteIndex({ index });
    } catch (error) {}

    await load({ index, file: "test-data/data.json" });

    query = new Query({})
        .size(0)
        .aggregation(cardinalityAggregation({ name: "type", field: "type.keyword" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.aggregations.type.value).toBe(3);

    // no match
    query = new Query({})
        .size(0)
        .aggregation(cardinalityAggregation({ name: "type", field: "dog.keyword" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.aggregations.type.value).toBe(0);
});
