'use strict';

import type { OutputFormat } from '../cli-types';

export function resolveCliFormat(value: unknown): OutputFormat | undefined {
  if (value === 'xlsx' || value === 'csv') {
    return value;
  }

  return undefined;
}
