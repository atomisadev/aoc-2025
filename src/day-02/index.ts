import { readInput } from "../utils";

const rawInput = await readInput(import.meta.url);
const lines = rawInput.trim().split("\n");

console.log("--- Day 02 ---");

// Part 1
console.log("Part 1:");

function isInvalidId(num: number) {
  const s = num.toString();

  if (s.length % 2 !== 0) {
    return false;
  }

  const mid = s.length / 2;
  const firstHalf = s.substring(0, mid);
  const secondHalf = s.substring(mid);

  return firstHalf === secondHalf;
}

const allRanges = lines.join("").trim().split(",");

let totalSum = 0;

for (const range of allRanges) {
  if (!range) continue;
  const [startStr, endStr] = range.split("-");
  const start = parseInt(startStr as string, 10);
  const end = parseInt(endStr as string, 10);

  for (let id = start; id <= end; id++) {
    if (isInvalidId(id)) {
      totalSum += id;
    }
  }
}

console.log(totalSum);

// Part 2
console.log("Part 2:");
