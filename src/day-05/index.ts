import { readInput } from "../utils";

const rawInput = await readInput(import.meta.url);
const lines = rawInput.trim().split("\n");

console.log("--- Day 05 ---");

const [rangeSection, idSection] = rawInput
  .replace(/\r/g, "")
  .trim()
  .split("\n\n");

const ranges = rangeSection?.split("\n").map((line) => {
  const [min, max] = line.split("-").map(Number);
  return { min, max };
});

const ids = idSection?.split("\n").map(Number);

// Part 1
console.log("Part 1:");

let freshCount = 0;

for (const id of ids!) {
  const isFresh = ranges?.some((range) => id >= range.min! && id <= range.max!);

  if (isFresh) {
    freshCount++;
  }
}

console.log(freshCount);

// Part 2
console.log("Part 2:");

ranges?.sort((a, b) => a.min - b.min);

let totalFreshCoords = 0;

let currentMin = ranges![0]?.min;
let currentMax = ranges![0]?.max;

for (let i = 1; i < ranges!.length; i++) {
  const next = ranges![i];

  if (next!.min! <= currentMax! + 1) {
    currentMax = Math.max(currentMax!, next!.max!);
  } else {
    totalFreshCoords += currentMax! - currentMin! + 1;

    currentMin = next?.min;
    currentMax = next?.max;
  }
}

totalFreshCoords += currentMax! - currentMin! + 1;

console.log(totalFreshCoords);
