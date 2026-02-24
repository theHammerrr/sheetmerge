'use strict';

import { buildKey } from '../build-key';
import type { Row } from '../merge-types';

export function unionRows(rowSets: Row[][], keys: string[]): Row[] {
  const seen = new Set<string>();
  const output: Row[] = [];

  for (const rows of rowSets) {
    for (const row of rows) {
      const key = buildKey(row, keys);

      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      output.push(row);
    }
  }

  return output;
}
