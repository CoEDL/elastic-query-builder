const { BoolQuery } = require("../dist/cjs");
const { matchPhraseQuery, matchQuery } = require("../dist/cjs/queries");

describe("Test query constructor capabilities", () => {
    test("it should be able instantiate a new boolean query with default options", () => {
        let bool = new BoolQuery();
        let json = bool.toJSON();
        expect(json).toEqual({ bool: {} });
    });
    test("it should be able to set a must clause on the bool query", () => {
        let bool = new BoolQuery();
        let phraseQuery = matchPhraseQuery({ field: "type.keyword", value: "person" });
        bool = bool.must(phraseQuery);
        let json = bool.toJSON();
        expect(json).toEqual({
            bool: {
                must: [
                    {
                        match_phrase: {
                            "type.keyword": "person",
                        },
                    },
                ],
            },
        });
    });
    test("it should be able to set multiple must clauses on the bool query", () => {
        let bool = new BoolQuery();
        bool = bool.must(matchPhraseQuery({ field: "type.keyword", value: "person" }));
        bool = bool.must(matchQuery({ field: "type.keyword", value: "person" }));
        let json = bool.toJSON({
            bool: {
                must: [
                    {
                        match_phrase: {
                            "type.keyword": "person",
                        },
                    },
                ],
            },
        });
        expect(json).toEqual({
            bool: {
                must: [
                    {
                        match_phrase: {
                            "type.keyword": "person",
                        },
                    },
                    {
                        match: {
                            "type.keyword": {
                                query: "person",
                                operator: "AND",
                            },
                        },
                    },
                ],
            },
        });
    });
});
