import { useMemo, useState } from 'react';
import { buildMergeWarnings } from '../build-merge-warnings';

type Translate = (key: string, options?: Record<string, unknown>) => string;

export function useMergeFiles(t: Translate, onResetJoin: () => void, onResetOutput: () => void) {
  const [files, setFiles] = useState<File[]>([]);
  const warnings = useMemo(() => buildMergeWarnings(files, t), [files, t]);

  const onFiles = (nextFiles: File[]) => {
    onResetOutput();
    onResetJoin();
    setFiles((current) => {
      const existing = new Set(current.map((file) => file.name));
      const additions = nextFiles.filter((file) => !existing.has(file.name));

      return [...current, ...additions];
    });
  };

  const onRemove = (name: string) => {
    onResetOutput();
    onResetJoin();
    setFiles((current) => current.filter((file) => file.name !== name));
  };

  return { files, warnings, onFiles, onRemove };
}
