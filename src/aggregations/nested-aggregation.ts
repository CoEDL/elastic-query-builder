/*
 * Not yet properyl tested
 *
 */

// export function nestedAggregation({
//     path,
//     field,
//     size = 10,
// }: {
//     path?: string | any;
//     field: string;
//     size: number;
// }) {
//     return {
//         size: 0,
//         aggs: {
//             [path]: {
//                 nested: {
//                     path,
//                 },
//                 aggs: {
//                     values: {
//                         terms: { field: `${path}.${field}`, size },
//                     },
//                     count: {
//                         cardinality: {
//                             field: `${path}.${field}`,
//                             // precision_threshold: 30000
//                         },
//                     },
//                 },
//             },
//         },
//     };
// }
