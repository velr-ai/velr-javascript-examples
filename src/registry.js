export const EXAMPLES = [
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

export async function loadExample(name) {
  switch (name) {
    case "basic_open":
      return import("./examples/basic_open.js");
    case "basic_query":
      return import("./examples/basic_query.js");
    case "file_backed":
      return import("./examples/file_backed.js");
    case "streaming_tables":
      return import("./examples/streaming_tables.js");
    case "transaction":
      return import("./examples/transaction.js");
    case "rollback":
      return import("./examples/rollback.js");
    case "rollback_on_drop":
      return import("./examples/rollback_on_drop.js");
    case "savepoints":
      return import("./examples/savepoints.js");
    case "explain":
      return import("./examples/explain.js");
    case "cypher_match":
      return import("./examples/cypher_match.js");
    case "cypher_where":
      return import("./examples/cypher_where.js");
    case "cypher_relationships":
      return import("./examples/cypher_relationships.js");
    case "cypher_aggregates":
      return import("./examples/cypher_aggregates.js");
    case "cypher_unwind":
      return import("./examples/cypher_unwind.js");
    case "cypher_labels_and_properties":
      return import("./examples/cypher_labels_and_properties.js");
    case "cypher_paths":
      return import("./examples/cypher_paths.js");
    case "cypher_var_length_paths":
      return import("./examples/cypher_var_length_paths.js");
    case "cypher_merge":
      return import("./examples/cypher_merge.js");
    case "cypher_merge_relationships":
      return import("./examples/cypher_merge_relationships.js");
    case "cypher_with":
      return import("./examples/cypher_with.js");
    case "cypher_with_aggregates":
      return import("./examples/cypher_with_aggregates.js");
    case "usecase_knowledge_graph":
      return import("./examples/usecase_knowledge_graph.js");
    case "usecase_fraud_detection":
      return import("./examples/usecase_fraud_detection.js");
    case "usecase_ticket_dependencies":
      return import("./examples/usecase_ticket_dependencies.js");
    case "usecase_access_control":
      return import("./examples/usecase_access_control.js");
    case "usecase_org_chart":
      return import("./examples/usecase_org_chart.js");
    case "to_pandas_movies":
      return import("./examples/to_pandas_movies.js");
    case "to_polars_movies":
      return import("./examples/to_polars_movies.js");
    case "to_pyarrow_movies":
      return import("./examples/to_pyarrow_movies.js");
    case "bind_pandas_people":
      return import("./examples/bind_pandas_people.js");
    case "bind_polars_people":
      return import("./examples/bind_polars_people.js");
    case "bind_arrow_people":
      return import("./examples/bind_arrow_people.js");
    case "pandas_roundtrip_org_chart":
      return import("./examples/pandas_roundtrip_org_chart.js");
    case "plotting_from_pandas_movies":
      return import("./examples/plotting_from_pandas_movies.js");
    case "polars_roundtrip_ticket_dependencies":
      return import("./examples/polars_roundtrip_ticket_dependencies.js");
    case "plotting_from_polars_tickets":
      return import("./examples/plotting_from_polars_tickets.js");
    case "table_to_pandas":
      return import("./examples/table_to_pandas.js");
    case "table_to_polars":
      return import("./examples/table_to_polars.js");
    case "table_to_pyarrow":
      return import("./examples/table_to_pyarrow.js");
    case "csv_with_pandas_people":
      return import("./examples/csv_with_pandas_people.js");
    case "csv_with_polars_ticket_dependencies":
      return import("./examples/csv_with_polars_ticket_dependencies.js");
    default:
      throw new Error(`Unknown example: ${name}`);
  }
}
