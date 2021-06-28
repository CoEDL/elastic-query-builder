const { wildcardQuery } = require("../../../dist/cjs/queries");

test("it should be able to construct wildcard queries", async () => {
    let q = wildcardQuery({ field: "type.keyword", value: "person" });
    expect(q).toEqual({ wildcard: { "type.keyword": "person" } });
});
