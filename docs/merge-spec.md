# MergeSpec

MergeSpec defines how sheetmerge reads inputs, selects sheets, and merges data.
This schema is the single source of truth for CLI config and web UI export.

## Versioning
- `version`: must be `"1.0"` for this schema.

## High-level structure
- `inputs`: array of input files (minimum 2).
- `sheet`: which sheet + header rows to read.
- `merge`: merge strategy, keys, and column selection.
- `output`: output format and naming.
- `validation`: validation behavior.
- `report`: reporting options.

## Example

```json
{
  "version": "1.0",
  "inputs": [
    { "path": "./files/a.xlsx", "label": "A" },
    { "path": "./files/b.xlsx", "label": "B" }
  ],
  "sheet": {
    "selector": { "name": "Sheet1" },
    "headerRow": 1
  },
  "merge": {
    "mode": "union",
    "keys": ["id"],
    "columns": {
      "rename": {
        "first_name": "firstName"
      }
    }
  },
  "output": {
    "format": "xlsx",
    "fileName": "merged.xlsx",
    "sheetName": "Merged"
  },
  "validation": {
    "strictHeaders": true
  },
  "report": {
    "includeRowCounts": true,
    "includeWarnings": true
  }
}
```

## Notes
- `merge.mode`:
  - `append`: stack rows in order.
  - `union`: de-duplicate by `keys`.
  - `join`: join rows by `keys` (see `joinType`).
- `columns.include` and `columns.exclude` are mutually exclusive.
- `sheet.selector` can be `{ "name": "Sheet1" }` or `{ "index": 0 }`.
