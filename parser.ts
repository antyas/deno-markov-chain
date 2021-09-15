import { Chain } from "./chain.ts";

export type ParserOptions = {
  separators: RegExp,
  content: RegExp,
  windowSize: number,
}

export class Parser {
  private options: ParserOptions;

  constructor(options: ParserOptions) {
    this.options = options;
  }

  private split(text: string): string[] {
    return text
      .replace(#sep#, '.') // for manually set separators
      .replace(this.options.separators, '$&#sep#')
      .replace('\n', '')
      .toLowerCase()
      .split('#sep#');
  }

  private parseLine(chain: Chain, line: string): Chain {
    const rawList = line.match(this.options.content) || [];

    if (rawList.length) {
      const list = ['#start#', ...rawList, '#end#'];

      for (let i = 0; i < list.length; i+=1) {
        const windowBegin = i - Math.min(i, this.options.windowSize);
        const window = list.slice(windowBegin, i).join('_');
        const word = list[i];
        
        chain.inc(window, word);
      }
    }

    return chain;
  }

  parse(text: string, other?: Chain): Chain {
    const chain = other || Chain.new();
    return this.split(text).reduce(this.parseLine.bind(this), chain);
  }
}