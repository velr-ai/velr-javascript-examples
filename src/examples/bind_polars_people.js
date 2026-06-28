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
    const people = [
      { name: "Ada", born: 1815 },
      { name: "Grace", born: 1906 }
    ];
    db.transaction((tx) => {
      for (const person of people) {
        tx.run("CREATE (:Person {name: $name, born: $born})", { params: person });
      }
    });
    printRows(db.query("MATCH (p:Person) RETURN p.name AS name, p.born AS born ORDER BY born", { int64: "number" }));
  });
}

runIfMain(import.meta.url, main);
