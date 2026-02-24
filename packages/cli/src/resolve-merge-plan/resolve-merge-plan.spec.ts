import { describe, it, expect } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { resolveMergePlan } from './resolve-merge-plan';

describe('resolveMergePlan', () => {
  it('builds spec when no config is present', () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sheetmerge-plan-'));
    const result = resolveMergePlan({
      inputs: ['a.xlsx', 'b.xlsx'],
      output: 'out.xlsx',
      mode: 'append',
      format: 'xlsx',
    }, tmp);
    expect(result.outputPath.endsWith('out.xlsx')).toBe(true);
  });
});
