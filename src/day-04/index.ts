import { readInput } from "../utils";

const rawInput = await readInput(import.meta.url);
const lines = rawInput.trim().split("\n");

console.log("--- Day 04 ---");

// Part 1
console.log("Part 1:");

const rows = lines.length;
const cols = lines[0]?.length;

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

let accessibleCount = 0;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols!; c++) {
    const currentCell = lines[r]![c];

    if (currentCell !== "@") continue;

    let neighborCount = 0;

    for (const [dr, dc] of directions) {
      const nr = r + dr!;
      const nc = c + dc!;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols!) {
        if (lines[nr]![nc] === "@") {
          neighborCount++;
        }
      }
    }

    if (neighborCount < 4) {
      accessibleCount++;
    }
  }
}

console.log(accessibleCount);

// Part 2
// console.log("Part 2:");
