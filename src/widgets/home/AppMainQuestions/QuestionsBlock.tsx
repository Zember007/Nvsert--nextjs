import { useButton } from 'shared/hooks';
import React, { useEffect } from 'react';
import { useAnimation, motion } from "framer-motion";
import { useRichTextRenderer } from 'shared/lib';
import stylesBtn from '@/assets/styles/main.module.scss';
import textSize from '@/assets/styles/main.module.scss';
import stylesQuestions from '@/assets/styles/main.module.scss';

const QuestionsBlock = ({ setActive, active, number, title, text }: { setActive: (value: boolean) => void, active: boolean, number: number, title: string, text: string }) => {
    const controls = useAnimation();
    const { setButtonRef, setWrapperRef } = useButton();
    const { processContent } = useRichTextRenderer();

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
    }, [active]);


    return (
        <div
            className={`${stylesQuestions['document-wrapper-border']} group/main`}
        >
            <div
                className={`${stylesQuestions['document__border']} ${!active ? 'group-active/main:!border-[transparent] group-hover/main:!border-[transparent]' : stylesQuestions.active}`}
            />
            <div className={`${stylesQuestions['document__box']}   ${!active ? stylesQuestions.active : ''}`}>

                <div className={`pointer-events-none absolute top-0 bottom-0 right-0 left-0 z-[-1] rounded-[6px]  ${!active ? 'group-hover/main:border-[#34446D]' : '!border-[#34446D]'} border-[transparent]  border-solid border`}></div>
                <div
                    onClick={() => {
                        setActive(!active)
                    }}
                    className={`${active ? ' active !bg-[#5B6788] !shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset] ' : ' '} document__navigation-bg  bg-[transparent]   h-[70px] relative  active:bg-[#5B6788]  active:shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset]   group cursor-pointer  rounded-[6px]  flex items-center gap-[9px] xl:gap-[40px] l:pr-[23px]  transition-scale`}>

                    <div className={`${stylesQuestions['questions-number-container']} ${active ? stylesQuestions.active : ''} ${stylesQuestions['transition-scale']} group-active:scale-[0.9]`}>
                        <p className={`${stylesQuestions['questions-number-text']} ${active ? stylesQuestions.active : ''} l:group-hover:text-[50px] group-active:duration-[0] group-active:text-[#FFF]`}>{number}</p>
                    </div>
                    <div className={`${stylesQuestions['questions-content-container']} ${active ? stylesQuestions.active : ''} ${stylesQuestions['transition-scale']} group-active:scale-[0.99]`}>
                        <p className={`${textSize.headerH6} ${stylesQuestions['questions-title']} ${active ? stylesQuestions.active : ''} group-active:duration-[0] group-active:text-[#FFF]`}>{title}</p>

                     

                        <svg
                            className={`${stylesQuestions['questions-arrow-icon']}  ${active ? stylesQuestions.active : 'group-hover:text-[#000]'}`}
                            width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.0459 1.0459L3.16722 3.16722M15.753 15.753L5.28854 5.28854" stroke="currentColor" strokeWidth="2" />
                            <path d="M15.7529 7.75293V14.4707L14.4717 15.7529H7.75293" stroke="currentColor" strokeWidth="2" />
                        </svg>


                    </div>
                </div>
                <div className={`${stylesQuestions['questions-content-wrapper']} ${active ? stylesQuestions.active : ''}`}>
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
                                >Подробнее</span>

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