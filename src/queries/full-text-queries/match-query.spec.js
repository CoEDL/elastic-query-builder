const { matchQuery } = require("../../../dist/cjs/queries");

test("it should be able to construct term queries", async () => {
    let q = matchQuery({ field: "type", value: "person" });
    expect(q).toEqual({ match: { type: { query: "person", operator: "AND" } } });
});
