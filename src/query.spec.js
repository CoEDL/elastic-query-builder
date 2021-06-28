const { Query } = require("../dist/cjs");
const { matchQuery, matchPhraseQuery } = require("../dist/cjs/queries");

describe("Test query constructor capabilities", () => {
    test("it should be able instantiate a new query with default options", () => {
        let query = new Query({});
        let json = query.toJSON();
        expect(json).toEqual({ size: 10, from: 0 });
    });
    test("it should be able set the query size", () => {
        let query = new Query({});
        query = query.size(5);
        let json = query.toJSON();
        expect(json).toEqual({ size: 5, from: 0 });
    });
    test("it should be able set query from", () => {
        let query = new Query({});
        query = query.from(5);
        let json = query.toJSON();
        expect(json).toEqual({ size: 10, from: 5 });
    });
    test("it should be able to push a query onto the stack", () => {
        let query = new Query({});
        let phraseQuery = matchPhraseQuery({ field: "type.keyword", value: "person" });
        query = query.append(phraseQuery);
        let json = query.toJSON();
        expect(json.query).toEqual({ match_phrase: { "type.keyword": "person" } });

        phraseQuery = matchQuery({ field: "type.keyword", value: "number" });
        query = query.append(phraseQuery);
        json = query.toJSON();
        expect(json.query).toEqual({
            match_phrase: { "type.keyword": "person" },
            match: { "type.keyword": { query: "number", operator: "AND" } },
        });
    });
});
