import { describe, expect, it } from "vitest";
import { loadExample } from "../src/registry.js";

const runNative = process.env.VELR_EXAMPLES_NATIVE === "1";

describe("native smoke examples", () => {
  for (const name of ["basic_query", "transaction", "savepoints"]) {
    it(`runs ${name}`, async () => {
      if (!runNative) return;
      const module = await loadExample(name);
      await module.main();
      expect(true).toBe(true);
    });
  }
});
