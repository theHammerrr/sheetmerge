'use strict';

import Ajv2020, { ValidateFunction } from 'ajv/dist/2020';
import { loadMergeSpecSchema, MergeSpecSchema } from '../load-merge-spec-schema';

export function createMergeSpecValidator(): ValidateFunction<MergeSpecSchema> {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    strictRequired: false
  });
  const schema = loadMergeSpecSchema();
  return ajv.compile(schema);
}
