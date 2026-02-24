import { describe, it, expect } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { readInputBuffers } from './read-input-buffers';

describe('readInputBuffers', () => {
  it('reads file buffers', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sheetmerge-'));
    const filePath = path.join(dir, 'input.txt');
    fs.writeFileSync(filePath, 'hello');

    const buffers = readInputBuffers([filePath]);

    expect(buffers[0].toString('utf8')).toBe('hello');
  });
});
