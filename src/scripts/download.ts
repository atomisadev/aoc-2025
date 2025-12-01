import { existsSync } from "node:fs";

const dayArg = Bun.argv[2];

if (!dayArg) {
  console.error("Please provide a day number: bun download <day>");
  process.exit(1);
}

const dayNum = parseInt(dayArg, 10);
const dayPad = dayArg.padStart(2, "0");
const year = 2025;

const url = `https://adventofcode.com/${year}/day/${dayNum}/input`;
const destPath = `inputs/day-${dayPad}.txt`;

const session = Bun.env.AOC_SESSION;
if (!session) {
  console.error("Error: AOC_SESSION not found in .env file.");
  process.exit(1);
}

console.log(`Fetching input for Day ${dayNum}...`);

try {
  const response = await fetch(url, {
    headers: {
      Cookie: `session=${session}`,
      "User-Agent": "github.com/atomisadev/aoc2025 by bun-script",
    },
  });

  if (response.status === 404) {
    console.error("❌ Error: Puzzle not available yet (404).");
    process.exit(1);
  }

  if (response.status !== 200) {
    console.error(
      `❌ Error: Failed to fetch input. Status: ${response.status} ${response.statusText}`
    );
    process.exit(1);
  }

  const input = await response.text();

  await Bun.write(destPath, input.trimEnd());
  console.log(`Saved input to ${destPath}`);
} catch (error) {
  console.error("Network error:", error);
}
