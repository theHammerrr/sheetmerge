'use strict';

import type { MergeMode } from '../cli-types';

export function resolveCliMode(value: unknown): MergeMode | undefined {
  if (value === 'append' || value === 'union' || value === 'join') {
    return value;
  }

  return undefined;
}
