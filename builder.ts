import { Chain } from "./chain.ts";

export type BuilderOptions = {
  size: number,
  marks: RegExp,
}

export class Builder {
  private options: BuilderOptions;
  private chain: Chain;

  constructor(chain: Chain, options: BuilderOptions) {
    this.chain = chain;
    this.options = options;
  }

  private lineToNormal(rawLine: string) {
    const string = rawLine.replace(/#sep#|#end#/g, '').trim();
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  }

  private random(max: number) {
    return Math.floor(Math.random() * max);
  }

  private error(): never {
    throw new Error("Chain is broken");
  }

  private createLine() {
    let word = '#start#';
    let line = '';
    let window: string[] = [];

    while (word !== '#end#') {
      window.push(word);
      let windowKey = window.join('_');

      while (windowKey && !this.chain.has(windowKey)) {
        window.shift();
        windowKey = window.join('_');
      }

      const node = this.chain.get(windowKey) || this.error();
      const roll = this.random(node.max);
      let index = 0;

      for (const [key, n] of node.links) {
        index += n;
        if (index >= roll) {
          word = key;
          break;
        }
      }

      line += this.options.marks.test(word) ? word : ` ${word}`;
    }
    
    return this.lineToNormal(line);
  }

  build() {
    let text = '';

    for (let i = 0; i < this.options.size; i+=1) {
      text += this.createLine() + ' ';
    }

    return text;
  }
}