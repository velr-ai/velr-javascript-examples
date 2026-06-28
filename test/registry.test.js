import { describe, expect, it } from "vitest";
import { EXAMPLES, loadExample } from "../src/registry.js";

const expected = [
  "basic_open",
  "basic_query",
  "file_backed",
  "streaming_tables",
  "transaction",
  "rollback",
  "rollback_on_drop",
  "savepoints",
  "explain",
  "cypher_match",
  "cypher_where",
  "cypher_relationships",
  "cypher_aggregates",
  "cypher_unwind",
  "cypher_labels_and_properties",
  "cypher_paths",
  "cypher_var_length_paths",
  "cypher_merge",
  "cypher_merge_relationships",
  "cypher_with",
  "cypher_with_aggregates",
  "usecase_knowledge_graph",
  "usecase_fraud_detection",
  "usecase_ticket_dependencies",
  "usecase_access_control",
  "usecase_org_chart",
  "to_pandas_movies",
  "to_polars_movies",
  "to_pyarrow_movies",
  "bind_pandas_people",
  "bind_polars_people",
  "bind_arrow_people",
  "pandas_roundtrip_org_chart",
  "plotting_from_pandas_movies",
  "polars_roundtrip_ticket_dependencies",
  "plotting_from_polars_tickets",
  "table_to_pandas",
  "table_to_polars",
  "table_to_pyarrow",
  "csv_with_pandas_people",
  "csv_with_polars_ticket_dependencies"
];

describe("example registry", () => {
  it("matches the documented example registry", () => {
    expect(EXAMPLES).toEqual(expected);
  });

  for (const name of EXAMPLES) {
    it(`loads ${name}`, async () => {
      const module = await loadExample(name);
      expect(typeof module.main).toBe("function");
    });
  }
});
