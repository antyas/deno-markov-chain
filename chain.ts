export type IParserOptions = {
  separatorReg: RegExp,
  contentReg: RegExp,
  windowSize: number,
}

export type Link = {
  [key: string]: {
    word: string,
    n: number,
  }
}
export class Chain {
  options: IParserOptions;
  private chain: { [key: string]: Link };

  constructor(options: IParserOptions) {
    this.options = options;
    this.chain = {};
  }

  private split(text: string) {
    return text
      .replace(this.options.separatorReg, '$&#sep#')
      .replace('\n', '')
      .split('#sep#');
  }

  private parse(list: string[]) {
    for (let i = 0; i < list.length; i+=1) {
      const windowBegin = i - Math.min(i, this.options.windowSize);
      const window = list.slice(windowBegin, i).join('_');
      const word = list[i];
      const link = this.chain[window] && this.chain[window][word];
      
      if (link) {
        this.chain[window][word].n += 1;
      } else {
        this.chain[window] = {};
        this.chain[window][word] = {
          word,
          n: 1,
        }
      }
    }
  }

  add(text: string) {
    for (const line of this.split(text)) {
      const rawList = line.match(this.options.contentReg) || [];
      if (!rawList.length) continue;

      const list = ['#start#', ...rawList, '#end#'];
      this.parse(list);
    }
  }

  log() {
    console.log(this.chain);
  }
}