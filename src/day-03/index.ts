import { readInput } from "../utils";

const rawInput = await readInput(import.meta.url);
const lines = rawInput.trim().split("\n");

console.log("--- Day 03 ---");

// Part 1
console.log("Part 1:");

let totalOutputJoltage = 0;

for (const line of lines) {
  if (line.length < 2) continue;

  let maxBankJoltage = 0;

  for (let i = 0; i < line.length; i++) {
    for (let j = i + 1; j < line.length; j++) {
      const joltage = parseInt(line[i]! + line[j]!);

      if (joltage > maxBankJoltage) {
        maxBankJoltage = joltage;
      }

      if (maxBankJoltage === 99) break;
    }
    if (maxBankJoltage === 99) break;
  }

  totalOutputJoltage += maxBankJoltage;
}

console.log(totalOutputJoltage);

// Part 2
// console.log("Part 2:");
