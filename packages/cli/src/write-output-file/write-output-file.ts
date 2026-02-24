'use strict';

import fs from 'fs';

export function writeOutputFile(buffer: Buffer, outputPath: string): void {
  fs.writeFileSync(outputPath, buffer);
}
