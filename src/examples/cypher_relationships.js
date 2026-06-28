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
    db.run("CREATE (:Person {name:'Ada'})-[:MENTORED]->(:Person {name:'Charles'})");
    const rows = db.query(
      "MATCH (a:Person)-[:MENTORED]->(b:Person) RETURN a.name AS mentor, b.name AS learner"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
