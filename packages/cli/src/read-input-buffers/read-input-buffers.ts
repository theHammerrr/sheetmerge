'use strict';

import fs from 'fs';

export function readInputBuffers(paths: string[]): Buffer[] {
  return paths.map((filePath) => fs.readFileSync(filePath));
}
