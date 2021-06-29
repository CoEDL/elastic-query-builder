export function getElasticClient(): Client;
export function queryIndex({ index, query }: {
    index: any;
    query: any;
}): Promise<any>;
export function deleteIndex({ index }: {
    index: any;
}): Promise<void>;
export function load({ index, file }: {
    index: any;
    file: any;
}): Promise<void>;
import { Client } from "@elastic/elasticsearch";
