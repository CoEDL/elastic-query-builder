export function wildcardQuery({ field, value }: { field: string; value: string }) {
    return { wildcard: { [field]: value } };
}
