
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import { filterPrepositions } from '@/hook/filter';
import { PhotoView } from 'react-photo-view';
import { useDropEffect } from '@/hook/useDrop';
import { useButton } from '@/hook/useButton';

interface content {
    text: string,
    text1?: string
}

interface content1 {
    title: string
    subtitle?: string
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
}

interface pulse {
    width: string;
    height: string;
    top: string;
    left: string;
}

const MainDocumentItem = ({ img, title, content, content1, price, duration, active, setActive, borderb, bordert, setHover }: props) => {

    const [listHidden, setListHidden] = useState(true);

    // const { buttonRef, handleMouseDown } = useDropEffect()
    const { setButtonRef, setWrapperRef } = useButton()

    const photoRef = useRef<HTMLDivElement | null>(null);
    const containerPhotoRef = useRef<HTMLDivElement | null>(null);
    const LinkServiceRef = useRef<HTMLAnchorElement | null>(null);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [photoWidth, setPhotoWidth] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [mouseLeaveDelay, setMouseLeaveDelay] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const container = containerPhotoRef.current

        if (!container) return

        const width = container.offsetHeight / img.height * img.width

        setPhotoWidth(width >= 190 ? width : 190)


    }, [containerPhotoRef.current])

    useEffect(() => {
        const card = photoRef.current;
        if (card && photoWidth) {
            setDimensions({
                width: photoWidth,
                height: photoWidth / img.width * img.height
            });


        }
    }, [photoRef.current, photoWidth]);




    const mousePX = mouseX / dimensions.width;
    const mousePY = mouseY / dimensions.height;

    const cardStyle = {
        transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg) scale(1.1)`,
        perspective: '1200px',
        transition: 'all 0.3s ease-out'
    };

    const handleMouseMove = (e: React.MouseEvent) => {

        const card = photoRef.current;
        if (card) {
            const rect = card.getBoundingClientRect();
            setMouseX(e.clientX - rect.left - dimensions.width / 2);
            setMouseY(e.clientY - rect.top - dimensions.height / 2);
        }
    };

    const handleMouseEnter = () => {

        if (mouseLeaveDelay) {
            clearTimeout(mouseLeaveDelay);
        }
    };

    const handleMouseLeave = () => {

        setMouseLeaveDelay(setTimeout(() => {
            setMouseX(0);
            setMouseY(0);
        }, 1000));
    };

    // useEffect(() => {
    //     if (!buttonRef.current) return
    //     if (!active) {
    //         const drop = buttonRef.current.querySelector('.drop.animate')
    //         const drop_reverse = buttonRef.current.querySelector('.drop-reverse.animate')
    //         if (drop && !drop_reverse) {
    //             drop.classList.remove('animate')
    //             // handleMouseDown(!active)
    //         }

    //         setListHidden(true)
    //     } else {
    //         setTimeout(() => {
    //             if (!buttonRef.current) return
    //             const drop = buttonRef.current.querySelector('.drop.animate')

    //             if (!drop) {


    //                 handleMouseDown(!active)

    //             }
    //         }, 100)
    //     }


    // }, [active])




    return (
        <div className="wrapper document-wrapper-border ">
            <div
                onMouseEnter={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}
                className={` overflow-hidden transition-all duration-300 cursor-pointer ${!active ? 'hover:border-[#34446D]' : '!border-[#34446D]'} border-solid border border-[transparent] hover:bg-[#FFF] rounded-[4px]`}>
                <div className="  flex flex-col">
                    <div className="relative ">

                        <button
                            onClick={(event) => {
                                if (photoRef.current?.contains(event.target as Node)) return;
                                if (LinkServiceRef.current?.contains(event.target as Node) && active) return;
                                setActive(!active);


                            }}
                            className={`materialBtn text-left group active:shadow-[inset_2px_2px_2px_#071a2680,_inset_-2px_-2px_2px_#071a2680] ${!active ? 'hover:bg-[#FFF] active:bg-[#34446D]' : 'active:bg-[#FFF] bg-[#34446D]'}  px-[20px]  relative w-full transition-all duration-300 z-[0]`}>
                            <PhotoView src={img.src}>
                                <div ref={photoRef}
                                    style={{
                                        transform: `perspective(800px) translateY(${active ? '60px' : '-50%'})`,
                                    }}
                                    className={`${!active && 'pointer-events-none'}  card-wrap transition-all duration-300 absolute z-[100] top-1/2 left-[20px]`}>
                                    <div
                                        onMouseMove={handleMouseMove}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        style={active && (mouseX || mouseY) ? cardStyle : {}}
                                        className=" card transition-all duration-300">
                                        <Image

                                            alt='document' src={img}
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            style={{
                                                width: (photoWidth || 190) + 'px'
                                            }}
                                            className={`card transition-all duration-300 ${!active && ' !w-[43px] group-active:scale-[.95]'} h-auto`} />
                                    </div>




                                </div>
                            </PhotoView>
                            <div

                                className="w-full group/wrapper relative z-[2] group-active:scale-[.95] transition-all duration-300">

                                <div

                                    className={`border-group gap-[10px]  flex items-center justify-between py-[15px] s:py-[23px] ${active ? 'text-[#FFF] group-active:text-[#000]' : 'group-active:text-[#FFF]'}  text-[#000] transition-all duration-300 relative ${!active && ' group-hover/wrapper:!border-[transparent] hover:text-[#34446D]'}`}
                                    style={{
                                        borderTopColor: !bordert ? 'transparent' : '#00000033',
                                        borderBottomColor: (!borderb || active) ? 'transparent' : '#00000033'
                                    }}
                                >

                                    <p
                                        
                                        className="leading-[11px] w-[60%] pl-[63px]  text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">
                                           
                                           
                                                <a ref={LinkServiceRef} className={`${!active && 'pointer-events-none'}`} href='#'>{title}</a>
                                        
                                        </p>
                                    <div className="w-[40%] grid grid-cols-[1fr_1fr_auto] items-center justify-between">
                                        <p className="text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">{duration}</p>
                                        <p className="text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">{price}</p>
                                        <button>
                                            <svg
                                                className={`${!active && 'rotate-[180deg]'} ${active ? 'group-active:*:stroke-[#000]' : 'group-active:*:stroke-[#FFF]'} transition-all duration-700`}
                                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 19L5 5" stroke={`${active ? 'white' : 'black'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5 13L5 5L13 5" stroke={`${active ? 'white' : 'black'}`} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                        </button>
                                    </div>

                                </div>
                            </div>
                        </button>
                    </div>
                    <div className={`${active && 'bg-[#FFF]'}`}>

                        <div className={`transition-all easy-in duration-300 overflow-hidden max-h-0  ${active && '!duration-700 !max-h-[1400px] '}`}
                        >
                            <div className="s:py-[23px] py-[15px]  flex flex-col l:flex-row gap-[10px] ">
                                <div className="w-[60%] s:gap-0 gap-[20px] flex flex-col m:flex-row m:items-stretch">
                                    <div className='m:m-0 m-auto pointer-events-none'>
                                        <div
                                            className=' pointer-events-none'
                                            style={{
                                                width: (photoWidth || 190) + 'px',
                                                height: ((photoWidth || 190) / img.width * img.height) + 'px'
                                            }}
                                        ></div>
                                    </div>

                                    <div ref={containerPhotoRef} className="grow flex justify-center">
                                        <div className=" flex flex-col justify-between  items-start">
                                            <div className="flex flex-col gap-[40px]">
                                                <p className='text-[16px] text-[#000000] m:max-w-[360px]'>
                                                    {filterPrepositions(content.text)}
                                                </p>
                                                <p className='text-[16px] text-[#000000] m:max-w-[300px]'>
                                                    {content.text1 && filterPrepositions(content.text1)}
                                                </p>
                                            </div>
                                            <div className="tariff-wrap w-[250px]" ref={setWrapperRef}>
                                                <button ref={setButtonRef} id="open-tariff" className=' tariff text-[20px] transition-all duration-300 font-bold tracking-normal m:flex items-center gap-[8px] hidden px-[16px] py-[9px] text-[#34446D] hover:text-[#FFF] rounded-[4px] bg-[#2D2F2F1A] border-[#34446D] group hover:bg-[#34446D] border border-solid leading-[1]'>
                                                    <span>Оформить заявку</span>
                                                    <svg className='group-hover:*:fill-[#FFF] *:transition-all *:duration-300' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M29.0627 0.9375L0.930664 12.1875L11.426 16.9336L26.2502 3.75L13.0666 18.5742L17.8127 29.0625L29.0627 0.9375Z" fill="#34446D" />
                                                    </svg>

                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[40%] items-start flex gap-[20px] flex-col   text-[#000]">

                                    <div className="flex gap-[10px] flex-col grow  m:max-w-[500px]">
                                        {
                                            content1.map((cont, contIndex) => (
                                                <div key={contIndex} className='flex gap-[10px] flex-col items-start'>
                                                    <p className='text-[20px] font-bold'>{filterPrepositions(cont.title)}</p>

                                                    {cont.subtitle && <span>{cont.subtitle}</span>}

                                                    <ul className=' list-disc pl-[20px] flex flex-col gap-[6px]'>

                                                        {
                                                            cont.list.map((list, index) => (
                                                                <li className={`${listHidden && index > 3 && 'hidden'}`} key={index}>{filterPrepositions(list)}</li>
                                                            ))
                                                        }

                                                    </ul>


                                                    {
                                                        cont.list.length > 3 && <button
                                                            className='text-[#34446D] font-bold'
                                                            onClick={() => setListHidden(!listHidden)}
                                                        >{listHidden ? 'Показать полный список документов 🡣' : 'Скрыть 🡡'}</button>
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className="tariff-wrap w-[250px]" ref={setWrapperRef}>
                                        <button ref={setButtonRef} className='tariff text-[20px] group hover:bg-[#34446D] hover:text-[#FFF] font-bold tracking-normal m:flex items-center gap-[10px] hidden px-[16px] py-[12px] text-[#34446D] rounded-[4px] bg-[#2D2F2F1A] border-[#34446D] border border-solid leading-[1]'>
                                            <span>Перейти в услугу</span>
                                            <svg className=' group-hover:*:stroke-[#FFF] *:transition-all *:duration-300' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
