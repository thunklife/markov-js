const {random, reduce, forEach} = require('lodash');

const tokenize = (str) => str.split(/\s+/);

const randChoice = (arr) => {
  const idx = random(0, arr.length - 1);
  return arr[idx];
};

const fullSentences = (text) => {
  const t = text.split(/\.(?=[^\.]+$)/)[0];
  return t.endsWith('.') ? t : t.concat('.');
};

const lines = (str) => str.split('\n');

const buildEntryByChars = (acc, line) => {
  if(line.length <= 0) { return acc; }
  const beginning = line.substring(0, acc.ngramSize);
  acc.beginnings.push(beginning);
  for (let i = 0; i < line.length - acc.ngramSize; i++) {
    const gram = line.substring(i, i + acc.ngramSize);
    const next = line.charAt(i + acc.ngramSize);
    if (!acc.dict[gram]) { acc.dict[gram] = []; }
    acc.dict[gram].push(next);
  }
  return acc;
}

const buildEntryByWords = (acc, line) => {
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

const runWords = (chain) => (max = 50) => {
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
    };
  };
  
  return fullSentences(output.join(' '));
};

const runChars = (chain) => (max = 1000) => {
  let start = randChoice(chain.beginnings)
  let output = start;

  for(let i = 0; i < max; i++) {
    if(chain.dict[start]) {
      const nextOptions = chain.dict[start];
      const next = randChoice(nextOptions);
      output = output.concat(next);
      start = output.substring(output.length - chain.ngramSize, output.length);
    } else {
      break;
    };
  };
  
  return fullSentences(output);
};

const build = (text, n, byChar) => {
  return new Promise((resolve, reject) => {
    try {
      if(byChar) {
        if(text.length < n) reject(new Error('Text is not long enough'));
        const textArr = text.split('\n');
        const res = reduce(textArr, buildEntryByChars, {ngramSize: n, beginnings:[], dict: {}});
        resolve(runChars(res));
      } else {
        const textLines = lines(text);
        const res = reduce(textLines, buildEntryByWords, {ngramSize: n, beginnings:[], dict: {}});
        resolve(runWords(res))
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = build;