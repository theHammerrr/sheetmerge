import { useState } from 'react';
import type { JoinGroup } from '../../../../join-mapping-types';

type JoinHeaders = Array<{ name: string; headers: string[] }>;

export function useJoinModalState() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinHeaders, setJoinHeaders] = useState<JoinHeaders>([]);
  const [previousGroups, setPreviousGroups] = useState<JoinGroup[] | null>(null);

  const resetJoin = () => {
    setJoinHeaders([]);
    setJoinModalOpen(false);
  };

  const openJoinModal = (headers: JoinHeaders) => {
    setJoinHeaders(headers);
    setJoinModalOpen(true);
  };

  const cancelJoinModal = () => {
    setJoinModalOpen(false);
  };

  const confirmJoinModal = (groups: JoinGroup[]) => {
    setPreviousGroups(groups);
    setJoinModalOpen(false);
  };

  return {
    joinModalOpen,
    joinHeaders,
    previousGroups,
    resetJoin,
    openJoinModal,
    cancelJoinModal,
    confirmJoinModal,
  };
}
