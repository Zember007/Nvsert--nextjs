import ArrowImg from '@/assets/images/svg/arrow-main.svg'
import Image from 'next/image';
import { useState } from 'react';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';

interface content {
    text: string,
    text1?: string
}

interface content1 {
    title: string
    list: string[]
}

interface props {
    img: StaticImageData,
    title: string,
    content: content,
    content1: content1[],
    active: boolean,
    setActive: (value: boolean) => void,
    setHover: (value: boolean) => void,
    bordert: boolean,
    borderb: boolean
}

interface pulse {
    width: string;
    height: string;
    top: string;
    left: string;
}

const MainDocumentItem = ({ img, title, content, content1, active, setActive, borderb, bordert, setHover }: props) => {

    const [listHidden, setListHidden] = useState(true);
    const [pulseStyle, setPulseStyle] = useState<null | pulse>(null);

    const handleItemClick = (event: any) => {
        console.log(event);

        if (window.innerWidth >= 1008) {
            const maxWidthHeight = Math.max(event.target.offsetWidth, event.target.offsetHeight);
            const pulse = {
                width: `${maxWidthHeight}px`,
                height: `${maxWidthHeight}px`,
                top: `${event.pageY - event.target.offsetTop - maxWidthHeight / 2}px`,
                left: `${event.pageX - event.target.offsetLeft - maxWidthHeight / 2}px`,
            };
            setPulseStyle(pulse);
            setTimeout(() => {
                setPulseStyle(null); // Убираем пульсацию через 300мс
            }, 300);
        }
    };

    return (
        <div
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            className={` ${!active && 'hover:shadow-[0px_2px_4px_0px_#00000040_inset,_0px_-2px_4px_0px_#00000040_inset] hover:bg-[#FFF]'}  transition-all duration-300 cursor-pointer`}>
            <div className="  flex flex-col">
                <div className="wrapper">
                    <div
                        onClick={(event) => {
              
                            setActive(!active);
                        }}
                        className={`flex items-center border-0   border-solid border-[#00000033] ${!bordert && 'border-t-[transparent]'} border-t-[0.5px] ${(!borderb || active) && 'border-b-[transparent]'} border-b-[0.5px]  justify-between py-[15px] s:py-[23px] ${active && 'text-[#34446D]'} hover:text-[#34446D] text-[#000] transition-all duration-300 relative pl-[63px] ${!active && ' hover:border-[transparent] '}`}>

      

                        <div className={`transition-all duration-500 absolute top-1/2 left-0 translate-y-[-50%] ${active && '!duration-700 translate-y-[60px]'}`}>
                            <Image alt='document' src={img}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className={`transition-all duration-700 ${!active && '!duration-500 w-[43px]'} h-auto`} />
                        </div>
                        <p className="w-1/2 text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">{title}</p>
                        <div className="w-1/2 flex items-center justify-between">
                            <p className="text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">от 2-х дней</p>
                            <p className="text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">от 6 800 ₽</p>
                            <button>
                                <Image
                                    className={`${!active && 'rotate-[180deg]'} transition-all duration-700`} alt='arrow' src={ArrowImg} width={24} height={24} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${active && 'bg-[#FFF] shadow-[0px_2px_4px_0px_#00000040_inset,_0px_-2px_4px_0px_#00000040_inset]'}`}>
                    <div className="wrapper">
                        <div className={` flex flex-col l:flex-row justify-between m:items-stretch gap-[10px] transition-all easy-in duration-500 overflow-hidden max-h-0 ${active && '!duration-700 !max-h-[1200px] s:py-[23px] py-[15px]'}`}>
                            <div className="s:gap-[40px] gap-[20px] justify-between flex flex-col m:flex-row m:items-stretch">
                                <div className='m:m-0 m-auto'>
                                    <div
                                        style={{
                                            width: img.width + 'px',
                                            height: img.height + 'px'
                                        }}
                                    ></div>
                                </div>

                                <div className=" flex flex-col justify-between  items-start">
                                    <div className="flex flex-col gap-[40px]">
                                        <p className='text-[16px] text-[#000000] m:max-w-[360px]'>
                                            {content.text}
                                        </p>
                                        <p className='text-[16px] text-[#000000] m:max-w-[300px]'>
                                            {content.text1}
                                        </p>
                                    </div>
                                    <button className='text-[20px]  font-bold tracking-normal m:block hidden px-[30px] py-[14px] text-[#34446D] rounded-[4px] bg-[#2D2F2F1A] border-[#34446D] border border-solid leading-[1]'>
                                        Оформить заявку
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-[10px] flex-col  m:max-w-[500px] text-[#000]">

                                {
                                    content1.map((cont, contIndex) => (
                                        <div key={contIndex} className='flex gap-[10px] flex-col items-start'>
                                            <p className='text-[20px] font-bold'>{cont.title}</p>

                                            <ul className=' list-disc pl-[20px] flex flex-col gap-[6px]'>

                                                {
                                                    cont.list.map((list, index) => (
                                                        <li className={`${listHidden && index > 4 && 'hidden'}`} key={index}>{list}</li>
                                                    ))
                                                }

                                            </ul>


                                            {
                                                listHidden && cont.list.length > 5 && <button
                                                    className='text-[#34446D] font-bold'
                                                    onClick={() => setListHidden(false)}
                                                >Показать полный список документов 🡣</button>
                                            }
                                        </div>
                                    ))
                                }

                            </div>

                            <button className='m:hidden  py-[18px] text-[20px] font-bold rounded-[4px] bg-[#000000] leading-[1] text-[#FFF]'>
                                Оформить заявку
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDocumentItem;
