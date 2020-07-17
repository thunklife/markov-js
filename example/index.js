
const {build, run} = require('../src/index');
const text = require('./text');

build(2, text);
const phrase = run(50);
console.log(phrase);