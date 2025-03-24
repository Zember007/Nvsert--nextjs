
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import { filterPrepositions } from '@/hook/filter';
import { PhotoView } from 'react-photo-view';
import { useDropEffect } from '@/hook/useDrop';

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
    price: string,
    duration: string,
    content: content,
    content1: content1[],
    active: boolean,
    setActive: (value: boolean) => void,
    setHover: (value: boolean) => void,
    bordert: boolean,
    borderb: boolean,
    index: number
}

interface pulse {
    width: string;
    height: string;
    top: string;
    left: string;
}

const MainDocumentItem = ({ index, img, title, content, content1, price, duration, active, setActive, borderb, bordert, setHover }: props) => {

    const [listHidden, setListHidden] = useState(true);

    const {buttonRef, handleMouseDown} = useDropEffect()

    const buttonRefs = useRef<HTMLButtonElement[]>([]);
    const wrapperRefs = useRef<HTMLDivElement[]>([]);
    const photoRef = useRef<HTMLDivElement | null>(null);
    const photoContainerRef = useRef<HTMLDivElement | null>(null);

    const setWrapperRef = (el: HTMLDivElement | null) => {
        if (!el) return
        wrapperRefs.current.push(el)
    }

    const setButtonRef = (el: HTMLButtonElement | null) => {
        if (!el) return
        buttonRefs.current.push(el)
    }

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [mouseLeaveDelay, setMouseLeaveDelay] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const card = photoRef.current;
        const container = photoContainerRef.current
        if (card) {
            setDimensions({
                width: card.offsetWidth,
                height: card.offsetHeight
            });

            if (container) {
                const rect = container.getBoundingClientRect();
                console.log(rect.left, rect.right);

                card.style.left = rect.left + 'px';
            }
        }
    }, [photoRef.current, photoContainerRef.current]);




    const mousePX = mouseX / dimensions.width;
    const mousePY = mouseY / dimensions.height;

    const cardStyle = {
        transform: `rotateY(${mousePX * 10}deg) rotateX(${mousePY * -10}deg)`,
        perspective: '1200px',
        transition: 'all 0.3s ease-out'
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        console.log('move');

        const card = photoRef.current;
        if (card) {
            const rect = card.getBoundingClientRect();
            setMouseX(e.clientX - rect.left - dimensions.width / 2);
            setMouseY(e.clientY - rect.top - dimensions.height / 2);
        }
    };

    const handleMouseEnter = () => {
        console.log('enter');

        if (mouseLeaveDelay) {
            clearTimeout(mouseLeaveDelay);
        }
    };

    const handleMouseLeave = () => {
        console.log('leave');

        setMouseLeaveDelay(setTimeout(() => {
            setMouseX(0);
            setMouseY(0);
        }, 1000));
    };

    useEffect(() => {
        const buttons = buttonRefs.current;
        const wrappers = wrapperRefs.current;

        if (!buttons.length || !wrappers.length) return;

        const handleMouseMove = (e: MouseEvent, element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const rotateX = (mouseY / rect.height) * 30 - 15;
            const rotateY = (mouseX / rect.width) * -30 + 15;
            element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        };

        const resetTransform = (element: HTMLElement) => {
            element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        };

        buttons.forEach((button, index) => {
            const wrapper = wrappers[index];
            if (!button || !wrapper) return;

            wrapper.addEventListener('mousemove', (e) => handleMouseMove(e, button));
            wrapper.addEventListener('mouseleave', () => resetTransform(button));
            button.addEventListener('focus', () => button.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(10px)');
            button.addEventListener('blur', () => resetTransform(button));
        });

        return () => {
            buttons.forEach((button, index) => {
                const wrapper = wrappers[index];
                if (!button || !wrapper) return;

                wrapper.removeEventListener('mousemove', (e) => handleMouseMove(e, button));
                wrapper.removeEventListener('mouseleave', () => resetTransform(button));
                button.removeEventListener('focus', () => button.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(10px)');
                button.removeEventListener('blur', () => resetTransform(button));
            });
        };
    }, []);

 


    return (
        <div
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            className={` document-wrapper-border overflow-hidden ${!active ? ' hover:shadow-[0px_2px_4px_0px_#00000040,_0px_-2px_4px_0px_#00000040] hover:bg-[#FFF]' : ''}  transition-all duration-300 cursor-pointer`}>
            <div className="  flex flex-col">
                <div className="relative">
                    <PhotoView src={img.src}>
                        <div ref={photoRef}
                            style={{
                                transform: `perspective(800px) translateY(${active ? '60px' : '-50%'})`,
                            }}
                            className={`${!active && 'pointer-events-none'} card-wrap transition-all duration-300 absolute z-[100] top-1/2 left-0`}>
                            <div
                                onMouseMove={handleMouseMove}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                style={active ? cardStyle : {}}
                                className="card transition-all duration-300">
                                <Image

                                    alt='document' src={img}
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    className={`card transition-all duration-300 w-[190px] ${!active && ' !w-[43px]'} h-auto`} />
                            </div>




                        </div>
                    </PhotoView>
                    <div
                        ref={buttonRef}
                        onMouseDown={(e) => {handleMouseDown(e)}}
                        onClick={(event) => {
                            if (photoRef.current?.contains(event.target as Node)) return;

                            setActive(!active);
                            
                            
                        }}
                        className={`materialBtn overflow-hidden relative w-full transition-all duration-300 `}>
                        <div

                            className="wrapper w-full group/wrapper">

                            <div
                                ref={photoContainerRef}
                                className={`border-group gap-[10px]  flex items-center justify-between py-[15px] s:py-[23px] ${active && 'text-[#FFF]'}  text-[#000] transition-all duration-300 relative ${!active && ' group-hover/wrapper:!border-[transparent] hover:text-[#34446D]'}`}
                                style={{
                                    borderTopColor: !bordert ? 'transparent' : '#00000033',
                                    borderBottomColor: (!borderb || active) ? 'transparent' : '#00000033'
                                }}
                            >

                                <p
                                    className="leading-[11px] w-[60%] pl-[63px]  text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">{title}</p>
                                <div className="w-[40%] grid grid-cols-[1fr_1fr_auto] items-center justify-between">
                                    <p className="text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">{duration}</p>
                                    <p className="text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">{price}</p>
                                    <button>
                                        <svg
                                            className={`${!active && 'rotate-[180deg]'} transition-all duration-700`}
                                            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 19L5 5" stroke={`${active ? 'white' : 'black'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M5 13L5 5L13 5" stroke={`${active ? 'white' : 'black'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${active && 'bg-[#FFF] shadow-[0px_2px_4px_0px_#00000040_inset,_0px_-2px_4px_0px_#00000040_inset]'}`}>
                    <div className="wrapper">
                        <div className={`transition-all easy-in duration-300 overflow-hidden max-h-0  ${active && '!duration-700 !max-h-[1200px] '}`}
                        >
                            <div className="s:py-[23px] py-[15px]  flex flex-col l:flex-row gap-[10px] ">
                                <div className="w-[60%] s:gap-0 gap-[20px] flex flex-col m:flex-row m:items-stretch">
                                    <div className='m:m-0 m-auto pointer-events-none'>
                                        <div
                                            className='w-[190px] pointer-events-none'
                                            style={{
                                                height: (190 / img.width * img.height) + 'px'
                                            }}
                                        ></div>
                                    </div>

                                    <div className="grow flex justify-center">
                                        <div className=" flex flex-col justify-between  items-start">
                                            <div className="flex flex-col gap-[40px]">
                                                <p className='text-[16px] text-[#000000] m:max-w-[360px]'>
                                                    {filterPrepositions(content.text)}
                                                </p>
                                                <p className='text-[16px] text-[#000000] m:max-w-[300px]'>
                                                    {content.text1 && filterPrepositions(content.text1)}
                                                </p>
                                            </div>
                                            <div className="tariff-wrap" ref={setWrapperRef}>
                                                <button ref={setButtonRef} id="open-tariff" className='tariff text-[20px]  font-bold tracking-normal m:flex items-center gap-[10px] hidden px-[16px] py-[9px] text-[#34446D] rounded-[4px] bg-[#2D2F2F1A] border-[#34446D] border border-solid leading-[1]'>
                                                    <span>Оформить заявку</span>
                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M29.0627 0.9375L0.930664 12.1875L11.426 16.9336L26.2502 3.75L13.0666 18.5742L17.8127 29.0625L29.0627 0.9375Z" fill="#34446D" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[40%] h-full items-start flex gap-[20px] flex-col   text-[#000]">

                                    <div className="flex gap-[10px] flex-col grow  m:max-w-[500px]">
                                        {
                                            content1.map((cont, contIndex) => (
                                                <div key={contIndex} className='flex gap-[10px] flex-col items-start'>
                                                    <p className='text-[20px] font-bold'>{filterPrepositions(cont.title)}</p>

                                                    <ul className=' list-disc pl-[20px] flex flex-col gap-[6px]'>

                                                        {
                                                            cont.list.map((list, index) => (
                                                                <li className={`${listHidden && index > 4 && 'hidden'}`} key={index}>{filterPrepositions(list)}</li>
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

                                    <div className="tariff-wrap" ref={setWrapperRef}>
                                        <button ref={setButtonRef} id="open-tariff" className='tariff text-[20px]  font-bold tracking-normal m:flex items-center gap-[10px] hidden px-[16px] py-[12px] text-[#34446D] rounded-[4px] bg-[#2D2F2F1A] border-[#34446D] border border-solid leading-[1]'>
                                            <span>Оформить заявку</span>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 12H21" stroke="#34446D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M16 7L21 12L16 17" stroke="#34446D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>


                                        </button>
                                    </div>


                                </div>


                                <div className="tariff-wrap m:hidden" ref={setWrapperRef}>
                                    <button ref={setButtonRef} id="open-tariff" className='tariff   py-[18px] text-[20px] font-bold rounded-[4px] bg-[#000000] leading-[1] text-[#FFF]'>
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
