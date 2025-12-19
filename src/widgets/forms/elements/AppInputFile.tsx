import { useState, ChangeEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface AppInputFileProps {
  inputName: string;
  discount: number;
  required?: boolean;
}

interface FilePreview {
  name: string;
  size: number;
}

function formatBytes(bytes: number, decimals = 2): string {
  if (!bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const AppInputFile = ({ inputName, discount, required }: AppInputFileProps) => {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const { t } = useTranslation();

  function fileInputHandler(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;

    if (!input.files || input.files.length === 0) {
      setFiles([]);
      return;
    }

    const nextFiles: FilePreview[] = [];
    for (let i = 0; i < input.files.length; i += 1) {
      const file = input.files.item(i);
      if (file) {
        nextFiles.push({
          name: file.name,
          size: file.size,
        });
      }
    }

    setFiles(nextFiles);
  }

  function resetInputFile(event: MouseEvent<HTMLButtonElement>) {
    const root = (event.target as HTMLElement).closest('.js-cost-calc__file');
    if (!root) return;

    const fileInput = root.querySelector<HTMLInputElement>('.js-input-file');
    if (!fileInput) return;

    fileInput.value = '';

    const customEvent = new Event('change', {
      bubbles: true,
    });

    fileInput.dispatchEvent(customEvent);
  }

  return (
    <div className="cost-calc__file js-cost-calc__file">
      <label className="field" style={{ display: files.length !== 0 ? 'none' : undefined }}>
        <input
          type="file"
          name={inputName}
          onChange={fileInputHandler}
          className="js-input-file"
          hidden
          multiple
          required={required}
        />
        <span className="cost-calc__file-btn">
          <i className="icon icon--clip" />
          {t('calculation.form.placeholder.file_doc')}
        </span>
        <span className="cost-calc__file-desc">
          {t('calculation.form.placeholder.file')}
        </span>
      </label>
      <div
        style={{ display: files.length <= 0 ? 'none' : undefined }}
        className="files-preview"
      >
        {files.map((file) => (
          <div className="files-preview__item" key={`${file.name}-${file.size}`}>
            <div className="top">
              <i className="icon icon--file" />
              {file.name}
            </div>
            <div className="info">{formatBytes(file.size)}</div>
          </div>
        ))}

        <button
          type="button"
          style={{ display: files.length <= 0 ? 'none' : undefined }}
          className="files-preview__reset"
          onClick={resetInputFile}
        >
          Удалить все
        </button>
      </div>
      {discount > 0 && <span className="discount">+{discount}%</span>}
    </div>
  );
};

export default AppInputFile;
