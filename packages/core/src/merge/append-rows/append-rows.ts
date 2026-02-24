'use strict';

import type { Row } from '../merge-types';

export function appendRows(rowSets: Row[][]): Row[] {
  return rowSets.flat();
}
