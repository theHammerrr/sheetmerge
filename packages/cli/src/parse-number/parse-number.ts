'use strict';

export function parseNumber(value: string): number {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error('Value must be a number.');
  }

  return parsed;
}
