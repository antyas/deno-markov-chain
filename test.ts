import { Chain, IParserOptions } from './chain.ts';
import { readTextFile } from './file.ts';

const option: IParserOptions = {
  separatorReg: /\.|!|\?/g,
  contentReg: /[ёЁа-яА-Я]+|,/g,
  windowSize: 3,
}

const text = readTextFile('./text/test.txt');
const chain = new Chain(option);
chain.add(text);
chain.log();