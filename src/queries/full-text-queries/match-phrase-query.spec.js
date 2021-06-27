const { matchPhraseQuery } = require("../../../dist/cjs/queries");

test("it should be able to construct matchPhrase queries", async () => {
    let q = matchPhraseQuery({ field: "type", value: "person" });
    expect(q).toEqual({ match_phrase: { type: "person" } });
});
