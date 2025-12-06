import { couldStartTrivia, getTokenSourceMapRange } from "typescript";
import { readInput } from "../utils";

const rawInput = await readInput(import.meta.url);
const lines = rawInput.trim().split("\n");

console.log("--- Day 06 ---");

const maxWidth = lines.reduce((max, line) => Math.max(max, line.length), 0);

function isColumnEmpty(colIndex: number): boolean {
  for (const line of lines) {
    const char = line[colIndex];
    if (char !== undefined && char !== " ") {
      return false;
    }
  }
  return true;
}

interface ProblemBlock {
  startCol: number;
  endCol: number;
}

const blocks: ProblemBlock[] = [];
let currentBlockStart: number | null = null;

for (let x = 0; x < maxWidth; x++) {
  const empty = isColumnEmpty(x);

  if (currentBlockStart === null && !empty) {
    currentBlockStart = x;
  } else if (currentBlockStart !== null && empty) {
    blocks.push({ startCol: currentBlockStart, endCol: x });
    currentBlockStart = null;
  }
}

if (currentBlockStart !== null) {
  blocks.push({ startCol: currentBlockStart, endCol: maxWidth });
}

// Part 1
console.log("Part 1:");

let grandTotalPart1 = 0;

for (const block of blocks) {
  const tokens: string[] = [];

  for (const line of lines) {
    const segment = line.slice(block.startCol, block.endCol).trim();
    if (segment.length > 0) tokens.push(segment);
  }

  if (tokens.length < 2) continue;

  const operator = tokens.pop();
  const numbers = tokens.map((t) => parseInt(t, 10));

  let problemResult = 0;

  if (operator === "+") {
    problemResult = numbers.reduce((sum, num) => sum + num, 0);
  } else if (operator === "*") {
    problemResult = numbers.reduce((prod, num) => prod * num, 1);
  }

  grandTotalPart1 += problemResult;
}

console.log(grandTotalPart1);

// Part 2
console.log("Part 2:");

let grandTotalPart2 = 0;

for (const block of blocks) {
  let operator: string | null = null;

  for (const line of lines) {
    const segment = line.slice(block.startCol, block.endCol);
    if (segment.includes("*")) operator = "*";
    if (segment.includes("+")) operator = "+";
  }

  if (!operator) {
    console.error(
      `No operator found in block ${block.startCol}-${block.endCol}`
    );
    continue;
  }

  const numbers: number[] = [];

  for (let x = block.endCol - 1; x >= block.startCol; x--) {
    let numStr = "";

    for (const line of lines) {
      const char = line[x];

      if (char && /[0-9]/.test(char)) {
        numStr += char;
      }
    }

    if (numStr.length > 0) {
      numbers.push(parseInt(numStr, 10));
    }
  }

  let blockResult = 0;
  if (operator === "+") {
    blockResult = numbers.reduce((sum, num) => sum + num, 0);
  } else if (operator === "*") {
    blockResult = numbers.reduce((prod, num) => prod * num, 1);
  }

  grandTotalPart2 += blockResult;
}

console.log(grandTotalPart2);
