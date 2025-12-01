import { existsSync, mkdirSync } from "node:fs";

const dayArg = Bun.argv[2];

if (!dayArg) {
  console.error("Please provide a day number: bun scaffold <day>");
  process.exit(1);
}

const day = dayArg.padStart(2, "0");
const directory = `src/day-${day}`;
const solutionPath = `${directory}/index.ts`;
const inputPath = `inputs/day-${day}.txt`;

console.log(`Scaffolding Day ${day}...`);

if (!existsSync(directory)) {
  mkdirSync(directory, { recursive: true });
  console.log(`Created directory: ${directory}`);
}

if (existsSync(solutionPath)) {
  console.log(`Solution file already exists, skipping.`);
} else {
  const template = `import { readInput } from "../utils";

const rawInput = await readInput(import.meta.url);
const lines = rawInput.trim().split("\\n");

console.log("--- Day ${day} ---");

// Part 1
console.log("Part 1:");

// Part 2
// console.log("Part 2:");
`;

  await Bun.write(solutionPath, template);
  console.log(`Created solution: ${solutionPath}`);
}

if (existsSync(inputPath)) {
  console.log(`⚠️ Input file already exists, skipping.`);
} else {
  await Bun.write(inputPath, "");
  console.log(`Created input: ${inputPath}`);
}

console.log("Ready!");
