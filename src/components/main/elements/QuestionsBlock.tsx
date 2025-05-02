import React from 'react';

const QuestionsBlock = ({ setActive, active, number, title, text }: { setActive: (value: boolean) => void, active: boolean, number: number, title: string, text: string }) => {
    return (
        <div className={`relative flex flex-col rounded-[4px] bg-[#FFFFFF26] backdrop-blur-[1px] z-[0]`}>
            <div className={`absolute top-0 left-0 right-0 bottom-0 rounded-[4px] z-[-1] border border-solid border-[transparent] ${active && '!border-[#34446D]'}`}></div>
            <div
                onClick={() => {
                    setActive(!active)
                }}
                className={`${active && ' !bg-[#34446D] !border-[#000]'} hover:bg-[#34446D33] h-[70px] relative active:transition-all active:duration-200 active:bg-[#5B6788] active:shadow-[inset_-2px_-2px_4px_#000,inset_2px_2px_4px_#000] hover:border-[#34446D]  group border-[#CCCCCC] cursor-pointer border-solid border rounded-[4px]  flex items-center gap-[40px] pr-[10px]`}>
                <div className="w-[70px] min-w-[70px] h-[70px] flex items-center justify-center">
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
            <div className={`max-h-[0px] transition-all duration-200 delay-100 overflow-hidden ${active && '!max-h-[1000px]'}`}>
                <div className="pl-[110px] pr-[34px] py-[30px]">
                    <div className="mtp__spoiler-text" >
                        <div dangerouslySetInnerHTML={{ __html: text }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsBlock;