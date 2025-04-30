import React from 'react';

const QuestionsBlock = () => {
    return (
        <div className='bg-[#FFFFFF26] hover:bg-[#34446D33] h-[70px] relative active:shadow-[inset_-2px_-2px_4px_#000,inset_2px_2px_4px_#000] hover:border-[#34446D] backdrop-blur-[1px] group border-[#CCCCCC] cursor-pointer border-solid border rounded-[4px]  flex items-center gap-[40px] pr-[10px]'>
            <div className="w-[70px] h-[70px] flex items-center justify-center">
                <p className='text-[22px] rubik group-hover:text-[60px] ease-in-out transition-all duration-300'>1</p>
            </div>
            <div className="group-active:scale-[0.99] grow will-change-transform ease transition-all duration-100  flex items-center gap-[40px]">
                <p className='grow text-[18px] ease-in-out transition-all duration-300 font-[400] group-hover:[text-shadow:0_0_0.7px_black]'>Как проходит сертификация продукции?</p>
                <button>
                    <svg
                        className={` *:transition-all *:duration-200 group-hover:*:stroke-[#000] transition-all duration-300`}
                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 19L5 5" stroke={`#93969D`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 13L5 5L13 5" stroke={`#93969D`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </button>
            </div>
        </div>
    );
};

export default QuestionsBlock;