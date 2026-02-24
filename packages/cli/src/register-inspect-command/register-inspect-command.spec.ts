import { describe, it, expect, vi } from 'vitest';
import { Command } from 'commander';
import { registerInspectCommand } from './register-inspect-command';

const { mockRunInspect } = vi.hoisted(() => ({
  mockRunInspect: vi.fn(),
}));

vi.mock('../run-inspect', () => ({ runInspect: mockRunInspect }));

describe('registerInspectCommand', () => {
  it('registers inspect command', () => {
    const program = new Command();
    registerInspectCommand(program);

    program.parse(['node', 'sheetmerge', 'inspect', '--input', 'a.xlsx']);

    expect(mockRunInspect).toHaveBeenCalled();
  });
});
