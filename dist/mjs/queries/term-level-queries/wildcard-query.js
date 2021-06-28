export function wildcardQuery({ field, value }) {
    return { wildcard: { [field]: value } };
}
