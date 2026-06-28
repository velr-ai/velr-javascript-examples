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
    const tx = db.beginTx();
    tx.run("CREATE (:Event {name:'discarded'})");
    tx.rollback();

    const rows = db.query(
      "MATCH (e:Event) RETURN count(e) AS count",
      { int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
