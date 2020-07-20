
const build = require('../src/index');
const shortText = require('./short-text');
const longText = require('./long-text');

const runByWords = build(shortText, 3, false);
const runByChars = build(longText, 6, true);
const wordPhrase = runByWords(100);
const charPhrase = runByChars(2000);
console.log(`WORDS: ${wordPhrase} \n`);
console.log(`CHARS: ${charPhrase}`);