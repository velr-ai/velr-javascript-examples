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
    db.run(MOVIES_CREATE);
    const rows = db.query("MATCH (m:Movie) RETURN m.title AS title, m.released AS released ORDER BY released", { int64: "number" });
    const table = aq.from(rows);
    console.log(table.objects());
  });
}

runIfMain(import.meta.url, main);
