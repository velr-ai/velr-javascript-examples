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
    db.run("CREATE (:Concept {name:'Velr'})-[:IMPLEMENTS]->(:Concept {name:'openCypher'}), (:Concept {name:'Velr'})-[:USES]->(:Concept {name:'SQLite'})");
    const rows = db.query(
      "MATCH (s:Concept)-[r]->(o:Concept) RETURN s.name AS subject, type(r) AS relation, o.name AS object ORDER BY relation"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
