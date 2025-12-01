import { readInput } from "../utils";

const rawInput = await readInput(import.meta.url);
const lines = rawInput.trim().split("\n");

console.log("--- Day 01 ---");

// Part 1
console.log("Part 1:");

const DIAL_SIZE = 100;

let currentPosition = 50;
let zeroCount = 0;

for (const line of lines) {
  if (!line) continue;

  const direction = line[0];
  const amount = parseInt(line.substring(1), 10);

  if (direction === "R") {
    currentPosition = (currentPosition + amount) % DIAL_SIZE;
  } else if (direction === "L") {
    currentPosition = (currentPosition - amount) % DIAL_SIZE;

    if (currentPosition < 0) {
      currentPosition += DIAL_SIZE;
    }
  }

  if (currentPosition === 0) {
    zeroCount++;
  }
}

console.log("Answer: " + zeroCount);

// Part 2
console.log("Part 2:");

let currentPosP2 = 50;
let totalClicksOnZero = 0;

for (const line of lines) {
  if (!line) continue;

  const direction = line[0];
  const amount = parseInt(line.substring(1), 10);

  for (let i = 0; i < amount; i++) {
    if (direction === "R") {
      currentPosP2++;
      if (currentPosP2 === DIAL_SIZE) {
        currentPosP2 = 0;
      }
    } else {
      currentPosP2--;
      if (currentPosP2 < 0) {
        currentPosP2 = DIAL_SIZE - 1;
      }
    }

    if (currentPosP2 === 0) {
      totalClicksOnZero++;
    }
  }
}

console.log("Answer: " + totalClicksOnZero);
