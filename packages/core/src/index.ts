'use strict';

import { MergeSpecError } from './errors/merge-spec-error';
import { inspectCore } from './inspect';
import { mergeWorkbooks } from './merge/merge-workbooks';
import { mergeSpecValidation } from './validation/merge-spec-validation';
import { validateInputs } from './validation/validate-inputs';

export const sheetmergeCore = {
  MergeSpecError,
  mergeSpecValidation,
  validateInputs,
  mergeWorkbooks,
  inspectCore,
};
