import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';

describe('sheetmerge cli e2e', () => {
  it('runs merge command end to end for csv files', () => {
    const root = path.resolve(__dirname, '../../..');
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sheetmerge-cli-e2e-'));
    const inputA = path.join(tmp, 'a.csv');
    const inputB = path.join(tmp, 'b.csv');
    const output = path.join(tmp, 'out.csv');

    fs.writeFileSync(inputA, 'id,name\n1,Alice\n', 'utf8');
    fs.writeFileSync(inputB, 'id,name\n2,Bob\n', 'utf8');

    execFileSync('pnpm', ['--filter', 'sheetmerge-core', 'build'], { cwd: root, stdio: 'pipe' });
    execFileSync('pnpm', ['--filter', 'sheetmerge-cli', 'build'], { cwd: root, stdio: 'pipe' });

    const cliPath = path.join(root, 'packages/cli/dist/index.js');
    const stdout = execFileSync(
      'node',
      [
        cliPath,
        'merge',
        '--input',
        inputA,
        '--input',
        inputB,
        '--output',
        output,
        '--mode',
        'append',
        '--format',
        'csv',
      ],
      { cwd: root, encoding: 'utf8' },
    );
    const mergedCsv = fs.readFileSync(output, 'utf8');

    expect(stdout).toContain('Mode: append');
    expect(stdout).toContain('Output rows: 2');
    expect(mergedCsv).toContain('id,name');
    expect(mergedCsv).toContain('Alice');
    expect(mergedCsv).toContain('Bob');
  });
});
