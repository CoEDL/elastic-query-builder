import { Headers } from "headers-utils";
const fetch = require("node-fetch");

export async function execute({
    service,
    index,
    query,
}: {
    service: string;
    index: string;
    query: {};
}) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    index = index ? `${service}/${index}/_search` : `${service}/${index}`;
    let response = await fetch(index, {
        method: "POST",
        headers,
        body: JSON.stringify(query),
    });
    if (response.status !== 200) {
        return response.json();
    }
    response = await response.json();
    const total = response.hits.total.value;
    const aggregations = response.aggregations;
    const documents = response.hits.hits;
    return { total, documents, aggregations };
}
