const { Query, termQuery, matchQuery } = require("../dist/cjs");

describe("Test search builder capabilities", () => {
    test("it should be able to construct term queries", async () => {
        let q = termQuery({ field: "type.keyword", value: "person" });
        expect(q).toEqual({ term: { "type.keyword": { value: "person" } } });

        q = termQuery({ path: "type", field: "keyword", value: "person" });
        expect(q).toEqual({ term: { "type.keyword": { query: "person" } } });
    });
});
