import { file } from "bun";

const dayArg = Bun.argv[2];

if (!dayArg) {
  console.error("Please provide a day number: bun solve <day>");
  process.exit(1);
}

const day = dayArg.padStart(2, "0");
const path = `./day-${day}/index.ts`;

console.log(`Running Advent of Code 2025 - Day ${day}`);

const dayFile = file(`src/day-${day}/index.ts`);
if (await dayFile.exists()) {
  await import(path);
} else {
  console.error(`Day ${day} not found. Run 'bun scaffold ${day}' first.`);
}
