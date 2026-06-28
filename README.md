# velr-javascript-examples

Examples showing how to use the [Velr](https://velr.ai/) JavaScript driver.

Velr is an embedded property-graph database built in Rust, backed by SQLite, and queried with openCypher. This repository contains small, focused JavaScript examples that demonstrate common patterns when working with the Velr JavaScript API.

The goal of this repository is to help users quickly install Velr from npm, run simple examples, and explore common graph workflows in JavaScript.

> Driver package: these examples use the public npm package `@velr-ai/velr`.

## What this repo contains

Examples in this repository cover:

- opening in-memory and file-backed databases
- creating and querying graph data
- reading result tables row by row
- converting typed values to ordinary JavaScript values
- streaming multiple result tables
- using transactions, rollbacks, and savepoints
- inspecting query plans with `explain()`
- working with openCypher concepts such as `MATCH`, `WHERE`, `MERGE`, `WITH`, paths, and variable-length paths
- modeling real-world graph use cases such as knowledge graphs, fraud detection, access control, org charts, and ticket dependencies
- exporting query results to JS dataframe-shaped data and Apache Arrow
- converting existing result tables to JS objects, columnar data, and Apache Arrow
- binding external JS objects and Apache Arrow data into Velr with `UNWIND BIND(...)`
- reading CSV data and turning it into graph data
- plotting graph-derived data with Vega/Vega-Lite

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/velr-ai/velr-javascript-examples.git
cd velr-javascript-examples
npm install
```

This installs the published Velr JavaScript driver package from npm:

```bash
npm install @velr-ai/velr
```

Optional examples use packages from the JavaScript data ecosystem:

```bash
npm install apache-arrow arquero csv-parse vega vega-lite
```

This repository targets the Node.js versions supported by the Velr JavaScript driver:

- Node.js 22 or newer

## Running examples

List the available examples:

```bash
npm run list
```

Run a specific example:

```bash
npm run example -- basic_query
```

You can also run the CLI directly:

```bash
node src/cli.js list
node src/cli.js basic_query
```

## Example layout

Examples are grouped by common Velr workflows while keeping the code idiomatic for JavaScript.

### Core driver examples

- `basic_open.js`
- `basic_query.js`
- `file_backed.js`
- `streaming_tables.js`
- `transaction.js`
- `rollback.js`
- `rollback_on_drop.js`
- `savepoints.js`
- `explain.js`

### openCypher examples

- `cypher_match.js`
- `cypher_where.js`
- `cypher_relationships.js`
- `cypher_aggregates.js`
- `cypher_unwind.js`
- `cypher_labels_and_properties.js`
- `cypher_paths.js`
- `cypher_var_length_paths.js`
- `cypher_merge.js`
- `cypher_merge_relationships.js`
- `cypher_with.js`
- `cypher_with_aggregates.js`

### Use case examples

- `usecase_knowledge_graph.js`
- `usecase_fraud_detection.js`
- `usecase_ticket_dependencies.js`
- `usecase_access_control.js`
- `usecase_org_chart.js`

### Dataframe, Arrow, CSV, and plotting examples

These examples use JavaScript ecosystem tools for dataframe, Arrow, CSV, and plotting workflows:

- Arquero for dataframe-shaped examples
- ordinary object arrays for lightweight columnar examples
- Apache Arrow for Arrow IPC examples
- csv-parse for CSV examples
- Vega/Vega-Lite for plotting examples

The filenames are intentionally consistent across the Velr JavaScript and TypeScript example repositories so users can move between them easily.

## Minimal example

```js
import { Velr } from "@velr-ai/velr";

const db = Velr.open(null);
try {
  db.run("CREATE (:Person {name:'Keanu Reeves', born:1964})");

  const rows = db.query(
    "MATCH (p:Person) RETURN p.name AS name, p.born AS born",
    { int64: "number" }
  );
  console.log(rows);
} finally {
  db.close();
}
```

## JavaScript style

These examples are intentionally written in an idiomatic JavaScript style.

They generally prefer:

- `try` / `finally` for closing database, stream, table, and transaction handles
- `query()` for convenient object rows
- `execOne()`, `rows()`, and `toObjects()` where table lifecycle matters
- `transaction()`, `withSavepoint()`, and `withSavepointNamed()` for scoped transactional code
- dynamic imports for optional dataframe, Arrow, CSV, and plotting dependencies

The examples aim to stay close to Velr driver concepts while still feeling natural to JavaScript users.

## Testing

```bash
npm test
```

The default tests verify that the example registry is complete and that every example module exports `main()`.

To run a small native smoke test against the installed Velr runtime:

```bash
VELR_EXAMPLES_NATIVE=1 npm test
```

## Related links

- [Velr](https://velr.ai/)
- [Velr JavaScript examples](https://github.com/velr-ai/velr-javascript-examples)
- [velr-rust-examples](https://github.com/velr-ai/velr-rust-examples)

## License

This repository is licensed under the MIT License. See [`LICENSE`](LICENSE).
