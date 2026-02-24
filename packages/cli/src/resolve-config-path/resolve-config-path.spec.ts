import { describe, it, expect } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { resolveConfigPath } from './resolve-config-path';

describe('resolveConfigPath', () => {
  it('returns undefined when no config exists', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sheetmerge-config-'));
    const result = resolveConfigPath(undefined, tmp);
    expect(result).toBeUndefined();
  });
});
