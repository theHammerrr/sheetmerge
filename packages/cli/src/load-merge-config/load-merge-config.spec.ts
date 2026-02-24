import { describe, it, expect } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { loadMergeConfig } from './load-merge-config';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

describe('loadMergeConfig', () => {
  it('parses JSON config', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sheetmerge-config-'));
    const filePath = path.join(dir, 'sheetmerge.config.json');
    fs.writeFileSync(filePath, JSON.stringify({ version: '1.0' }));

    const result = loadMergeConfig(filePath);

    if (!isRecord(result)) {
      throw new Error('Expected object');
    }

    expect(result.version).toBe('1.0');
  });

  it('throws on invalid JSON', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sheetmerge-config-'));
    const filePath = path.join(dir, 'sheetmerge.config.json');
    fs.writeFileSync(filePath, '{ nope }');

    expect(() => loadMergeConfig(filePath)).toThrowError('Config file is not valid JSON');
  });
});
