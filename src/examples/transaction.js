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
    db.transaction((tx) => {
      tx.run("CREATE (:Event {name:'launch'})");
    });

    const rows = db.query(
      "MATCH (e:Event) RETURN e.name AS name"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
