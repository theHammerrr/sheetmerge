import { useTranslation } from 'react-i18next';
import type { JoinGroup } from '../../../../join-mapping-types';
import { loadJoinHeaders } from '../../../../functions/load-join-headers';
import { useMergeConfig } from '../../../../functions/use-merge-config';
import { useMergeFiles } from '../../../../functions/use-merge-files';
import { useMergeOutput } from '../../../../functions/use-merge-output';
import { executeLocalMerge } from '../../application/execute-local-merge';
import { useJoinModalState } from '../use-join-modal-state';

export function useMergeState() {
  const { t } = useTranslation();
  const joinState = useJoinModalState();
  const { error, report, downloadUrl, resetOutput, handleMergeResult, handleError, setErrorMessage } =
    useMergeOutput(t);
  const { config, onConfigChange } = useMergeConfig(joinState.resetJoin);
  const { files, warnings, onFiles, onRemove } = useMergeFiles(t, joinState.resetJoin, resetOutput);

  const onMerge = async () => {
    resetOutput();

    if (warnings.length > 0) {
      setErrorMessage(t('errors.largeFilesDetected'));

      return;
    }

    try {
      if (config.mode === 'join') {
        const headers =
          joinState.joinHeaders.length > 0
            ? joinState.joinHeaders
            : await loadJoinHeaders(files, config.headerRow);
        joinState.openJoinModal(headers);

        return;
      }

      const result = await executeLocalMerge(files, config);
      handleMergeResult(result.csv, result.report);
    } catch (err) {
      handleError(err);
    }
  };

  const onJoinConfirm = async (groups: JoinGroup[]) => {
    joinState.confirmJoinModal(groups);
    resetOutput();

    try {
      const result = await executeLocalMerge(files, config, groups);
      handleMergeResult(result.csv, result.report);
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
    joinModalOpen: joinState.joinModalOpen,
    joinHeaders: joinState.joinHeaders,
    previousGroups: joinState.previousGroups,
    onFiles,
    onRemove,
    onMerge,
    onConfigChange,
    onJoinCancel: joinState.cancelJoinModal,
    onJoinConfirm,
  };
}
