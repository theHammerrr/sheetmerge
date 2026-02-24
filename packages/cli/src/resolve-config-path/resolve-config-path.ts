'use strict';

import fs from 'fs';
import path from 'path';

export function resolveConfigPath(configPath?: string, baseDir?: string): string | undefined {
  if (configPath && configPath.trim().length > 0) {
    const resolved = path.resolve(configPath);

    if (!fs.existsSync(resolved)) {
      throw new Error(`Config file not found: ${resolved}`);
    }

    return resolved;
  }

  const rootDir = baseDir ?? process.cwd();
  const defaultPath = path.resolve(rootDir, 'sheetmerge.config.json');

  if (fs.existsSync(defaultPath)) {
    return defaultPath;
  }

  return undefined;
}
