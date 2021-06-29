const { Query } = require("../../../dist/cjs");
const { termQuery } = require("../../../dist/cjs/queries");
const { queryIndex, deleteIndex, load } = require("../../test-helpers");

test("it should be able to construct term queries", async () => {
    let q = termQuery({ field: "type.keyword", value: "person" });
    expect(q).toEqual({ term: { "type.keyword": { value: "person" } } });
});

test("it should be able to perform term queries against the index", async () => {
    const index = "term-query-index";
    let query, result;
    try {
        await deleteIndex({ index });
    } catch (error) {}

    await load({ index, file: "test-data/data.json" });

    query = new Query({}).append(termQuery({ field: "type.keyword", value: "person" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(3);

    query = new Query({}).append(termQuery({ field: "type.keyword", value: "country" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(3);

    // no term
    query = new Query({}).append(termQuery({ field: "type.keyword", value: "dog" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(0);
});
