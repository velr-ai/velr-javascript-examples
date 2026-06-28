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
  const vega = await optionalImport("vega", "vega");
  const vegaLite = await optionalImport("vega-lite", "vega vega-lite");
  await withDb(async (db) => {
    db.run("CREATE (:Ticket {status:'open'}), (:Ticket {status:'open'}), (:Ticket {status:'closed'})");
    const values = db.query("MATCH (t:Ticket) RETURN t.status AS status, count(t) AS count ORDER BY status", { int64: "number" });
    const spec = {
      data: { values },
      mark: "arc",
      encoding: {
        theta: { field: "count", type: "quantitative" },
        color: { field: "status", type: "nominal" }
      }
    };
    const view = new vega.View(vega.parse(vegaLite.compile(spec).spec), { renderer: "none" });
    console.log(await view.toSVG());
  });
}

runIfMain(import.meta.url, main);
