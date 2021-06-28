const { cardinalityAggregation } = require("../../../dist/cjs/aggregations");

test("it should be able to construct a simple aggregation", async () => {
    let a = cardinalityAggregation({ name: "type_count", field: "type.keyword" });
    expect(a).toEqual({
        type_count: { cardinality: { field: "type.keyword" } },
    });
});
