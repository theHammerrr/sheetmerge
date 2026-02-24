'use strict';

import { MergeSpecError } from '../../errors/merge-spec-error';

type InputBuffer = Buffer | Uint8Array | ArrayBuffer;

function isBufferLike(value: unknown): value is InputBuffer {
  return (
    Buffer.isBuffer(value) ||
    value instanceof Uint8Array ||
    value instanceof ArrayBuffer
  );
}

export function validateInputs(inputs: unknown): void {
  if (!Array.isArray(inputs) || inputs.length === 0) {
    throw new MergeSpecError('Inputs must be a non-empty array.');
  }

  const invalidIndex = inputs.findIndex((input) => !isBufferLike(input));

  if (invalidIndex === -1) {
    return;
  }

  throw new MergeSpecError(`Input at index ${invalidIndex} is not a buffer.`);
}
