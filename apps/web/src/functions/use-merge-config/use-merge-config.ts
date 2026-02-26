import { useState } from 'react';
import { createDefaultMergeConfig } from '../create-default-merge-config';
import type { MergeConfig } from '../../merge-types';

export function useMergeConfig(onResetJoin: () => void) {
  const [config, setConfig] = useState<MergeConfig>(createDefaultMergeConfig());

  const onConfigChange = (next: MergeConfig) => {
    const modeChanged = next.mode !== config.mode;
    const headerChanged = next.headerRow !== config.headerRow || next.dataStartRow !== config.dataStartRow;

    if (modeChanged || headerChanged) {
      onResetJoin();
    }

    setConfig(next);
  };

  return { config, onConfigChange };
}
