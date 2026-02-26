import { useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onFiles: (files: File[]) => void;
};

function UploadDrop({ onFiles }: Props) {
  const [dragging, setDragging] = useState(false);
  const { t } = useTranslation();

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const dropped = Array.from(event.dataTransfer.files);

    if (dropped.length > 0) {
      onFiles(dropped);
    }
  };

  const onPick = (event: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(event.currentTarget.files ?? []);

    if (picked.length > 0) {
      onFiles(picked);
    }

    event.currentTarget.value = '';
  };

  return (
    <div
      className={`drop ${dragging ? 'drop--active' : ''}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <input id="file-input" type="file" multiple accept=".csv" onChange={onPick} />
      <label htmlFor="file-input">
        <strong>{t('upload.dropTitle')}</strong>
        <span>{t('upload.dropHint')}</span>
      </label>
    </div>
  );
}

export default UploadDrop;
