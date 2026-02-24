'use strict';

import { inspectWorkbook } from './inspect-workbook';
import { listSheetNames } from './list-sheet-names';
import { readHeaders } from './read-headers';
import { validateCompatibility } from './validate-compatibility';

export const inspectCore = {
  inspectWorkbook,
  listSheetNames,
  readHeaders,
  validateCompatibility,
};
