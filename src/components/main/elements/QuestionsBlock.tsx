import { useButton } from '@/hook/useButton';
import React, { useEffect } from 'react';
import { useAnimation, motion } from "framer-motion";
import QuestionArrow from '../svg/QuestionArrow';
import { useRichTextRenderer } from '@/hook/useRichTextRenderer';
import '@/assets/styles/sections/main/questions-block.scss';

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
        opacity: [0, 1, 1, 1, 1],
    };

    useEffect(() => {
        if (active) {
            controls.start({
                y: defaultSettings.openY, // Используем openY для отскока
                opacity: defaultSettings.opacity,
                transition: {
                    duration: defaultSettings.duration,
                    ease: [0.34, 1.56, 0.64, 1] as const,
                    times: defaultSettings.times
                }
            });
        }
    }, [active]);


    return (
        <div
            className={` document-wrapper-border group/main`}
        >
            <div
                className={`document__border ${!active ? 'group-active/main:!border-[transparent] group-hover/main:!border-[transparent]' : 'active'}`}
            />
            <div className={` document__box   ${!active ? 'active' : ''}`}>

                <div className={`pointer-events-none absolute top-0 bottom-0 right-0 left-0 z-[-1] rounded-[6px]  ${!active ? 'group-hover/main:border-[#34446D]' : '!border-[#34446D]'} border-[transparent]  border-solid border`}></div>
                <div
                    onClick={() => {
                        setActive(!active)
                    }}
                    className={`${active ? ' active !bg-[#5B6788] !shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset] ' : ' '} document__navigation-bg  bg-[transparent]   h-[70px] relative  active:bg-[#5B6788]  active:shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset]   group cursor-pointer  rounded-[6px]  flex items-center gap-[9px] xl:gap-[40px] l:pr-[23px]  transition-scale`}>

                    <div className={`questions-number-container ${active ? 'active' : ''} transition-scale group-active:scale-[0.9]`}>
                        <p className={`questions-number-text ${active ? 'active' : ''} l:group-hover:text-[50px] group-active:duration-[0] group-active:text-[#FFF]`}>{number}</p>
                    </div>
                    <div className={`questions-content-container ${active ? 'active' : ''} transition-scale group-active:scale-[0.99]`}>
                        <h3 className={`questions-title ${active ? 'active' : ''} group-active:duration-[0] group-active:text-[#FFF]`}>{title}</h3>

                        <svg
                            className={`questions-arrow-icon ${active ? 'active' : ''}`}
                            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 5L19 19" stroke="#93969D" strokeWidth="2" strokeLinejoin="round" strokeLinejoin="round" />
                            <path d="M19 11L19 19L11 19" stroke="#93969D" strokeWidth="2" strokeLinejoin="round" strokeLinejoin="round" />
                        </svg>


                    </div>
                </div>
                <div className={`questions-content-wrapper ${active ? 'active' : ''}`}>
                    <div className="questions-inner-content">
                        <div>{processContent(text)}</div>


                        <motion.div
                            animate={controls}
                            initial={{ y: 20, opacity: 0 }}
                            className="questions-button-wrap tariff-wrap" ref={setWrapperRef}>
                            <button
                                ref={setButtonRef} className='questions-button group tariff btnIconAn'>

                                <span
                                    className="sendText"
                                >Подробнее</span>

                                <span className="sendIconLeft">
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