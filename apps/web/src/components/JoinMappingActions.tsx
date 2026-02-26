import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { JoinGroup } from '../join-mapping-types';

type Props = {
  groups: JoinGroup[];
  onCancel: () => void;
  onConfirm: (groups: JoinGroup[]) => void;
};

const JoinMappingActions: FC<Props> = ({ groups, onCancel, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <div className="modal-actions">
      <button type="button" className="ghost" onClick={onCancel}>
        {t('joinModal.cancel')}
      </button>
      <button type="button" className="cta" onClick={() => onConfirm(groups)}>
        {t('joinModal.confirm')}
      </button>
    </div>
  );
};

export default JoinMappingActions;
