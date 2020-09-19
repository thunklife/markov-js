
const build = require('../src/index');
const shortText = require('./short-text');
const longText = require('./long-text');

const runByWordsPromise = build(shortText, 3, false)
const runByCharsPromise = build(longText, 6, true)

Promise
  .all([runByWordsPromise, runByCharsPromise])
  .then(([runByWords, runByChars]) => {
    const wordPhrase = runByWords(100);
    const charPhrase = runByChars(2000);
    console.log(`WORDS: ${wordPhrase} \n`);
    console.log(`CHARS: ${charPhrase}`);
  });