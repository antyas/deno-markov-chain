export function getFileList(root: string): string[] {
  const dir = Deno.readDirSync(root);
  const list = Array.from(dir).map((file: Deno.DirEntry) => file.name);

  return list;
}

export function readTextFile(filePath: string) {
  return Deno.readTextFileSync(filePath);
}


