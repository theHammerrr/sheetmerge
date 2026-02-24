'use strict';

import Ajv2020, { ValidateFunction } from 'ajv/dist/2020';
import type { AnySchema } from 'ajv';
import { loadMergeSpecSchema, MergeSpecSchema } from '../load-merge-spec-schema';

function isSchema(value: unknown): value is AnySchema {
  return typeof value === 'object' && value !== null;
}

export function createMergeSpecValidator(): ValidateFunction<MergeSpecSchema> {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    strictRequired: false,
  });
  const schema = loadMergeSpecSchema();

  if (!isSchema(schema)) {
    throw new Error('MergeSpec schema must be an object.');
  }

  return ajv.compile(schema);
}
