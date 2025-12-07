import { readInput } from "../utils";

const rawInput = await readInput(import.meta.url);
const lines = rawInput.trim().split("\n");

console.log("--- Day 07 ---");

// Part 1
console.log("Part 1:");

type Grid = string[][];
type TimelineMap = Map<number, bigint>;

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
console.log("Part 2:");

let currentTimelines: TimelineMap = new Map();

currentTimelines.set(startCol, 1n);

let completedTimelines = 0n;

for (let r = startRow + 1; r < height; r++) {
  const nextTimelines: TimelineMap = new Map();
  const currentRow = grid[r];

  if (!currentRow) continue;

  for (const [col, count] of currentTimelines.entries()) {
    const cell = currentRow[col];

    const addNext = (targetCol: number, amount: bigint) => {
      if (targetCol < 0 || targetCol >= width!) {
        completedTimelines += amount;
      } else {
        const current = nextTimelines.get(targetCol) || 0n;
        nextTimelines.set(targetCol, current + amount);
      }
    };

    if (cell === "^") {
      // splitter so the timeline splits into 2 distinct realities
      // here is reality where it went left
      addNext(col - 1, count);
      // realitry where it went right
      addNext(col + 1, count);
    } else {
      // timeline continues downward unchanged
      addNext(col, count);
    }
  }

  currentTimelines = nextTimelines;

  // if no timelines left we stop
  if (currentTimelines.size === 0) break;
}

for (const count of currentTimelines.values()) {
  completedTimelines += count;
}

console.log(completedTimelines.toString());
