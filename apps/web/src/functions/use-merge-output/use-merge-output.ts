import { useState } from 'react';
import { setMergeError } from '../set-merge-error';
import { setMergeResult } from '../set-merge-result';
import type { MergeReport } from '../../merge-types';

type Translate = (key: string, options?: Record<string, unknown>) => string;

export function useMergeOutput(t: Translate) {
  const [error, setError] = useState('');
  const [report, setReport] = useState<MergeReport | null>(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const resetOutput = () => {
    setError('');
    setReport(null);
    setDownloadUrl('');
  };

  const handleMergeResult = (csv: string, nextReport: MergeReport) => {
    setMergeResult(csv, nextReport, setDownloadUrl, setReport);
  };

  const handleError = (err: unknown) => {
    setMergeError(t, err, setError);
  };

  const setErrorMessage = (value: string) => {
    setError(value);
  };

  return { error, report, downloadUrl, resetOutput, handleMergeResult, handleError, setErrorMessage };
}
