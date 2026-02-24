import { describe, it, expect, vi } from 'vitest';
import { runMerge } from './run-merge';
import type { MergeArgs, MergeResult, MergeSpec } from '../cli-types';
import type { MergePlan } from './run-merge';

const baseArgs: MergeArgs = {
  inputs: ['a.xlsx', 'b.xlsx'],
  output: 'out.xlsx',
  mode: 'append',
  format: 'xlsx',
};

describe('runMerge', () => {
  it('runs merge and writes output', () => {
    const resolvePlan = vi.fn((args: MergeArgs): MergePlan => {
      const spec: MergeSpec = {
        version: '1.0',
        inputs: [{ path: 'a.xlsx' }, { path: 'b.xlsx' }],
        sheet: { selector: { index: 0 } },
        merge: { mode: 'append' },
        output: { format: 'xlsx' },
      };

      return { spec, outputPath: 'out.xlsx' };
    });
    const readInputs = vi.fn(() => [Buffer.from('a'), Buffer.from('b')]);
    const writeOutput = vi.fn();
    const mergeWorkbooks = vi.fn(
      (buffers: Buffer[], spec: MergeSpec): MergeResult => ({
        buffer: Buffer.from('out'),
        report: {
          mode: 'append',
          inputs: [{ index: 0, rowCount: 1 }],
          output: { rowCount: 1, format: 'xlsx' },
          warnings: [],
        },
      })
    );
    const format = vi.fn(() => 'report');
    const log = vi.fn();

    const report = runMerge(baseArgs, {
      resolvePlan,
      readInputs,
      writeOutput,
      mergeWorkbooks,
      format,
      log,
    });

    expect(report.output.rowCount).toBe(1);
    expect(writeOutput).toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith('report');
  });
});
