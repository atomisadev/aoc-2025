import { readInput } from "../utils";

const rawInput = await readInput(import.meta.url);
const lines = rawInput.trim().split("\n");

console.log("--- Day 07 ---");

// Part 1
console.log("Part 1:");

const grid: string[][] = lines.map((line) => line.split(""));

if (grid.length === 0) throw new Error("Input grid empty");

const height = grid.length;
const width = grid[0]?.length;

let startCol: number | null = -1;
let startRow: number | null = -1;

for (let r = 0; r < height; r++) {
  const row = grid[r];
  const c = row?.indexOf("S") ?? -1;
  if (c !== -1) {
    startRow = r;
    startCol = c;
    break;
  }
}

if (startRow === null || startCol === null) {
  throw new Error("Cloud not find start point 'S' in the grid");
}

let activeBeams = new Set<number>();
activeBeams.add(startCol);

let splitCount = 0;

for (let r = startRow + 1; r < height; r++) {
  const nextBeams = new Set<number>();
  const currentRow = grid[r];

  if (!currentRow) continue;

  for (const col of activeBeams) {
    const cell = currentRow[col];

    if (cell === undefined) continue;

    if (cell === "^") {
      splitCount++;
      nextBeams.add(col - 1);
      nextBeams.add(col + 1);
    } else {
      nextBeams.add(col);
    }
  }

  activeBeams = nextBeams;

  if (activeBeams.size === 0) break;
}

console.log(splitCount);

// Part 2
// console.log("Part 2:");
