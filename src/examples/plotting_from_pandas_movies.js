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
    db.run(MOVIES_CREATE);
    const values = db.query("MATCH (m:Movie) RETURN m.title AS title, m.released AS released ORDER BY released", { int64: "number" });
    const spec = {
      data: { values },
      mark: "bar",
      encoding: {
        x: { field: "title", type: "nominal" },
        y: { field: "released", type: "quantitative" }
      }
    };
    const view = new vega.View(vega.parse(vegaLite.compile(spec).spec), { renderer: "none" });
    console.log(await view.toSVG());
  });
}

runIfMain(import.meta.url, main);
