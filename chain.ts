import { Node } from "./node.ts";

export class Chain extends Map<string, Node> {
  private constructor(entries?: Array<[string, Node]>) {
    super(entries);
  }

  static new(entries?: Array<[string, Node]>): Chain {
    return new Chain(entries);
  }

  inc(window: string, word: string) {
    const node = this.get(window);
      
    if (node) {
      node.inc(word);
    } else {
      this.set(window, Node.new().inc(word));
    }
  }

  add(other: Chain) {
    other.forEach((otherNode, window) => {
      const node = this.get(window) || Node.new();
      otherNode.links.forEach((n, word) => node.add(word, n));
      this.set(window, node);
    });
  }
}