import { Velr } from "@velr-ai/velr";
import {
  MOVIES_CREATE,
  optionalImport,
  printRows,
  runIfMain,
  withDb,
  withTempDbPath
} from "../example-utils.js";

export async function main() {
  await withDb(async (db) => {
    console.log("schema version:", db.schemaVersion());
    console.log("current schema version:", db.currentSchemaVersion());
  });
}

runIfMain(import.meta.url, main);
