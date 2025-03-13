import ArrowImg from '@/assets/images/svg/arrow-main.svg'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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

    const elementRef = useRef<HTMLButtonElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        const wrapper = wrapperRef.current;

        if (!element || !wrapper) return;

        // Начальный стиль
        element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        element.style.transition = 'transform 0.5s ease-out';

        const handleMouseMove = (e: any) => {
            const rect = element.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const rotateX = (mouseY / rect.height) * 30 - 15;
            const rotateY = (mouseX / rect.width) * -30 + 15;

            element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        };

        const handleMouseLeave = () => {
            element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        };

        const handleFocus = () => {
            if (element.matches(':focus-visible')) {
                if (element.classList.contains('tariff')) {
                    element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
                } else {
                    element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(10px)';
                }
            }
        };

        const handleBlur = () => {
            element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        };

        wrapper.addEventListener('mousemove', handleMouseMove);
        wrapper.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('focus', handleFocus);
        element.addEventListener('blur', handleBlur);

        return () => {
            wrapper.removeEventListener('mousemove', handleMouseMove);
            wrapper.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('focus', handleFocus);
            element.removeEventListener('blur', handleBlur);
        };
    }, []);

    const addMouseEffect = (elements: HTMLElement[]) => {
        const elementsArray = Array.from(elements);
        elementsArray.forEach((element) => {
            element.onmousemove = (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                element.style.setProperty('--mouse-x', `${x}px`);
                element.style.setProperty('--mouse-y', `${y}px`);
            };
        });
    };

    useEffect(() => {
        if (elementRef.current) {
            addMouseEffect([elementRef.current]);
        }
    }, []);

    return (
        <div
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            className={` ${!active && 'document-wrapper-border hover:shadow-[0px_2px_4px_0px_#00000040,_0px_-2px_4px_0px_#00000040] hover:bg-[#FFF]'}  transition-all duration-300 cursor-pointer`}>
            <div className="  flex flex-col">
                <div className="wrapper">
                    <div
                        onClick={(event) => {

                            setActive(!active);
                        }}
                        className={`border-group flex items-center border-0   border-solid border-[#00000033] ${!bordert && 'border-t-[transparent]'} border-t-[0.25px] ${(!borderb || active) && 'border-b-[transparent]'} border-b-[0.25px]  justify-between py-[15px] s:py-[23px] ${active && 'text-[#34446D]'} hover:text-[#34446D] text-[#000] transition-all duration-300 relative pl-[63px] ${!active && ' hover:border-[transparent] '}`}>



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
                <div className={`${active && 'bg-[#FFF] shadow-[0px_2px_4px_0px_#00000040,_0px_-2px_4px_0px_#00000040]'}`}>
                    <div className="wrapper">
                        <div className={`transition-all easy-in duration-500 overflow-hidden max-h-0  ${active && '!duration-700 !max-h-[1200px] '}`}>
                            <div className="s:py-[23px] py-[15px]  flex flex-col l:flex-row justify-between m:items-stretch gap-[10px] ">
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
                                        <div className="tariff-wrap" ref={wrapperRef}>
                                            <button ref={elementRef} id="open-tariff" className='tariff text-[20px]  font-bold tracking-normal m:block hidden px-[30px] py-[14px] text-[#34446D] rounded-[4px] bg-[#2D2F2F1A] border-[#34446D] border border-solid leading-[1]'>
                                                Оформить заявку
                                            </button>
                                        </div>
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


                                <div className="tariff-wrap" ref={wrapperRef}>
                                    <button ref={elementRef} id="open-tariff" className='tariff m:hidden  py-[18px] text-[20px] font-bold rounded-[4px] bg-[#000000] leading-[1] text-[#FFF]'>
                                        Оформить заявку
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDocumentItem;
