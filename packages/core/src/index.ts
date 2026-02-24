'use strict';

import { MergeSpecError } from './errors/merge-spec-error';
import { mergeSpecValidation } from './validation/merge-spec-validation';
import { validateInputs } from './validation/validate-inputs';
import { mergeWorkbooks } from './merge/merge-workbooks';

export const sheetmergeCore = {
  MergeSpecError,
  mergeSpecValidation,
  validateInputs,
  mergeWorkbooks,
};
