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
  await withTempDbPath(async (path) => {
    const db = Velr.open(path);
    try {
      db.run("CREATE (:Person {name:'Ada Lovelace'})");
    } finally {
      db.close();
    }

    const reopened = Velr.open(path);
    try {
      const rows = reopened.query(
        "MATCH (p:Person) RETURN p.name AS name ORDER BY name"
      );
      printRows(rows);
    } finally {
      reopened.close();
    }
  });
}

runIfMain(import.meta.url, main);
