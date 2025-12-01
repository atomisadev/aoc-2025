import { file } from "bun";
import { dirname, basename, join } from "path";

export async function readInput(importMetaUrl: string) {
  const folderName = basename(dirname(new URL(importMetaUrl).pathname));

  const inputPath = join(process.cwd(), "inputs", `${folderName}.txt`);

  const inputFile = file(inputPath);
  if (!(await inputFile.exists())) {
    throw new Error(`Input file not found at: ${inputPath}`);
  }

  return await inputFile.text();
}
