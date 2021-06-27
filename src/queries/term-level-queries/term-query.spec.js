const { termQuery } = require("../../../dist/cjs/queries");

test("it should be able to construct term queries", async () => {
    let q = termQuery({ field: "type.keyword", value: "person" });
    expect(q).toEqual({ term: { "type.keyword": { value: "person" } } });
});
