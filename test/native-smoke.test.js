import { describe, expect, it } from "vitest";
import { loadExample } from "../src/registry.js";

const runNative = process.env.VELR_EXAMPLES_NATIVE === "1";

async function runExample(name) {
  const module = await loadExample(name);
  const lines = [];
  const originalLog = console.log;
  console.log = (...args) => {
    lines.push(args.map(String).join(" "));
    originalLog(...args);
  };
  try {
    await module.main();
  } finally {
    console.log = originalLog;
  }
  return lines;
}

describe("native smoke examples", () => {
  for (const name of ["basic_query", "transaction", "savepoints", "bind_arrow_people"]) {
    it(`runs ${name}`, async () => {
      if (!runNative) return;
      const lines = await runExample(name);
      if (name === "bind_arrow_people") {
        expect(lines.map((line) => JSON.parse(line))).toEqual([
          { name: "Ada", born: 1815 },
          { name: "Grace", born: 1906 }
        ]);
      } else {
        expect(true).toBe(true);
      }
    });
  }
});
