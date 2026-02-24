'use strict';

import type { MergeJoinType } from '../cli-types';

export function resolveCliJoinType(value: unknown): MergeJoinType | undefined {
  if (value === 'inner' || value === 'left' || value === 'right' || value === 'full') {
    return value;
  }

  return undefined;
}
