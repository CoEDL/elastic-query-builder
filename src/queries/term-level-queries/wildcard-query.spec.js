const { Query } = require("../../../dist/cjs");
const { wildcardQuery } = require("../../../dist/cjs/queries");
const { queryIndex, deleteIndex, load } = require("../../test-helpers");

test("it should be able to construct wildcard queries", async () => {
    let q = wildcardQuery({ field: "type.keyword", value: "person" });
    expect(q).toEqual({ wildcard: { "type.keyword": "person" } });
});

test("it should be able to perform wildcard queries against the index", async () => {
    const index = "wildcard-query-index";
    let query, result;
    try {
        await deleteIndex({ index });
    } catch (error) {}

    await load({ index, file: "test-data/data.json" });

    query = new Query({}).append(wildcardQuery({ field: "description", value: "person*" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(3);

    query = new Query({}).append(wildcardQuery({ field: "name.keyword", value: "count*a" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(1);

    // no match
    query = new Query({}).append(wildcardQuery({ field: "name.keyword", value: "dog*" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(0);
});
