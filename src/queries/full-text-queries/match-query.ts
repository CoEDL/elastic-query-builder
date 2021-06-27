export function matchQuery({
    field,
    value,
    operator = "AND",
}: {
    field: string;
    value: string;
    operator: string;
}) {
    return {
        match: { [field]: { query: value, operator } },
    };
}
