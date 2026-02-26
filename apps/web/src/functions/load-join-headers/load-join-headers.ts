import { parseCsvHeaders } from '../parse-csv-headers';

type FileHeaders = {
  name: string;
  headers: string[];
};

export async function loadJoinHeaders(files: File[], headerRow: number): Promise<FileHeaders[]> {
  return Promise.all(files.map((file) => parseCsvHeaders(file, headerRow)));
}
