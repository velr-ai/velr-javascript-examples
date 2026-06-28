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
    db.run("CREATE (:Person {name:'Keanu Reeves', born:1964})");

    const table = db.execOne("MATCH (p:Person) RETURN p.name AS name, p.born AS born");
    try {
      console.log(table.columnNames());
      const rows = table.toObjects({ int64: "number" });
      printRows(rows);
    } finally {
      table.close();
    }
  });
}

runIfMain(import.meta.url, main);
