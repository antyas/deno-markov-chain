import { parser, IParserOptions } from './main.ts';
import { readTextFile } from './file.ts';

const option: IParserOptions = {
  separatorReg: /\.|!|\?/g,
  contentReg: /[ёЁа-яА-Я]+|,/g,
  corpusSize: 1,
}

const text = readTextFile('./text/test.txt');
console.log(parser(option)(text));