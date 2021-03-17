# deno-markov-chain

Example of ParserOptions
```
const option: ParserOptions = {
  separatorReg: /\.|!|\?/g,
  contentReg: /[ёЁа-яА-Яa-zA-Z0-9$%'"]+|,|-/g,
  windowSize: 2,
}
```

Example of BuilderOptions
```
const option: BuilderOptions = {
  size: 3,
  marks: ['.', ',', '!', '?', ';', ':'],
}
```