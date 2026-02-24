'use strict';

import { MergeSpecError } from '../../errors/merge-spec-error';
import { appendRows } from '../append-rows';
import { joinRows } from '../join-rows';
import type { MergeConfig, Row } from '../merge-types';
import { unionRows } from '../union-rows';

export function mergeRows(rowSets: Row[][], merge: MergeConfig): Row[] {
  const mode = merge.mode;

  if (mode === 'append') {
    return appendRows(rowSets);
  }

  const keys = merge.keys ?? [];

  if (keys.length === 0) {
    throw new MergeSpecError('Merge keys are required for this merge mode.');
  }

  if (mode === 'union') {
    return unionRows(rowSets, keys);
  }

  const joinType = merge.joinType ?? 'inner';

  return joinRows(rowSets, keys, joinType);
}
