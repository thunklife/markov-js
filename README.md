# markov-text-gen

A simple library to generate random text using a Markov chain.

## Description

`markov-text-gen` generates a random sentence based on a the source text provided.

It provides a `build` function that gets passed the text to be ingested and the nGram size desired. The `build` function creates a Markov Chain based on source text and the nGram size passed, and returns a `run` funtion that is passed the number of times `run` should loop for before returning. The return value is a randomly generated `string`.

## Example

```javascript
import text from './text';
import build from 'markov-text-gen';

const run = build(3, text);
const result = run(35);

console.log(result);
```

## Inspiration

The Coding Train [YouTube](https://www.youtube.com/watch?v=eGFJ8vugIWA)

The Coding Train [GitHub](https://github.com/shiffman/A2Z-F16/tree/gh-pages/week7-markov/03_markov_byword)

[Markov Chains Explained Visually](https://setosa.io/ev/markov-chains/)