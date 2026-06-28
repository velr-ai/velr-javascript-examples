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
    db.run("CREATE (:Person:Engineer {name:'Grace', language:'COBOL'})");
    const rows = db.query(
      "MATCH (p:Engineer) RETURN p.name AS name, p.language AS language"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
