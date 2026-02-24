'use strict';

import { MergeSpecError } from '../../errors/merge-spec-error';
import { validateMergeSpec } from '../validate-merge-spec';

export function assertValidMergeSpec(spec: unknown): void {
  const result = validateMergeSpec(spec);

  if (result.valid) {
    return;
  }

  throw new MergeSpecError('MergeSpec validation failed.', result.errors);
}
