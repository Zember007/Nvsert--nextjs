import { useButton } from '@/hook/useButton';
import React from 'react';

const QuestionsBlock = ({ setActive, active, number, title, text }: { setActive: (value: boolean) => void, active: boolean, number: number, title: string, text: string }) => {
    const { setButtonRef, setWrapperRef } = useButton()

    return (
        <div className={`relative flex flex-col rounded-[6px] bg-[#FFFFFF26] backdrop-blur-[1px] z-[0]`}>
            <div className={`absolute top-0 left-0 right-0 bottom-0 rounded-[6px] z-[-1]  border border-solid border-[transparent] ${active ? '!border-[#34446D]' : 'delay-200'}`}></div>
            <div
                onClick={() => {
                    setActive(!active)
                }}
                className={`${active && ' !bg-[#34446D] !border-[#000]'} hover:bg-[#34446D33] h-[70px] relative active:transition-all active:duration-200 active:bg-[#5B6788] active:shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset] hover:border-[#34446D]  group border-[#CCCCCC] cursor-pointer border-solid border rounded-[6px]  flex items-center gap-[40px] pr-[10px]`}>
                <div className="group-active:scale-[0.9] will-change-transform ease transition-all duration-100 w-[70px] min-w-[70px] h-[70px] flex items-center justify-center">
                    <p className={`${active && 'text-[50px] text-[#FFF]'} text-[22px] rubik group-hover:text-[50px] group-active:duration-[0] ease transition-all duration-100 group-active:text-[#FFF]`}>{number}</p>
                </div>
                <div className="group-active:scale-[0.99] grow will-change-transform ease transition-all duration-100  flex items-center gap-[40px]">
                    <p className={`${active ? '[text-shadow:0_0_0.7px_white] text-[#FFF]' : 'group-hover:[text-shadow:0_0_0.7px_black]'} grow text-[20px] ease-in-out transition-all duration-200 group-active:duration-[0] font-[400] group-active:text-[#FFF]  group-active:[text-shadow:0_0_0.7px_white]`}>{title}</p>
                    <button>
                        <svg
                            className={`${!active ? 'rotate-[180deg] group-hover:*:stroke-[#000] ' : '*:stroke-[#FFF]'} *:transition-all *:duration-200  group-active:*:stroke-[#FFF] transition-all duration-200`}
                            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 19L5 5" stroke={`#93969D`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 13L5 5L13 5" stroke={`#93969D`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </button>
                </div>
            </div>
            <div className={`max-h-[0px] transition-all easy-in duration-200 overflow-hidden ${active && '!max-h-[1000px]'}`}>
                <div className="pl-[110px] pr-[34px] py-[30px] flex flex-col gap-[30px]">
                    <div className="mtp__spoiler-text" >
                        <div dangerouslySetInnerHTML={{ __html: text }}></div>
                    </div>


                    <div
                        className="tariff-wrap w-[247px] " ref={setWrapperRef}>
                        <button
                            ref={setButtonRef} className='btnIconAn  border-[#34446D] border border-solid tariff text-[20px] transition-all duration-300 font-bold tracking-normal  gap-[6px]  text-[#34446D] hover:text-[#FFF] rounded-[4px]  group hover:bg-[#34446D]  leading-[1]'>
                            <div className="justify-center m:flex items-center px-[16px] py-[9px] relative overflow-hidden">
                                <div className="sendIconLeft transition-all ease-in">                  
                                    <svg className='  group-hover:*:*:stroke-[#34446D] *:transition-all *:duration-300' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect className='group-hover:fill-[#FFF] transition-all duration-300' x="1" y="1" width="24" height="24" rx="2" fill="#34446D" />
                                        <g clip-path="url(#clip0_3340_1351)">
                                            <path d="M5.81677 13H20.1832" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16.0785 8.8953L20.1832 13L16.0785 17.1047" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3340_1351">
                                                <rect width="17.4147" height="17.4147" fill="white" transform="translate(0.685913 13) rotate(-45)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <span
                                    className="transition-all ease-in"
                                >Подробнее</span>   
                            </div>

                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuestionsBlock;