const day = Bun.argv[2];

if (!day) {
  console.error("Usage: bun start <day>");
  process.exit(1);
}

console.log(`🚀 Starting Day ${day} setup...`);

const scaffold = Bun.spawnSync(["bun", "run", "scaffold", day], {
  stdout: "inherit",
  stderr: "inherit",
});

if (scaffold.exitCode !== 0) {
  console.error("Scaffold failed.");
  process.exit(scaffold.exitCode);
}

console.log("");

const download = Bun.spawnSync(["bun", "run", "download", day], {
  stdout: "inherit",
  stderr: "inherit",
});

if (download.exitCode !== 0) {
  console.error("Download failed.");
  process.exit(download.exitCode);
}

console.log("\n✨ All set!");
