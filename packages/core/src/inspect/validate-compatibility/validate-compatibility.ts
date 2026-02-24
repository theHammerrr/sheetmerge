'use strict';

import type { CompatibilityResult } from '../inspect-core-types';

type ValidationResult = {
  compatible: boolean;
  headers: string[];
  mismatches: Array<{ index: number; headers: string[] }>;
};

export function validateCompatibility(headerSets: Array<string[]>): CompatibilityResult {
  if (headerSets.length === 0) {
    return { compatible: true, headers: [], mismatches: [] };
  }

  const base = headerSets[0];
  const mismatches: Array<{ index: number; headers: string[] }> = [];

  for (let index = 1; index < headerSets.length; index += 1) {
    const headers = headerSets[index];
    const sameLength = headers.length === base.length;
    const sameOrder = headers.every((header, headerIndex) => header === base[headerIndex]);

    if (!sameLength || !sameOrder) {
      mismatches.push({ index, headers });
    }
  }

  return { compatible: mismatches.length === 0, headers: base, mismatches };
}
