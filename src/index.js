const {random, reduce, forEach} = require('lodash');

const tokenize = (str) => str.split(/\s+/);

const randChoice = (arr) => {
  const idx = random(0, arr.length - 1);
  return arr[idx];
};

const lines = (str) => str.split('\n');

let chain = {};

const buildEntry = (acc, line) => {
  const tokens = tokenize(line);
  if (tokens.length >= acc.ngramSize) {
    const nTokens = tokens.slice(0, tokens.length - acc.ngramSize);
    const beginning = nTokens.slice(0, acc.ngramSize).join(' ');
    acc.beginnings.push(beginning);
    forEach(nTokens, (_, idx) => {
      const gram = nTokens.slice(idx, idx + acc.ngramSize).join(' ');
      const next = nTokens[idx + acc.ngramSize];
      if(!acc.dict[gram]) { acc.dict[gram] = [] };
      acc.dict[gram].push(next);
    });
  }
  return acc;
};

const build = (n = 2, text) => {
  const textlines = lines(text);
  chain = reduce(textlines, buildEntry, {ngramSize: n, beginnings:[], dict: {}});
};

const run = (chain) => (max = 50) => {
  let start = randChoice(chain.beginnings)
  const output = tokenize(start);
  for(let i = 0; i < max; i++) {
		if(chain.dict[start]) {
			const nextOptions = chain.dict[start];
			const next = randChoice(nextOptions);
			output.push(next);
			start = output.slice(output.length - chain.ngramSize, output.length).join(' ');
		} else {
			break;
		}
  };
  
  return output.join(' ');
};

module.exports = {
  build,
  run: run(chain)
};