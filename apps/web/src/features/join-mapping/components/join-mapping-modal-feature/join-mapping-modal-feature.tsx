import type { FC } from 'react';
import JoinMappingModal from '../../../../components/JoinMappingModal';
import type { JoinGroup } from '../../../../join-mapping-types';

type FileHeaders = {
  name: string;
  headers: string[];
};

type Props = {
  files: FileHeaders[];
  previousGroups: JoinGroup[] | null;
  onCancel: () => void;
  onConfirm: (groups: JoinGroup[]) => void;
};

const JoinMappingModalFeature: FC<Props> = ({ files, previousGroups, onCancel, onConfirm }) => {
  return (
    <JoinMappingModal
      files={files}
      previousGroups={previousGroups}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default JoinMappingModalFeature;
