import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import './JoinMappingHeader.css';

type Props = {
  canReuse: boolean;
  reusePrevious: boolean;
  mappingSummary: string;
  onToggle: (value: boolean) => void;
};

const JoinMappingHeader: FC<Props> = ({ canReuse, reusePrevious, mappingSummary, onToggle }) => {
  const { t } = useTranslation();
  const tooltip = mappingSummary.length > 0 ? t('joinModal.reuseTooltip', { mapping: mappingSummary }) : t('joinModal.reuseEmpty');

  return (
    <div className="modal-header">
      <h2>{t('joinModal.title')}</h2>
      <p>{t('joinModal.subtitle')}</p>
      <label className="reuse-toggle">
        <input
          type="checkbox"
          checked={reusePrevious}
          onChange={(event) => onToggle(event.currentTarget.checked)}
          disabled={!canReuse}
        />
        <span>{t('joinModal.reuseLabel')}</span>
        <span className="reuse-tooltip" title={tooltip}>
          ?
        </span>
      </label>
    </div>
  );
};

export default JoinMappingHeader;
