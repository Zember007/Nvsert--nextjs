import ArrowImg from '@/assets/images/svg/arrow-main.svg'
import Image from 'next/image';
import { useState } from 'react';

interface props {
    title: string,
}

const Dropdown = ({ title }: props) => {

    const [active, setActive] = useState(false)
    const [listHidden, setListHidden] = useState(true)
    return (
        <div className={`${active && 'bg-[#FFF]'} hover:bg-[#FFF] transition-all duration-300 cursor-pointer`}>
          
                <div className="border-0 border-t border-b border-solid border-[#00000033]  flex flex-col px-[10px]">
                    <div
                        onClick={() => {
                            setActive(!active)
                        }}
                        className="flex items-center justify-between py-[23px]">
                        <p>{title}</p>
                        <Image className={`${!active && 'rotate-[180deg]'} transition-all duration-300`} alt='arrow' src={ArrowImg} width={24} height={24} />
                    </div>
                    <div className={` flex justify-between items-stretch gap-[10px] transition-all duration-300 overflow-hidden max-h-0 ${active && '!max-h-[500px] pb-[23px]'}`}>
                       
                    </div>
                </div>

            
        </div>
    );
};

export default Dropdown;