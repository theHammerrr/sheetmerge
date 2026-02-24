'use strict';

import type { Row } from '../merge-types';

export function buildKey(row: Row, keys: string[]): string {
  const parts = keys.map((key) => {
    const value = row[key];

    return value === null || value === undefined ? '' : String(value);
  });

  return parts.join('|');
}
