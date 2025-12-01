# Advent of Code 2025

These are my solutions for the 2025 Advent of Code challenge.

To install dependencies:

```bash
bun install
```

In order to run, you can run these following commands:

- **Start a new AoC session:** `bun start <day number>`. This will download the necessary input file for that specific day from AoC and put it right where it needs to be in the `inputs/` directory. **Note:** For this feature, you must have your AoC session token listed inside the `.env` file.
- **Download input file (individually):** `bun download <day number>`. If you so choose to download the input file separately without setting up the day, you can do so. Running this command will download the input file for that day from AoC. **Note:** For this feature, you must have your AoC session token listed inside the `.env` file.
- **Create boilerplate files:** `bun scaffold <day number>`. If you so choose to not use the `start` command and instead just generate the boilerpalte code separately, you can do so. Running this command will setup the inputted day inside the `src/` directory and make it runnable.
- **Run code:** `bun solve <day number>`. This will allow you to run the code for that specific day.

I built this for myself but if anyone wants to use it, go ahead.
