'use strict';

import type { ErrorObject } from 'ajv';

export function formatAjvErrors(errors: ErrorObject[] | null | undefined): string[] {
  if (!errors || errors.length === 0) {
    return [];
  }

  return errors.map((error) => {
    const instancePath = error.instancePath || '(root)';

    return `${instancePath} ${error.message ?? ''}`.trim();
  });
}
