const { termsAggregation } = require("../../../dist/cjs/aggregations");

test("it should be able to construct a simple aggregation", async () => {
    let a = termsAggregation({ name: "type", field: "type.keyword" });
    expect(a).toEqual({
        type: { terms: { field: "type.keyword", size: 10 } },
    });
});
