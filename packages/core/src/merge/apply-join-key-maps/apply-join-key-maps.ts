'use strict';

import { MergeSpecError } from '../../errors/merge-spec-error';
import type { JoinKeyMap, Row } from '../merge-types';

function ensureHeader(joinKey: string, inputIndex: number, header?: string): string {
  if (header && header.length > 0) {
    return header;
  }

  throw new MergeSpecError(`Join key "${joinKey}" is missing a header for input index ${inputIndex}.`);
}

export function applyJoinKeyMaps(rowSets: Row[][], joinKeyMaps?: JoinKeyMap[]): Row[][] {
  if (!joinKeyMaps || joinKeyMaps.length === 0) {
    return rowSets;
  }

  return rowSets.map((rows, inputIndex) =>
    rows.map((row) => {
      const next = { ...row };

      for (const map of joinKeyMaps) {
        const header = ensureHeader(map.key, inputIndex, map.byInput[String(inputIndex)]);
        next[map.key] = row[header] ?? '';
      }

      return next;
    })
  );
}
