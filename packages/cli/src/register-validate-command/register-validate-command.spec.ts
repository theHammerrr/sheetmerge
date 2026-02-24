import { describe, it, expect, vi } from 'vitest';
import { Command } from 'commander';
import { registerValidateCommand } from './register-validate-command';

const { mockRunValidate } = vi.hoisted(() => ({
  mockRunValidate: vi.fn(),
}));

vi.mock('../run-validate', () => ({ runValidate: mockRunValidate }));

describe('registerValidateCommand', () => {
  it('registers validate command', () => {
    const program = new Command();
    registerValidateCommand(program);

    program.parse(['node', 'sheetmerge', 'validate', '--input', 'a.xlsx']);

    expect(mockRunValidate).toHaveBeenCalled();
  });
});
