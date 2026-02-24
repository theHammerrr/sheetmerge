import { describe, it, expect } from 'vitest';
import { formatReport } from './format-report';

describe('formatReport', () => {
  it('formats report lines', () => {
    const output = formatReport({
      mode: 'append',
      inputs: [{ index: 0, rowCount: 2 }],
      output: { rowCount: 2, format: 'xlsx' },
      warnings: [],
    });

    expect(output).toContain('Mode: append');
    expect(output).toContain('Output rows: 2');
  });
});
