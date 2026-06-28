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
    const employees = aq.from([
      { name: "Alex", manager: null },
      { name: "Sam", manager: "Alex" },
      { name: "Rae", manager: "Sam" }
    ]);
    for (const row of employees.objects()) {
      db.run("MERGE (:Employee {name: $name})", { params: { name: row.name } });
      if (row.manager) {
        db.run("MATCH (e:Employee {name: $name}), (m:Employee {name: $manager}) MERGE (e)-[:REPORTS_TO]->(m)", { params: row });
      }
    }
    console.log(aq.from(db.query("MATCH (e:Employee)-[:REPORTS_TO]->(m:Employee) RETURN e.name AS employee, m.name AS manager ORDER BY employee")).objects());
  });
}

runIfMain(import.meta.url, main);
