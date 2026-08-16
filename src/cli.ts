#!/usr/bin/env node
/**
 * GenzLang CLI.
 *
 * Usage:
 *   genzlang <file.yap>     run a program
 *   genzlang --version      print version
 *   genzlang --help         print usage
 *
 * Arg parsing is intentionally dependency-free.
 */

import { readFileSync } from "node:fs";
import { resolve, extname } from "node:path";
import { run } from "./runner.js";
import { FILE_EXTENSION, LANGUAGE_NAME } from "./keywords.js";

const VERSION = "0.1.0";

function usage(): string {
  return [
    `${LANGUAGE_NAME} v${VERSION} — a Gen-Z toy language 🔥`,
    "",
    "Usage:",
    `  genzlang <file${FILE_EXTENSION}>     run a program`,
    "  genzlang --version          print the version",
    "  genzlang --help             show this help",
    "",
    "Example:",
    "  genzlang examples/fizzbuzz.yap",
  ].join("\n");
}

function main(argv: string[]): number {
  const args = argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(usage());
    return args.length === 0 ? 1 : 0;
  }

  if (args.includes("--version") || args.includes("-v")) {
    console.log(VERSION);
    return 0;
  }

  const filePath = args[0] as string;

  if (extname(filePath) !== FILE_EXTENSION) {
    console.error(
      `⚠️  heads up: '${filePath}' doesn't end in '${FILE_EXTENSION}'. Running it anyway...`,
    );
  }

  let source: string;
  try {
    source = readFileSync(resolve(filePath), "utf8");
  } catch {
    console.error(`💀 can't find that file: '${filePath}'`);
    return 1;
  }

  const result = run(source, (text) => console.log(text));
  return result.ok ? 0 : 1;
}

process.exit(main(process.argv));
