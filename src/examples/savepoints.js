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
    tx.run("CREATE (:Temp {k:'outer'})");

    await tx.withSavepoint((savepoint) => {
      tx.run("CREATE (:Temp {k:'inner-scoped'})");
      savepoint.rollback();
    });

    tx.savepointNamed("before_named");
    tx.run("CREATE (:Temp {k:'inner-named'})");
    tx.rollbackTo("before_named");
    tx.run("CREATE (:Temp {k:'after-rollback'})");
    tx.releaseSavepoint("before_named");
    tx.commit();

    const rows = db.query(
      "MATCH (n:Temp) RETURN n.k AS k ORDER BY k"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
