# deno-markov-chain

Example
```
import { Parser, Builder } from '../deno-markov-chain/mod.ts';

const parser = new Parser({
  // A regular expression for characters separating sentences
  separators: /\.|!|\?|;/g,
  // A regular expression for defining the words and characters that should be included in the chain
  content: /[ёЁа-яА-Яa-zA-Z\-]+|:|,| - |—|\.|!|\?|;/g,
  // The size of the window for linking the chain
  windowSize: 2,
});

const text = 'text for training';

const chain = parser.parse(text);

const builder = new Builder(chain, {
  // A number of sentences to create
  size: 3,
  // A regular expression for links that do not need a space before them
  marks: /\.|,|!|\?|;|:/,
});

console.log(builder.build());
```