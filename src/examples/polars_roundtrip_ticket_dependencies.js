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
    const dependencies = [
      { ticket: "T-2", dependsOn: "T-1" },
      { ticket: "T-3", dependsOn: "T-2" }
    ];
    for (const dep of dependencies) {
      db.run("MERGE (t:Ticket {id: $ticket}) MERGE (d:Ticket {id: $dependsOn}) MERGE (t)-[:DEPENDS_ON]->(d)", { params: dep });
    }
    printRows(db.query("MATCH (t:Ticket)-[:DEPENDS_ON]->(d:Ticket) RETURN t.id AS ticket, d.id AS dependsOn ORDER BY ticket"));
  });
}

runIfMain(import.meta.url, main);
