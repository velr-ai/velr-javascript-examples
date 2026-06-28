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
    db.run(MOVIES_CREATE);
    const rows = db.query("MATCH (m:Movie) RETURN m.title AS title, m.released AS released ORDER BY released", { int64: "number" });
    const columns = Object.fromEntries(Object.keys(rows[0] ?? {}).map((key) => [key, rows.map((row) => row[key])]));
    console.log(columns);
  });
}

runIfMain(import.meta.url, main);
