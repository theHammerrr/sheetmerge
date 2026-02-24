import { describe, it, expect } from 'vitest';
import { validateCompatibility } from './validate-compatibility';

describe('validateCompatibility', () => {
  it('returns compatible when headers match', () => {
    const result = validateCompatibility([
      ['id', 'name'],
      ['id', 'name'],
    ]);

    expect(result.compatible).toBe(true);
    expect(result.mismatches).toEqual([]);
  });

  it('detects mismatched headers', () => {
    const result = validateCompatibility([
      ['id', 'name'],
      ['id', 'email'],
    ]);

    expect(result.compatible).toBe(false);
    expect(result.mismatches.length).toBe(1);
  });
});
