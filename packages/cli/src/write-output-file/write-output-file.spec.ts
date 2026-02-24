import { describe, it, expect } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { writeOutputFile } from './write-output-file';

describe('writeOutputFile', () => {
  it('writes buffer to disk', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sheetmerge-'));
    const filePath = path.join(dir, 'out.txt');
    const buffer = Buffer.from('data');

    writeOutputFile(buffer, filePath);

    const contents = fs.readFileSync(filePath, 'utf8');
    expect(contents).toBe('data');
  });
});
