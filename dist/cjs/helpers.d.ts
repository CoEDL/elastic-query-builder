export declare function execute({ service, index, query, }: {
    service: string;
    index: string;
    query: {};
}): Promise<{
    total?: undefined;
    documents?: undefined;
    aggregations?: undefined;
} | {
    total: any;
    documents: any;
    aggregations: any;
}>;
