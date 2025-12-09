import { FC, memo } from 'react';
import type { AnimationControls } from 'framer-motion';
import { motion } from 'framer-motion';

import stylesBtn from '@/assets/styles/base/base.module.scss';
import { ActionButton } from './ActionButton';
import mainDocumentsStyles from '@/assets/styles/main.module.scss';

export interface DocumentActionsProps {
  controls: AnimationControls;
  commonButtonClasses: string;
  setWrapperRef: (el: HTMLDivElement | null) => void;
  setButtonRef: (el: HTMLButtonElement | null) => void;
  handleOrderClick: () => void;
  handleServiceClick: () => void;
  isMobile: boolean;
}

export const DocumentActions: FC<DocumentActionsProps> = memo(
  ({
    controls,
    commonButtonClasses,
    setWrapperRef,
    setButtonRef,
    handleOrderClick,
    handleServiceClick,
    isMobile,
  }) => {
    if (isMobile) {
      return (
        <div className={`${mainDocumentsStyles['document-content-wrapper']} `}>
          <motion.div
            animate={controls}
            initial={{ y: 20 }}
            className={`${stylesBtn.tariffWrap} w-[280px] l:mx-0 mx-auto l:w-[250px] `}
            ref={setWrapperRef}
          >
            <ActionButton
              setRef={setButtonRef}
              onClick={handleOrderClick}
              text="Оформить заявку"
              className={commonButtonClasses}
            />
          </motion.div>
          <motion.div
            animate={controls}
            initial={{ y: 20 }}
            className={`${stylesBtn.tariffWrap} w-[280px] l:mx-0 mx-auto l:w-[250px] `}
          >
            <ActionButton
              setRef={setButtonRef}
              onClick={handleServiceClick}
              text="Перейти в услугу"
              className={commonButtonClasses}
            />
          </motion.div>
        </div>
      );
    }

    return (
      <motion.div
        animate={controls}
        initial={{ y: 20 }}
        className={`${stylesBtn.tariffWrap} max-w-full w-[280px]  l:w-[250px]`}
        ref={setWrapperRef}
      >
        <ActionButton
          setRef={setButtonRef}
          onClick={handleOrderClick}
          text="Оформить заявку"
          className={commonButtonClasses}
        />
      </motion.div>
    );
  },
);

DocumentActions.displayName = 'DocumentActions';


