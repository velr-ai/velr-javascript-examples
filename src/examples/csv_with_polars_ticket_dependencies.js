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
    const source = "ticket,dependsOn\nT-2,T-1\nT-3,T-2\n";
    const dependencies = csv.parse(source, { columns: true });
    for (const dep of dependencies) {
      db.run("MERGE (t:Ticket {id: $ticket}) MERGE (d:Ticket {id: $dependsOn}) MERGE (t)-[:DEPENDS_ON]->(d)", { params: dep });
    }
    printRows(db.query("MATCH (t:Ticket)-[:DEPENDS_ON]->(d:Ticket) RETURN t.id AS ticket, d.id AS dependsOn ORDER BY ticket"));
  });
}

runIfMain(import.meta.url, main);
