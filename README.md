# markov-text-gen

A simple library to generate random text using a Markov chain.

## Description

`markov-text-gen` generates a random sentence based on a the source text provided.

It provides two ways to create random text by exposing a `build` function that gets
passed the text to be ingested, the desired nGram size, and boolean flag to build `byChars`.
The `build` function creates a Markov Chain based on source text and the nGram size passed,
and returns a `run` function that is passed the number of times `run` should loop for before
returning; the default for generating text via characters is `1000`, for words the default is `50.
The return value is a randomly generated `string`.

## Example

```javascript
import text from './text';
import build from 'markov-text-gen';

const run = build(text, 3, false); // The text to be ingested, the nGram size, and whether to build byChars
const result = run(35);

console.log(result);
```

## Inspiration

The Coding Train [YouTube](https://www.youtube.com/watch?v=eGFJ8vugIWA)

The Coding Train [GitHub](https://github.com/shiffman/A2Z-F16/tree/gh-pages/week7-markov/03_markov_byword)

[Markov Chains Explained Visually](https://setosa.io/ev/markov-chains/)