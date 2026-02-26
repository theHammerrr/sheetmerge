type Translate = (key: string, options?: Record<string, unknown>) => string;

export function setMergeError(t: Translate, err: unknown, setError: (value: string) => void): void {
  if (err instanceof Error) {
    const localized = t(err.message);
    setError(localized === err.message ? t('errors.unknown') : localized);

    return;
  }

  setError(t('errors.unknown'));
}
