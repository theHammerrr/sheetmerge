'use strict';

import { createMergeSpecValidator } from '../create-merge-spec-validator';
import { formatAjvErrors } from '../format-ajv-errors';

const validator = createMergeSpecValidator();

export function validateMergeSpec(spec: unknown) {
  const valid = validator(spec);
  return {
    valid: Boolean(valid),
    errors: formatAjvErrors(validator.errors)
  };
}
