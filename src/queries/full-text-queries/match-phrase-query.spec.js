const { Query } = require("../../../dist/cjs");
const { matchPhraseQuery } = require("../../../dist/cjs/queries");
const { queryIndex, deleteIndex, load } = require("../../test-helpers");

test("it should be able to construct matchPhrase queries", async () => {
    let q = matchPhraseQuery({ field: "type", value: "person" });
    expect(q).toEqual({ match_phrase: { type: "person" } });
});

test("it should be able to perform match phrase queries against the index", async () => {
    const index = "match-phrase-query-index";
    let query, result;
    try {
        await deleteIndex({ index });
    } catch (error) {}

    await load({ index, file: "test-data/data.json" });

    query = new Query({}).append(matchPhraseQuery({ field: "description", value: "person" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(3);

    query = new Query({}).append(matchPhraseQuery({ field: "name", value: "country a" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(1);

    // no match
    query = new Query({}).append(matchPhraseQuery({ field: "name", value: "per" }));
    result = await queryIndex({ index, query: query.toJSON() });
    expect(result.total).toBe(0);
});
