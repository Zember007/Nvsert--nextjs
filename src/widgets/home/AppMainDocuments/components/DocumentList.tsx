import { FC, memo, useId } from 'react';

import { filterPrepositions } from 'shared/lib';
import { MainDocumentItemProps } from '@/types/documents';
import stylesBtn from '@/assets/styles/main.module.scss';
import textSize from '@/assets/styles/main.module.scss';
import mainDocumentsStyles from '@/assets/styles/main.module.scss';


export interface DocumentListProps {
  documentsList: MainDocumentItemProps['documentsList'];
  listHidden: boolean;
  setListHidden: (value: boolean) => void;
  hiddenList: number;
}

// Список документов
export const DocumentList: FC<DocumentListProps> = memo(
  ({ documentsList, listHidden, setListHidden, hiddenList }) => {
    const clip0_4632_2058 = useId();

    return (
      <div className={`${mainDocumentsStyles['document__list']} `}>
        <div className={`${mainDocumentsStyles['document__list-item']} `}>
          <p className={textSize.text1}>
            Необходимые документы для оформления
          </p>
          <ul className={`${mainDocumentsStyles['document__list-item-ul']} ${textSize.text2}`}>
            {documentsList.map((list, index) => (
              <li
                className={`${
                  listHidden && index >= hiddenList ? 'hidden' : ''
                }`}
                key={index}
              >
                {filterPrepositions(list.value)}
              </li>
            ))}
          </ul>
          {documentsList.length > hiddenList && (
            <button
              className={`${mainDocumentsStyles['document-list-show-button']}  ${stylesBtn.lineAfterBox}  !gap-[5px] ${stylesBtn.btnIconAn}`}
              onClick={() => setListHidden(!listHidden)}
            >
              <span
                className={`${stylesBtn.lineAfter} !leading-[1.2] whitespace-nowrap`}
              >
                {listHidden
                  ? 'Показать полный список документов'
                  : 'Скрыть'}
              </span>

              <svg
                className={`${stylesBtn.sendIconLeft} ${mainDocumentsStyles['document-list-arrow']} ${
                  !listHidden ? 'rotate-[180deg]' : ''
                }`}
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath={`url(#${clip0_4632_2058})`}>
                  <path
                    d="M7 3.5H9V0.5H7L7 3.5ZM15 9.46767L13.5692 8.02908L9.01287 12.6092V6.5H6.98815V12.6092L2.43177 8.02908L1 9.46767L8 16.5L8.71538 15.7822L9.43177 15.0634L15 9.46767Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id={clip0_4632_2058}>
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="matrix(0 1 -1 0 16 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  },
);

DocumentList.displayName = 'DocumentList';


