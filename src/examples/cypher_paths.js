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
    db.run("CREATE (:Station {name:'A'})-[:NEXT]->(:Station {name:'B'})-[:NEXT]->(:Station {name:'C'})");
    const rows = db.query(
      "MATCH p=(a:Station)-[:NEXT]->(b:Station) RETURN a.name AS start, b.name AS finish ORDER BY start"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
