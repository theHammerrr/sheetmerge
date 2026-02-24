'use strict';

import type { ColumnsConfig, Row } from '../merge-types';

export function applyColumns(rows: Row[], columns?: ColumnsConfig): Row[] {
  if (!columns) {
    return rows;
  }

  const include = columns.include ? new Set(columns.include) : null;
  const exclude = columns.exclude ? new Set(columns.exclude) : null;
  const rename = columns.rename ?? {};

  return rows.map((row) => {
    const output: Row = {};

    for (const [key, value] of Object.entries(row)) {
      if (include && !include.has(key)) {
        continue;
      }

      if (exclude && exclude.has(key)) {
        continue;
      }

      const nextKey = rename[key] ?? key;
      output[nextKey] = value;
    }

    return output;
  });
}
