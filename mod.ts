export type ParserOptions = {
  separatorReg: RegExp,
  contentReg: RegExp,
  windowSize: number,
}

export type BuilderOptions = {
  size: number,
  marks: string[],
}

export type ChainData = {
  [key: string]: { //window
    _max: number,
    [key: string]: number,
  }
}

export class Chain {
  options: ParserOptions;
  data: ChainData;

  constructor(options: ParserOptions) {
    this.options = options;
    this.data = {};
  }

  private split(text: string) {
    return text
      .replace(this.options.separatorReg, '$&#sep#')
      .replace('\n', '')
      .toLowerCase()
      .split('#sep#');
  }

  private parse(list: string[]) {
    for (let i = 0; i < list.length; i+=1) {
      const windowBegin = i - Math.min(i, this.options.windowSize);
      const window = list.slice(windowBegin, i).join('_');
      const word = list[i];
      
      if (this.data[window] && this.data[window][word]) {
        this.data[window][word] += 1;
        this.data[window]._max += 1;
      } else {
        this.data[window] = { _max: 1 };
        this.data[window][word] = 1;
      }
    }
  }

  addText(text: string) {
    for (const line of this.split(text)) {
      const rawList = line.match(this.options.contentReg) || [];
      if (!rawList.length) continue;

      const list = ['#start#', ...rawList, '#end#'];
      this.parse(list);
    }
  }

  addData(data: ChainData) {
    for (const window of Object.keys(data)) {
      if (this.data[window]) {
        for (const word of Object.keys(data[window])) {
          (this.data[window][word] || 0) + data[window][word];
        }
      } else {
        this.data[window] = data[window];
      }
    }
  }

  private random(max: number) {
    return Math.floor(Math.random() * max);
  }

  private createLine(options: BuilderOptions) {
    let word = '#start#';
    let line = '';
    let window: string[] = [];

    while (word !== '#end#') {
      window.push(word);
      let windowKey = window.join('_');

      while (!this.data[windowKey]) {
        window.shift();
        windowKey = window.join('_');
        if (!window.length) throw new Error("Chain data is broken");
      }

      const link = this.data[windowKey];
      const roll = this.random(link._max);
      let index = 0;

      for (const [key, n] of Object.entries(link)) {
        index += n;
        if (index >= roll) {
          word = key;
          break;
        }
      }

      line += options.marks.includes(word) ? word : ` ${word}`;
    }
    
    return line;
  }

  build(options: BuilderOptions) {
    if (!Object.keys(this.data).length) {
      throw new Error("The chain is empty");
    }

    let text = '';

    for (let i = 0; i < options.size; i+=1) {
      text += this.createLine(options);
    }

    return text;
  }
}