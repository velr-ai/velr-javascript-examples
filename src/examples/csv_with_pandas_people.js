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
  const csv = await optionalImport("csv-parse/sync", "csv-parse");
  await withDb(async (db) => {
    const source = "name,born\nAda,1815\nGrace,1906\n";
    const people = csv.parse(source, { columns: true, cast: true });
    for (const person of people) {
      db.run("CREATE (:Person {name: $name, born: $born})", { params: person });
    }
    printRows(db.query("MATCH (p:Person) RETURN p.name AS name, p.born AS born ORDER BY born", { int64: "number" }));
  });
}

runIfMain(import.meta.url, main);
