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
    db.run("CREATE (:Movie {year:1999}), (:Movie {year:1999}), (:Movie {year:2014})");
    const rows = db.query(
      "MATCH (m:Movie) RETURN m.year AS year, count(m) AS count ORDER BY year",
      { int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
