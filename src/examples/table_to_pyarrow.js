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
    db.run(MOVIES_CREATE);
    const table = db.execOne("MATCH (m:Movie) RETURN m.title AS title, m.released AS released ORDER BY released");
    try {
      const arrowTable = await table.toArrowTable();
      console.log(arrowTable.toString());
    } finally {
      table.close();
    }
  });
}

runIfMain(import.meta.url, main);
