type Translate = (key: string, options?: Record<string, unknown>) => string;

const MAX_FILE_BYTES = 5 * 1024 * 1024;

export function buildMergeWarnings(files: File[], t: Translate): string[] {
  return files
    .filter((file) => file.size > MAX_FILE_BYTES)
    .map((file) => t('warnings.largeFile', { name: file.name }));
}
