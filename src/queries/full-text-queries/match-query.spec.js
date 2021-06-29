const { Query } = require("../../../dist/cjs");
const { matchQuery } = require("../../../dist/cjs/queries");
const { queryIndex, deleteIndex, load } = require("../../test-helpers");

test("it should be able to construct match queries", async () => {
    let q = matchQuery({ field: "type", value: "person" });
    expect(q).toEqual({ match: { type: { query: "person", operator: "AND" } } });
});

test("it should be able to perform match queries against the index", async () => {
    const index = "match-query-index";
    let query, result;
    try {
        await deleteIndex({ index });
    } catch (error) {}

    await load({ index, file: "test-data/data.json" });

    query = new Query({}).append(matchQuery({ field: "description", value: "person" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(3);

    query = new Query({}).append(matchQuery({ field: "name", value: "country a" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(1);

    // no match
    query = new Query({}).append(matchQuery({ field: "name", value: "per" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(0);
});
