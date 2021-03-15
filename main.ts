import { pipe, __, match, prop, compose, curry, concat, replace, split, map } from 'https://deno.land/x/ramda/source/index.js';

export interface IParserOptions {
  separatorReg: RegExp,
  contentReg: RegExp,
  corpusSize: number,
}

export const parser = (options: IParserOptions) => 
  (text: string): string[] =>
    pipe(
      split(options.separatorReg),
      map(
        concat('#start#', __, '#end#'),
        match(options.contentReg),
      ),
    );