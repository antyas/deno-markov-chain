import { Links } from './links.ts';

export class Node {
  max: number;
  links: Links;

  private constructor(max: number, links: Links) {
    this.max = max;
    this.links = links;
  }

  static new(links?: Links): Node {
    if (!links) {
      return new Node(0, Links.new());
    }

    const max = Array.from(links).reduce((sum, [_, n]) => sum + n, 0);
    return new Node(max, links);
  }

  inc(word: string): Node {
    this.links.inc(word);
    this.max += 1;
    return this;
  }

  add(word: string, n: number): Node {
    this.links.add(word, n);
    this.max += n;
    return this;
  }
}