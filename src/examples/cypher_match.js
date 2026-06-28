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
    db.run("CREATE (:Person {name:'Ada'}), (:Person {name:'Grace'})");
    const rows = db.query(
      "MATCH (p:Person) RETURN p.name AS name ORDER BY name"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
