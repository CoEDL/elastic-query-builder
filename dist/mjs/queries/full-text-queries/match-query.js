export function matchQuery({ field, value, operator = "AND", }) {
    return {
        match: { [field]: { query: value, operator } },
    };
}
