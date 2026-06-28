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
    db.run("CREATE (:Person {name:'Ada', born:1815}), (:Person {name:'Grace', born:1906})");
    const rows = db.query(
      "MATCH (p:Person) WHERE p.born >= $year RETURN p.name AS name, p.born AS born ORDER BY born",
      { params: { year: 1900 }, int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
