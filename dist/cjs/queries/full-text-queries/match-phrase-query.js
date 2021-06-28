"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPhraseQuery = void 0;
function matchPhraseQuery(_a) {
    var _b;
    var field = _a.field, value = _a.value;
    return {
        match_phrase: (_b = {},
            _b[field] = value,
            _b),
    };
}
exports.matchPhraseQuery = matchPhraseQuery;
