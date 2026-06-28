import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const env = { ...process.env, VELR_EXAMPLES_NATIVE: "1" };
delete env.VELR_NATIVE_LIBRARY;
delete env.VELR_LIB;

const vitest = join(root, "node_modules", "vitest", "vitest.mjs");
const result = spawnSync(process.execPath, [vitest, "run"], {
  cwd: root,
  env,
  stdio: "inherit"
});

if (result.error) {
  console.error(result.error);
  process.exitCode = 1;
} else {
  process.exitCode = result.status ?? 1;
}
