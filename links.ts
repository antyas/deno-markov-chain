export class Links extends Map<string, number> {
  private constructor(entries?: Array<[string, number]>) {
    super(entries);
  }

  static new(firstWord?: string): Links {
    const links = new Links();
    if (firstWord) links.set(firstWord, 1);
    return links;
  }

  inc(word: string): Links {
    const n = this.get(word);
    return this.set(word, n ? n+1 : 1);
  }

  add(word: string, n: number): Links {
    const old = this.get(word) || 0;
    return this.set(word, old + n);
  }
}