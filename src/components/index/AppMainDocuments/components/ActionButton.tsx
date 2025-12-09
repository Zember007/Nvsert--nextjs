import { FC, memo } from 'react';
import stylesBtn from '@/assets/styles/base/base.module.scss';
import mainDocumentsStyles from '@/assets/styles/main.module.scss';

// Локальная иконка стрелки
const ArrowRightIcon: FC = memo(() => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
  </svg>
));

ArrowRightIcon.displayName = 'ArrowRightIcon';

export interface ActionButtonProps {
  onClick: () => void;
  text: string;
  className: string;
  setRef: (el: HTMLButtonElement | null) => void;
}

// Универсальная кнопка-действие
export const ActionButton: FC<ActionButtonProps> = memo(
  ({ onClick, text, className, setRef }) => (
    <button
      ref={setRef}
      onClick={onClick}
      className={`${mainDocumentsStyles['document__button']} group  ${stylesBtn.tariff} ${stylesBtn.btnIconAn}`}
    >
      <span className={`${stylesBtn.sendText} `}>{text}</span>
      <span className={`${stylesBtn.sendIconLeft} `}>
        <ArrowRightIcon />
      </span>
    </button>
  ),
);

ActionButton.displayName = 'ActionButton';


