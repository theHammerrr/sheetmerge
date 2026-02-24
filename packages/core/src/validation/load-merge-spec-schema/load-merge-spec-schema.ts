'use strict';

import fs from 'fs';
import path from 'path';

export type MergeSpecSchema = unknown;

export function loadMergeSpecSchema(): MergeSpecSchema {
  const schemaPath = path.resolve(__dirname, '..', '..', '..', 'schema', 'merge-spec.schema.json');
  const schemaContents = fs.readFileSync(schemaPath, 'utf8');

  return JSON.parse(schemaContents);
}
