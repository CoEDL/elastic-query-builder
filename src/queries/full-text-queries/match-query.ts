/**
 *
 * @memberof full-text-queries
 * @description Assemble a matchQuery fragment. Use this when you want to match a set of words with an operator (AND or OR) exactly.
 * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html}
 * @function matchQuery
 * @param {string} field - the name of the field to perform the query against. Can be a dotted path like: publisher.name
 * @param {string} value - the value to look for
 * @param {string} operator [ 'AND', 'OR' ] - the operator to use for the search
 * @returns {Object} a query fragment
 * @example
 *  matchQuery({ field: 'name.keyword', value: 'some text', operator: 'AND })
 * @example
 *   matchQuery({ field: 'name.keyword', value: 'some text', operator: 'OR})
 */
export function matchQuery({
    field,
    value,
    operator = "AND",
}: {
    field: string;
    value: string;
    operator: "AND" | "OR";
}) {
    return {
        match: { [field]: { query: value, operator } },
    };
}
