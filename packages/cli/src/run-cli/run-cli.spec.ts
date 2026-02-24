import { describe, it, expect, vi } from 'vitest';
import { runCli } from './run-cli';

const { mockRunMerge } = vi.hoisted(() => ({
  mockRunMerge: vi.fn(),
}));

vi.mock('../run-merge', () => ({ runMerge: mockRunMerge }));

describe('runCli', () => {
  it('invokes merge with parsed args', () => {
    runCli([
      'node',
      'sheetmerge',
      'merge',
      '--input',
      'a.xlsx',
      '--input',
      'b.xlsx',
      '--output',
      'out.xlsx',
    ]);

    expect(mockRunMerge).toHaveBeenCalled();
  });
});
