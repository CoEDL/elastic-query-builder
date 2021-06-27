const { rangeQuery } = require("../../../dist/cjs/queries");

test("it should be able to construct range queries", async () => {
    let q = rangeQuery({ field: "type.keyword", value: [0, 1] });
    expect(q).toEqual({ range: { "type.keyword": { gte: 0, lte: 1 } } });
});
