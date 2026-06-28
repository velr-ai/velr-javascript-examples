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
    db.run("CREATE (:Employee {name:'Alex', role:'CEO'})<-[:REPORTS_TO]-(:Employee {name:'Sam', role:'VP'})<-[:REPORTS_TO]-(:Employee {name:'Rae', role:'Engineer'})");
    const rows = db.query(
      "MATCH (e:Employee)-[:REPORTS_TO]->(m:Employee) RETURN e.name AS employee, m.name AS manager ORDER BY employee"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
