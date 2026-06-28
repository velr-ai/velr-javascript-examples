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
    const table = db.execOne("MATCH (m:Movie) RETURN m.title AS title, m.released AS released ORDER BY released");
    try {
      console.log(aq.from(table.toObjects({ int64: "number" })).objects());
    } finally {
      table.close();
    }
  });
}

runIfMain(import.meta.url, main);
