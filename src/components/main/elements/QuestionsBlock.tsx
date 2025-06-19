import { useButton } from '@/hook/useButton';
import React, { useEffect } from 'react';
import { useAnimation, motion } from "framer-motion";
import QuestionArrow from '../svg/QuestionArrow';

const QuestionsBlock = ({ setActive, active, number, title, text }: { setActive: (value: boolean) => void, active: boolean, number: number, title: string, text: string }) => {
    const controls = useAnimation();
    const { setButtonRef, setWrapperRef } = useButton()

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
                    ease: defaultSettings.ease,
                    times: defaultSettings.times
                }
            });
        }
    }, [active]);


    return (
        <div className={`relative document-wrapper-border mt-[-1px] flex flex-col rounded-[6px]  group/main ${active ? '' : 'bg-[#FFFFFF26] hover:bg-[#34446D33]'} z-[0]`}>
            <div
                className={`!left-[6px] !right-[6px] document__border ${!active ? 'group-hover/main:!border-[transparent]' : 'active'}`}
            />
            <div className={`pointer-events-none absolute top-0 bottom-0 right-0 left-0 z-[-1] rounded-[6px]  ${!active ? 'group-hover/main:border-[#34446D]' : '!border-[#34446D]'} border-[transparent]  border-solid border`}></div>
            <div
                onClick={() => {
                    setActive(!active)
                }}
                className={`${active ? ' !bg-[#5B6788] !shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset] ' : ' '}  bg-[transparent]   m:h-[70px] h-[60px] relative  active:bg-[#5B6788]  active:shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset]   group cursor-pointer  rounded-[6px]  flex items-center gap-[10px] m:gap-[40px] m:pr-[10px] pr-[20px] transition-scale`}>

                <div className={`${active ? 'scale-[0.9]' : ''} transition-scale group-active:scale-[0.9] will-change-transform ease transition-all duration-100 m:w-[70px] m:min-w-[70px] w-[44px] min-w-[44px] h-[60px] m:h-[70px] flex items-center justify-center`}>
                    <p className={`${active && 'm:text-[50px] text-[#FFF]'} text-[24px] rubik m:group-hover:text-[50px] group-active:duration-[0] ease transition-all duration-100 group-active:text-[#FFF]`}>{number}</p>
                </div>
                <div className={`${active ? 'scale-[0.99]' : ''} transition-scale group-active:scale-[0.99] grow will-change-transform ease transition-all duration-100  flex items-center gap-[40px]`}>
                    <h3 className={`${active ? '[text-shadow:0_0_0.7px_white] text-[#FFF]' : ''} grow text-[14px] m:text-[20px] ease-in-out transition-all duration-200 group-active:duration-[0] font-[400] group-active:text-[#FFF]  group-active:[text-shadow:0_0_0.7px_white]`}>{title}</h3>
                    <svg
                        className={`${!active ? 'rotate-[180deg]  ' : ''} *:transition-all *:duration-200   hidden m:block transition-all duration-200`}
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 19L5 5" stroke={`#93969D`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 13L5 5L13 5" stroke={`#93969D`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>
            </div>
            <div className={`max-h-[0px] transition-all easy-in duration-200 overflow-hidden ${active && '!max-h-[1000px]'}`}>
                <div className="m:pl-[110px] p-[20px] m:pr-[34px] m:py-[30px] flex flex-col gap-[30px]">
                    <div className="mtp__spoiler-text" >
                        <div dangerouslySetInnerHTML={{ __html: text }}></div>
                    </div>


                    <motion.div
                        animate={controls}
                        initial={{ y: 20, opacity: 0 }}
                        className="tariff-wrap m:w-[247px] w-full " ref={setWrapperRef}>
                        <button
                            ref={setButtonRef} className='btnIconAn m:bg-[transparent] bg-[#34446D] justify-center m:flex items-center px-[16px] py-[9px] relative overflow-hidden border border-solid border-[#34446D] tariff m:text-[20px] text-[18px] transition-all duration-300 font-bold tracking-normal  gap-[6px]  hover:text-[#FFF] text-[#FFF] m:text-[#34446D] rounded-[4px] group hover:bg-[#34446D]  leading-[1] '>
                            <span className="sendIconLeft transition-all ease-in m:block hidden">
                                <QuestionArrow />
                            </span>
                            <span
                                className="transition-all ease-in sendText"
                            >Подробнее</span>

                        </button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default QuestionsBlock;