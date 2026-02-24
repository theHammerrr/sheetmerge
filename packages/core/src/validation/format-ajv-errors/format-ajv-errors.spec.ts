import { describe, it, expect } from 'vitest';
import { formatAjvErrors } from './format-ajv-errors';
import type { ErrorObject } from 'ajv';

describe('formatAjvErrors', () => {
  it('returns empty array when no errors', () => {
    expect(formatAjvErrors(null)).toEqual([]);
  });

  it('formats error entries with instance path', () => {
    const errors: ErrorObject[] = [
      {
        instancePath: '/version',
        keyword: 'type',
        params: {},
        schemaPath: '#/properties/version/type',
        message: 'should be string'
      }
    ];

    expect(formatAjvErrors(errors)).toEqual(['/version should be string']);
  });
});
