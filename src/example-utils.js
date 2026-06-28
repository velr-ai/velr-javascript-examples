import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { Velr } from "@velr-ai/velr";

export const MOVIES_CREATE = `
CREATE (:Movie {title:'The Matrix', released:1999}),
       (:Movie {title:'Interstellar', released:2014}),
       (:Movie {title:'Arrival', released:2016})
`;

export function runIfMain(metaUrl, main) {
  const entry = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
  if (metaUrl !== entry) return;
  Promise.resolve(main()).catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}

export async function withDb(fn) {
  const db = Velr.open(null);
  try {
    return await fn(db);
  } finally {
    db.close();
  }
}

export async function withTempDbPath(fn) {
  const dir = mkdtempSync(join(tmpdir(), "velr-example-"));
  try {
    return await fn(join(dir, "graph.db"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

export function printRows(rows) {
  for (const row of rows) {
    console.log(JSON.stringify(row));
  }
}

export async function optionalImport(specifier, installHint = specifier) {
  try {
    return await import(specifier);
  } catch (err) {
    if (err?.code === "ERR_MODULE_NOT_FOUND" || err?.code === "MODULE_NOT_FOUND") {
      throw new Error(`Optional dependency missing for this example. Install: npm install ${installHint}`);
    }
    throw err;
  }
}
