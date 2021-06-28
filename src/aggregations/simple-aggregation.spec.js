const { simpleAggregation } = require("../../dist/cjs/aggregations");

test("it should be able to construct a simple aggregation", async () => {
    let a = simpleAggregation({ path: "type", field: "keyword" });
    expect(a).toEqual({
        type: { terms: { field: "type.keyword", size: 10 } },
        type_count: { cardinality: { field: "type.keyword" } },
    });
});
