'use strict';

import fs from 'fs';

export function loadMergeConfig(configPath: string): unknown {
  const contents = fs.readFileSync(configPath, 'utf8');

  try {
    return JSON.parse(contents);
  } catch (error) {
    throw new Error(`Config file is not valid JSON: ${configPath}`);
  }
}
