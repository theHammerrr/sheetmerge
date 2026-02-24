import { describe, it, expect, vi } from 'vitest';
import { Command } from 'commander';
import { registerMergeCommand } from './register-merge-command';

const { mockRunMerge } = vi.hoisted(() => ({
  mockRunMerge: vi.fn(),
}));

vi.mock('../run-merge', () => ({ runMerge: mockRunMerge }));

describe('registerMergeCommand', () => {
  it('registers merge command', () => {
    const program = new Command();
    registerMergeCommand(program);

    program.parse(['node', 'sheetmerge', 'merge', '--input', 'a.xlsx', '--output', 'out.xlsx']);

    expect(mockRunMerge).toHaveBeenCalled();
  });
});
