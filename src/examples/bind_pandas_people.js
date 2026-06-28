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
  const aq = await optionalImport("arquero", "arquero");
  await withDb(async (db) => {
    const people = aq.table({ name: ["Ada", "Grace"], born: [1815, 1906] });
    for (const person of people.objects()) {
      db.run("CREATE (:Person {name: $name, born: $born})", { params: person });
    }
    printRows(db.query("MATCH (p:Person) RETURN p.name AS name, p.born AS born ORDER BY born", { int64: "number" }));
  });
}

runIfMain(import.meta.url, main);
