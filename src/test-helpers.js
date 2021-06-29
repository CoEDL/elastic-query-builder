const path = require("path");
const { execute } = require("../dist/cjs/helpers");
const { readJSON } = require("fs-extra");
const { isArray, isPlainObject } = require("lodash");
const { Client } = require("@elastic/elasticsearch");

const elasticUrl = "http://localhost:9200";

module.exports = {
    getElasticClient,
    queryIndex,
    deleteIndex,
    load,
};

async function deleteIndex({ index }) {
    let client = getElasticClient();
    await client.indices.delete({ index });
}

async function load({ index, file }) {
    let json = await readJSON(path.join(__dirname, file));
    let client = getElasticClient();
    if (isArray(json)) {
        let docs = json.flatMap((d, i) => [
            {
                index: {
                    _index: index,
                    _id: `${file}_#${i}`,
                },
            },
            d,
        ]);
        await client.bulk({
            refresh: true,
            body: docs,
        });
    } else if (isPlainObject(json)) {
        await client.index({ id: file, index, body: json, refresh: true });
    }
}

function getElasticClient() {
    return new Client({
        node: elasticUrl,
    });
}

async function queryIndex({ index, query }) {
    return await execute({
        service: elasticUrl,
        index,
        query,
    });
}
