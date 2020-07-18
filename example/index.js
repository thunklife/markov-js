
const build = require('../src/index');
const text = require('./text');

const run = build(2, text);
const phrase = run(50);
console.log(phrase);