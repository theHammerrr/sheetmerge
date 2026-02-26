import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { JoinGroup } from '../../join-mapping-types';
import { loadJoinHeaders } from '../load-join-headers';
import { runLocalJoinMerge } from '../run-local-join-merge';
import { runLocalMerge } from '../run-local-merge';
import { useMergeConfig } from '../use-merge-config';
import { useMergeFiles } from '../use-merge-files';
import { useMergeOutput } from '../use-merge-output';

export function useMergeState() {
  const { t } = useTranslation();
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinHeaders, setJoinHeaders] = useState<Array<{ name: string; headers: string[] }>>([]);
  const [joinGroups, setJoinGroups] = useState<JoinGroup[] | null>(null);
  const resetJoin = () => {
    setJoinGroups(null);
    setJoinHeaders([]);
  };
  const { error, report, downloadUrl, resetOutput, handleMergeResult, handleError, setErrorMessage } =
    useMergeOutput(t);
  const { config, onConfigChange } = useMergeConfig(resetJoin);
  const { files, warnings, onFiles, onRemove } = useMergeFiles(t, resetJoin, resetOutput);

  const runJoinMerge = async (groups: JoinGroup[]) => {
    const result = await runLocalJoinMerge(files, config, groups);
    handleMergeResult(result.csv, result.report);
  };

  const onMerge = async () => {
    resetOutput();

    if (warnings.length > 0) {
      setErrorMessage(t('errors.largeFilesDetected'));

      return;
    }

    try {
      if (config.mode === 'join' && !joinGroups) {
        const headers = await loadJoinHeaders(files, config.headerRow);
        setJoinHeaders(headers);
        setJoinModalOpen(true);

        return;
      }

      if (config.mode === 'join' && joinGroups) {
        await runJoinMerge(joinGroups);
      } else {
        const result = await runLocalMerge(files, config);
        handleMergeResult(result.csv, result.report);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const onJoinCancel = () => {
    setJoinModalOpen(false);
  };

  const onJoinConfirm = async (groups: JoinGroup[]) => {
    setJoinGroups(groups);
    setJoinModalOpen(false);
    resetOutput();

    try {
      await runJoinMerge(groups);
    } catch (err) {
      handleError(err);
    }
  };

  return {
    files,
    warnings,
    error,
    report,
    downloadUrl,
    config,
    joinModalOpen,
    joinHeaders,
    onFiles,
    onRemove,
    onMerge,
    onConfigChange,
    onJoinCancel,
    onJoinConfirm,
  };
}
