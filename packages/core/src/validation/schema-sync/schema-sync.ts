import fs from 'fs';
import path from 'path';

function readSchema(relativePath: string): string {
  const absolutePath = path.resolve(__dirname, relativePath);
  const raw = fs.readFileSync(absolutePath, 'utf8');

  return raw.replace(/\r\n/g, '\n').trim();
}

export function schemasAreSynced(): boolean {
  const coreSchema = readSchema('../../../schema/merge-spec.schema.json');
  const docsSchema = readSchema('../../../../../docs/merge-spec.schema.json');

  return coreSchema === docsSchema;
}
