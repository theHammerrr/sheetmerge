import type { JoinGroup } from '../../../../join-mapping-types';
import type { MergeConfig, MergeReport } from '../../../../merge-types';
import { runLocalJoinMerge } from '../../../../functions/run-local-join-merge';
import { runLocalMerge } from '../../../../functions/run-local-merge';

type MergeResult = {
  csv: string;
  report: MergeReport;
};

export async function executeLocalMerge(
  files: File[],
  config: MergeConfig,
  groups?: JoinGroup[]
): Promise<MergeResult> {
  if (config.mode !== 'join') {
    return runLocalMerge(files, config);
  }

  if (!groups) {
    throw new Error('errors.joinMappingIncomplete');
  }

  return runLocalJoinMerge(files, config, groups);
}
