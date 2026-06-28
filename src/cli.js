#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { EXAMPLES, loadExample } from "./registry.js";

function printHelp() {
  console.log("Usage:");
  console.log("  velr-js-examples list");
  console.log("  velr-js-examples <example_name>");
  console.log();
  console.log("Examples:");
  for (const name of EXAMPLES) console.log(`  ${name}`);
}

export async function main(argv = process.argv.slice(2)) {
  if (argv.length === 0 || ["-h", "--help", "help"].includes(argv[0])) {
    printHelp();
    return 0;
  }

  const command = argv[0];
  if (command === "list") {
    for (const name of EXAMPLES) console.log(name);
    return 0;
  }

  if (!EXAMPLES.includes(command)) {
    console.error(`Unknown example: ${command}`);
    console.error();
    console.error("Run `velr-js-examples list` to see available examples.");
    return 2;
  }

  const module = await loadExample(command);
  await module.main();
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const code = await main();
  process.exitCode = code;
}
