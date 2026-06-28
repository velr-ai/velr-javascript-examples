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
    const table = db.execOne("MATCH (m:Movie) RETURN m.title AS title, m.released AS released ORDER BY released");
    try {
      const rows = table.toObjects({ int64: "number" });
      console.log(Object.fromEntries(Object.keys(rows[0] ?? {}).map((key) => [key, rows.map((row) => row[key])])));
    } finally {
      table.close();
    }
  });
}

runIfMain(import.meta.url, main);
