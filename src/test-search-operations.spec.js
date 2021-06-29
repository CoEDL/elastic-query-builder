const { Query, BoolQuery } = require("../dist/cjs");
const {
    termQuery,
    matchQuery,
    matchPhraseQuery,
    rangeQuery,
    wildcardQuery,
} = require("../dist/cjs/queries");

const { queryIndex, deleteIndex, load } = require("./test-helpers");

describe("Test search builder capabilities", () => {
    const index = "search-tests";
    beforeEach(async () => {
        try {
            await deleteIndex({ index });
        } catch (error) {}
    });
    test("it should not be able to run an empty query", async () => {
        await load({ index, file: "test-data/single-document.json" });

        let query = new Query({});
        let result = await queryIndex({ index, query });
        // console.log(result);
        expect(result.total).toBe(1);
    });
    test("it should be able to run a simple match query ", async () => {
        await load({ index, file: "test-data/single-document.json" });

        // match
        let query = new Query({});
        query.append(matchQuery({ field: "type", value: "person" }));
        let result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(1);

        // no match
        query = new Query({});
        query.append(matchQuery({ field: "type", value: "dog" }));
        result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(0);
    });
    test("it should be able to run a simple match phrase query ", async () => {
        await load({ index, file: "test-data/single-document.json" });

        // match
        let query = new Query({});
        query.append(matchPhraseQuery({ field: "type", value: "person" }));
        let result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(1);

        // no match
        query = new Query({});
        query.append(matchPhraseQuery({ field: "type", value: "dog" }));
        result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(0);
    });
    test("it should be able to run a simple term query ", async () => {
        await load({ index, file: "test-data/single-document.json" });

        // match
        let query = new Query({});
        query.append(termQuery({ field: "type.keyword", value: "person" }));
        let result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(1);

        // no match
        query = new Query({});
        query.append(termQuery({ field: "type.keyword", value: "dog" }));
        result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(0);
    });
    test("it should be able to run a simple range query ", async () => {
        await load({ index, file: "test-data/single-document.json" });

        // match
        let query = new Query({});
        query.append(rangeQuery({ field: "age", value: [15, 25] }));
        let result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(1);

        // no match
        query = new Query({});
        query.append(rangeQuery({ field: "age", value: [35, 45] }));
        result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(0);
    });
    test("it should be able to run a simple wildcard query ", async () => {
        await load({ index, file: "test-data/single-document.json" });

        // match
        let query = new Query({});
        query.append(wildcardQuery({ field: "type", value: "per*" }));
        let result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(1);

        // no match
        query = new Query({});
        query.append(wildcardQuery({ field: "type", value: "per?" }));
        result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(0);
    });
    test("it should be able to run a Bool query ", async () => {
        await load({ index, file: "test-data/single-document.json" });
        let query = new Query({});

        query.append(
            new BoolQuery().must([
                matchQuery({ field: "author.email.keyword", value: "persona@email.com" }),
                matchPhraseQuery({ field: "type", value: "person" }),
            ])
        );
        let result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(1);
    });
    test("it should be able to run a multi level Bool query ", async () => {
        await load({ index, file: "test-data/single-document.json" });
        let query = new Query({});

        query.append(
            new BoolQuery()
                .must([
                    matchQuery({ field: "author.email.keyword", value: "persona@email.com" }),
                    matchPhraseQuery({ field: "type", value: "person" }),
                    new BoolQuery().should(
                        matchQuery({ field: "author.email.keyword", value: "persona@email.com" }),
                        matchQuery({ field: "author.email.keyword", value: "personb@email.com" })
                    ),
                ])
                .should([])
        );
        let result = await queryIndex({ index, query: query.toJSON() });
        expect(result.total).toBe(1);
    });
});
