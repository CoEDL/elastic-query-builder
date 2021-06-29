const { Query } = require("../../../dist/cjs");
const { rangeQuery } = require("../../../dist/cjs/queries");
const { queryIndex, deleteIndex, load } = require("../../test-helpers");

test("it should be able to construct range queries", async () => {
    let q = rangeQuery({ field: "type.keyword", value: [0, 1] });
    expect(q).toEqual({ range: { "type.keyword": { gte: 0, lte: 1 } } });
});

test("it should be able to perform range queries against the index", async () => {
    const index = "range-query-index";
    let query, result;
    try {
        await deleteIndex({ index });
    } catch (error) {}

    await load({ index, file: "test-data/data.json" });

    query = new Query({}).append(rangeQuery({ field: "age", value: [0, 100] }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(3);

    query = new Query({}).append(rangeQuery({ field: "age", value: [10, 20] }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(1);

    // outside of range
    query = new Query({}).append(rangeQuery({ field: "age", value: [100, 200] }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(0);
});
