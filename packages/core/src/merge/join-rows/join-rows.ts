'use strict';

import { buildKey } from '../build-key';
import type { Row } from '../merge-types';

type JoinType = 'inner' | 'left' | 'right' | 'full';

function joinTwoRows(leftRows: Row[], rightRows: Row[], keys: string[], joinType: JoinType): Row[] {
  const rightMap = new Map<string, Row[]>();
  const matched = new Set<string>();
  const output: Row[] = [];

  for (const row of rightRows) {
    const key = buildKey(row, keys);
    const group = rightMap.get(key) ?? [];

    group.push(row);
    rightMap.set(key, group);
  }

  for (const left of leftRows) {
    const key = buildKey(left, keys);
    const matches = rightMap.get(key);

    if (matches && matches.length > 0) {
      for (const right of matches) {
        output.push({ ...left, ...right });
      }

      matched.add(key);
    } else if (joinType === 'left' || joinType === 'full') {
      output.push({ ...left });
    }
  }

  if (joinType === 'right' || joinType === 'full') {
    for (const right of rightRows) {
      const key = buildKey(right, keys);

      if (!matched.has(key)) {
        output.push({ ...right });
      }
    }
  }

  return output;
}

export function joinRows(rowSets: Row[][], keys: string[], joinType: JoinType): Row[] {
  let output = rowSets[0] ?? [];

  for (let index = 1; index < rowSets.length; index += 1) {
    output = joinTwoRows(output, rowSets[index], keys, joinType);
  }

  return output;
}
