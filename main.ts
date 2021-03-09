import { pipe, bind, match } from 'https://deno.land/x/ramda/source/index.js';

export interface IParserOption {
  separatorReg: RegExp,
  contentReg: RegExp,
  corpusSize: number,
}

export enum LineUtils {
  Separator = '#sep#',
  Start = '#start#',
  End = "#end#",
}

function prepareLine(line: string) {
  return LineUtils.Start + line + LineUtils.End;
}

function splitLine(line: string, contentReg: RegExp) {
  return Array.from(line.matchAll(contentReg));
}

function parseLine(line: string, option: IParserOption) {
  const f = pipe(prepareLine, splitLine);
}

export function parse(text: string, option: IParserOption) {
  const prepare = (line: string) => LineUtils.Start + line + LineUtils.End;
  const split = (line: string) => match(option.contentReg, line);
  const parseLine = pipe(prepareLine, splitLine);


  return text
    .replace(option.separatorReg, LineUtils.Separator)
    .split(LineUtils.Separator)
    .map(parseLine);
}