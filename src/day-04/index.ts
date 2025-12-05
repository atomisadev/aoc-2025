import { isBinaryOperatorToken } from "typescript";
import { readInput } from "../utils";

const rawInput = await readInput(import.meta.url);
const lines = rawInput.trim().split("\n");

console.log("--- Day 04 ---");

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function countNeighbors(grid: string[][], r: number, c: number) {
  const rows = grid.length;
  const cols = grid[0]?.length;
  let count = 0;

  for (const [dr, dc] of directions) {
    const nr = r + dr!;
    const nc = c + dc!;

    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols!) {
      if (grid[nr]![nc] === "@") {
        count++;
      }
    }
  }
  return count;
}

// Part 1
console.log("Part 1:");

const gridP1 = lines.map((line) => line.split(""));
let p1Count = 0;

for (let r = 0; r < gridP1.length; r++) {
  for (let c = 0; c < gridP1[0]?.length!; c++) {
    if (gridP1[r]![c] === "@" && countNeighbors(gridP1, r, c) < 4) {
      p1Count++;
    }
  }
}

console.log(p1Count);

// Part 2
console.log("Part 2:");

let gridP2 = lines.map((line) => line.split(""));
let totalRemoved = 0;

while (true) {
  const toRemove: [number, number][] = [];

  for (let r = 0; r < gridP2.length; r++) {
    for (let c = 0; c < gridP2[0]?.length!; c++) {
      if (gridP2[r]![c] === "@") {
        const neighbors = countNeighbors(gridP2, r, c);
        if (neighbors < 4) {
          toRemove.push([r, c]);
        }
      }
    }
  }

  if (toRemove.length === 0) {
    break;
  }

  totalRemoved += toRemove.length;
  for (const [r, c] of toRemove) {
    gridP2[r]![c] = ".";
  }
}

console.log(totalRemoved);
