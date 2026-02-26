import { describe, expect, it } from 'vitest';
import { parseCsvFile } from './parse-csv-file';

describe('parseCsvFile', () => {
  it('parses headers and data rows with row offsets', async () => {
    const file = new File(
      ['skip,row\n id , name \n1,Ada\n2,Grace\n,\n'],
      'input.csv',
      { type: 'text/csv' }
    );

    const result = await parseCsvFile(file, 2, 3);

    expect(result).toEqual({
      name: 'input.csv',
      headers: ['id', 'name'],
      rows: [
        { id: '1', name: 'Ada' },
        { id: '2', name: 'Grace' },
      ],
    });
  });

  it('throws when header row is outside file range', async () => {
    const file = new File(['id,name\n1,Ada\n'], 'input.csv', { type: 'text/csv' });

    await expect(parseCsvFile(file, 9, 10)).rejects.toThrow('Header row is out of range.');
  });
});
