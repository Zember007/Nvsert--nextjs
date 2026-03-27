import { useButton } from 'shared/hooks';
import React, { useEffect } from 'react';
import { useAnimation, motion } from "framer-motion";
import { useRichTextRenderer } from 'shared/lib';
import stylesBtn from '@/assets/styles/base/base.module.scss';
import textSize from '@/assets/styles/base/base.module.scss';
import stylesQuestions from '@/assets/styles/sections/main/main-questions.module.scss';
import stylesDocuments from '@/assets/styles/sections/main/main-documents.module.scss';
import { useTranslation } from 'react-i18next';

const QuestionsBlock = ({ setActive, active, number, title, text }: { setActive: (value: boolean) => void, active: boolean, number: number, title: string, text: string }) => {
    const controls = useAnimation();
    const { setButtonRef, setWrapperRef } = useButton();
    const { processContent } = useRichTextRenderer();
    const { t } = useTranslation();

    const defaultSettings = {
        duration: 0.6,
        bounce: 5,
        delay: 0,
        ease: [0.34, 1.56, 0.64, 1], // Кастомная cubic-bezier кривая
        times: [0, 0.2, 0.5, 0.8, 1], // Временные точки
        openY: [0, 26, 0, 0, 0], // Эффект отскока при открытии
        closeY: [60, -6, 0, 0, 0], // Эффект отскока при закрытии
        opacity: [1, 1, 1, 1, 1],
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (active) {
            timer = setTimeout(() => {
                controls.start({
                    y: defaultSettings.openY, // Используем openY для отскока
                    opacity: defaultSettings.opacity,
                    transition: {
                        duration: defaultSettings.duration,
                        ease: [0.34, 1.56, 0.64, 1] as const,
                        times: defaultSettings.times
                    }
                });
            }, 150);

        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [active, controls, defaultSettings.duration, defaultSettings.opacity, defaultSettings.openY, defaultSettings.times]);


    return (
        <div
            className={`${stylesDocuments['document-wrapper-border']} ${active ? stylesDocuments['document-wrapper-border-active'] : ''} group/main`}
        >
            <div className={`${stylesDocuments['document__box']} ${active ? stylesDocuments.active : ''}`}>
                <div
                    onClick={() => {
                        setActive(!active)
                    }}
                    className={`${stylesDocuments['document__navigation']} ${active ? stylesDocuments.active : ''} document__navigation-bg group/window cursor-pointer flex items-center gap-[9px] xl:gap-[40px] l:pr-[23px]`}>

                    <div className={`${stylesQuestions['questions-number-container']} ${active ? stylesQuestions.active : ''} ${stylesQuestions['transition-scale']} group-active:scale-[0.9]`}>
                        <p className={`${stylesQuestions['questions-number-text']} ${active ? stylesQuestions.active : ''} l:group-hover:text-[50px] group-active:duration-[0] group-active:text-[#000]`}>{number}</p>
                    </div>
                    <div className={`${stylesQuestions['questions-content-container']} ${active ? stylesQuestions.active : ''} ${stylesQuestions['transition-scale']} group-active:scale-[0.99]`}>
                        <p className={`${textSize.headerH6} ${stylesQuestions['questions-title']} ${active ? stylesQuestions.active : ''} group-active:duration-[0] group-active:text-[#000]`}>{title}</p>

                     

                        <svg
                            className={`${stylesQuestions['questions-arrow-icon']}  ${active ? stylesQuestions.active : 'group-hover:text-[#000]'} transition-all duration-200`}
                            width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 8V7H8V6H7V5H6V6H5V7H6V8H7V9H8V10H9V11H10V12H11V13H12V14H13V15H14V16H7V18H16H18V16V7H16V14H15V13H14V12H13V11H12V10H11V9H10V8H9Z" fill="currentColor" />
                            <path d="M3 4H4V3V2H3V1H2V0H1V1H0V2H1V3H2V4H3Z" fill="currentColor" />
                        </svg>


                    </div>
                </div>
                <div className={`${stylesDocuments['document__hidden']} ${stylesQuestions['questions-content-wrapper']} ${active ? stylesDocuments.active : ''}`}>
                    <div className={stylesQuestions['questions-inner-content']}>
                        <div
                        >{processContent(text, true)}</div>


                        <motion.div
                            animate={controls}
                            initial={{ y: 20 }}
                            className={`${stylesBtn.tariffWrap} ${stylesQuestions['questions-button-wrap']}`} ref={setWrapperRef}>
                            <button
                                ref={setButtonRef} className={`${stylesQuestions['questions-button']} group ${stylesBtn.tariff} ${stylesBtn.btnIconAn}`}>

                                <span
                                    className={`${stylesBtn.sendText}`}
                                >{t('common.moreDetails')}</span>

                                <span className={`${stylesBtn.sendIconLeft}`}>
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
                                    </svg>
                                </span>

                            </button>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsBlock;