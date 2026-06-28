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
    db.run("CREATE (:Account {id:'a1'})-[:PAID {amount:900}]->(:Account {id:'a2'}), (:Account {id:'a2'})-[:PAID {amount:850}]->(:Account {id:'a3'})");
    const rows = db.query(
      "MATCH (a:Account)-[p:PAID]->(b:Account) WHERE p.amount >= 800 RETURN a.id AS from, b.id AS to, p.amount AS amount ORDER BY amount DESC",
      { int64: "number" }
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
