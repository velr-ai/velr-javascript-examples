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
    db.run("CREATE (:User {name:'Mina'})-[:MEMBER_OF]->(:Group {name:'admins'})-[:CAN_ACCESS]->(:Resource {name:'billing'})");
    const rows = db.query(
      "MATCH (u:User)-[:MEMBER_OF]->(:Group)-[:CAN_ACCESS]->(r:Resource) RETURN u.name AS user, r.name AS resource"
    );
    printRows(rows);
  });
}

runIfMain(import.meta.url, main);
