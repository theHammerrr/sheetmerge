import { describe, it, expect, vi } from 'vitest';
import { runCli } from './run-cli';

const { mockRegisterMerge, mockRegisterInspect, mockRegisterValidate } = vi.hoisted(() => ({
  mockRegisterMerge: vi.fn(),
  mockRegisterInspect: vi.fn(),
  mockRegisterValidate: vi.fn(),
}));

vi.mock('../register-merge-command', () => ({
  registerMergeCommand: mockRegisterMerge,
}));

vi.mock('../register-inspect-command', () => ({
  registerInspectCommand: mockRegisterInspect,
}));

vi.mock('../register-validate-command', () => ({
  registerValidateCommand: mockRegisterValidate,
}));

describe('runCli', () => {
  it('registers cli commands', () => {
    runCli(['node', 'sheetmerge']);

    expect(mockRegisterMerge).toHaveBeenCalled();
    expect(mockRegisterInspect).toHaveBeenCalled();
    expect(mockRegisterValidate).toHaveBeenCalled();
  });
});
