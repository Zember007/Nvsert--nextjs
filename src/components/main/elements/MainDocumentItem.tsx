
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import { filterPrepositions } from '@/hook/filter';
import { PhotoView } from 'react-photo-view';
import { useDropEffect } from '@/hook/useDrop';
import { useButton } from '@/hook/useButton';
import { BounceEffect } from '@/hook/useBounce';

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
    activePhoto: boolean,
    setActive: (value: boolean) => void,
    setHover: (value: boolean) => void,
    bordert: boolean,
    borderb: boolean,
    settings: any;
    setPhoto: () => void

}

interface pulse {
    width: string;
    height: string;
    top: string;
    left: string;
}

const MainDocumentItem = ({ activePhoto, setPhoto, img, settings, title, content, content1, price, duration, active, setActive, borderb, bordert, setHover }: props) => {

    const [listHidden, setListHidden] = useState(true);

    // const { buttonRef, handleMouseDown } = useDropEffect()
    const { setButtonRef, setWrapperRef } = useButton()

    const borderBounce = useRef<HTMLDivElement | null>(null);
    const photoRef = useRef<HTMLDivElement | null>(null);
    const bounceEl = useRef<HTMLDivElement[]>([]);
    const containerPhotoRef = useRef<HTMLDivElement | null>(null);
    const LinkServiceRef = useRef<HTMLAnchorElement | null>(null);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [photoWidth, setPhotoWidth] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [mouseLeaveDelay, setMouseLeaveDelay] = useState<NodeJS.Timeout | null>(null);

    const setBounceEl = (el: HTMLDivElement) => {
        bounceEl.current.push(el)
    }

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
        transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
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
    //     if (!active) return

    //     if (borderBounce.current) {
    //         borderBounce.current.style.setProperty('--duration', `${settings.duration}ms`)
    //         borderBounce.current.style.setProperty('--length', settings.length)
    //         borderBounce.current.classList.remove('border-bounce')
    //     }
    //     setTimeout(() => {
    //         if (!bounceEl.current.length || !borderBounce.current) return
    //         borderBounce.current.classList.add('border-bounce')
    //         bounceEl.current.forEach((el) => {
    //             BounceEffect(el, {
    //                 startPosition: "0",
    //                 endPosition: `-${settings.length}px`,
    //                 duration: settings.duration,
    //                 easing: "ease-in",
    //                 direction: 'vertical'
    //             });
    //         })
    //     }, settings.timeout)

    // }, [active])






    return (
        <div className={`wrapper document-wrapper-border group/wrapper relative`}

        >
            <div className={`absolute top-[-1px] bottom-[-1px] border-group transition-all duration-300 right-[16px] left-[16px] ${!active && ' group-hover/wrapper:!border-[transparent]'}`}
                style={{
                    borderTopColor: (!bordert || active) ? 'transparent' : '#00000033',
                    borderBottomColor: (!borderb || active) ? 'transparent' : '#00000033'
                }}
            >
            </div>

            <div
                ref={borderBounce}
                onMouseEnter={() => { setHover(true) }}
                onMouseLeave={() => { setHover(false) }}
                className={`mx-[-30px] overflow-hidden transition-all duration-300 group/main cursor-pointer  hover:bg-[#FFF] rounded-[4px] relative`}>
                <div className={`transition-all duration-300 pointer-events-none absolute top-0 bottom-0 right-0 left-0 z-[10] rounded-[4px] ${!active ? 'group-hover/main:border-[#34446D]' : '!border-[#34446D]'} border-solid border border-[transparent]`}></div>
                <div className="  flex flex-col">
                    <div className="relative ">

                        <div
                            onMouseDown={(event: any) => {
                                if (photoRef.current?.contains(event.target as Node)) return;
                                if (LinkServiceRef.current?.contains(event.target as Node) && active) return;
                                setActive(!active);


                            }}
                            className={`materialBtn text-left group/window active:shadow-[inset_2px_2px_2px_#071a2680,_inset_-2px_-2px_2px_#071a2680] ${!active ? 'hover:bg-[#FFF]  active:bg-[#FFF]' : ' bg-[#34446D] active:bg-[#34446D] '}   px-[30px]  relative w-full transition-all duration-300 z-[0]`}>
                            <PhotoView src={img.src}
                            >
                                <div ref={photoRef}
                                    onClick={() => setPhoto()}
                                    style={{
                                        transform: `perspective(800px) translateY(${active ? '60px' : '-50%'})`,
                                    }}
                                    className={`${!active && 'pointer-events-none'} ${activePhoto && '!opacity-0'} card-wrap transition-all duration-200 absolute z-[100] top-1/2 left-[30px]`}>
                                    <div
                                        ref={setBounceEl}
                                        onMouseMove={handleMouseMove}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        style={active && (mouseX || mouseY) ? cardStyle : {}}
                                        className="!shadow-none card border-[0.2px] solid border-[#A4A4A4] overflow-hidden rounded-[5px] transition-all duration-300">
                                        <Image

                                            alt='document' src={img}
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            style={{
                                                width: (photoWidth || 190) + 'px'
                                            }}
                                            className={`card transition-all duration-200 ${!active && ' !w-[43px] '} h-auto`} />
                                    </div>




                                </div>
                            </PhotoView>
                            <div
                        
                                className="w-full  relative z-[2]  transition-all duration-300">

                                <div
                                
                                    className={` gap-[10px] flex items-center justify-between py-[15px] s:py-[23px] ${active ? 'text-[#FFF] group-active/window:text-[#FFF]' : 'group-active/window:text-[#000]'}  text-[#000] transition-all duration-300 relative ${!active && ' hover:text-[#34446D]'}`}

                                >

                                    <p

                                        className="translate-y-[-1px] leading-[11px] w-[60%] pl-[63px] group-active/window:scale-[0.98] transition-all duration-300 will-change-transform text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">


                                        {title}

                                    </p>
                                    <div className="w-[40%] grid grid-cols-[1fr_1fr_auto] items-center justify-between">
                                        <p className="translate-y-[-1px] text-[16px] s:text-[18px] m:text-[20px] group-active/window:scale-[0.98] transition-all duration-300 will-change-transform font-bold tracking-normal">{duration}</p>
                                        <p className="translate-y-[-1px] text-[16px] s:text-[18px] m:text-[20px] group-active/window:scale-[0.98] transition-all duration-300 will-change-transform font-bold tracking-normal">{price}</p>
                                        <button>
                                            <svg
                                                className={`${!active && 'rotate-[180deg]'} ${active ? 'group-active/window:*:stroke-[#FFF]' : 'group-active/window:*:stroke-[#000]'} transition-all duration-700`}
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
                    <div className={`${active && 'bg-[#FFF]'}`}>

                        <div className={`transition-all easy-in duration-200 overflow-hidden max-h-0  ${active && '!max-h-[1400px] '}`}
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
                                            <div ref={setBounceEl} className="w-full">
                                                <div className="tariff-wrap w-[250px] " ref={setWrapperRef}>
                                                    <button ref={setButtonRef} className='tariff justify-center text-[20px] group hover:bg-[#34446D] hover:text-[#FFF] font-bold tracking-normal m:flex items-center gap-[10px] hidden px-[16px] py-[9px] text-[#34446D] rounded-[4px] border-[#34446D] border border-solid leading-[1]'>
                                                        <span>Перейти в услугу</span>
                                                        <svg className=' group-hover:*:fill-[#FFF] *:transition-all *:duration-300' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.2857 8.875V1H9.25C8.5396 1 7.85829 1.27656 7.35596 1.76884C6.85363 2.26113 6.57143 2.92881 6.57143 3.625V16.75H16.3929C17.1033 16.75 17.7846 17.0266 18.2869 17.5188C18.7892 18.0111 19.0714 18.6788 19.0714 19.375C19.0714 20.0712 18.7892 20.7389 18.2869 21.2312C17.7846 21.7234 17.1033 22 16.3929 22H6.57143V26.375C6.57143 27.0712 6.85363 27.7389 7.35596 28.2312C7.85829 28.7234 8.5396 29 9.25 29H25.3214C26.0318 29 26.7131 28.7234 27.2155 28.2312C27.7178 27.7389 28 27.0712 28 26.375V11.5H19.9643C19.2539 11.5 18.5726 11.2234 18.0702 10.7312C17.5679 10.2389 17.2857 9.57119 17.2857 8.875ZM10.1429 14.125C10.1429 13.8929 10.2369 13.6704 10.4044 13.5063C10.5718 13.3422 10.7989 13.25 11.0357 13.25H23.5357C23.7725 13.25 23.9996 13.3422 24.1671 13.5063C24.3345 13.6704 24.4286 13.8929 24.4286 14.125C24.4286 14.3571 24.3345 14.5796 24.1671 14.7437C23.9996 14.9078 23.7725 15 23.5357 15H11.0357C10.7989 15 10.5718 14.9078 10.4044 14.7437C10.2369 14.5796 10.1429 14.3571 10.1429 14.125ZM10.1429 24.625C10.1429 24.3929 10.2369 24.1704 10.4044 24.0063C10.5718 23.8422 10.7989 23.75 11.0357 23.75H23.5357C23.7725 23.75 23.9996 23.8422 24.1671 24.0063C24.3345 24.1704 24.4286 24.3929 24.4286 24.625C24.4286 24.8571 24.3345 25.0796 24.1671 25.2437C23.9996 25.4078 23.7725 25.5 23.5357 25.5H11.0357C10.7989 25.5 10.5718 25.4078 10.4044 25.2437C10.2369 25.0796 10.1429 24.8571 10.1429 24.625ZM19.0714 8.875V1.4375L27.5536 9.75H19.9643C19.7275 9.75 19.5004 9.65781 19.3329 9.49372C19.1655 9.32962 19.0714 9.10706 19.0714 8.875ZM3.89286 18.5C3.65606 18.5 3.42896 18.5922 3.26151 18.7563C3.09407 18.9204 3 19.1429 3 19.375C3 19.6071 3.09407 19.8296 3.26151 19.9937C3.42896 20.1578 3.65606 20.25 3.89286 20.25H16.3929C16.6297 20.25 16.8568 20.1578 17.0242 19.9937C17.1916 19.8296 17.2857 19.6071 17.2857 19.375C17.2857 19.1429 17.1916 18.9204 17.0242 18.7563C16.8568 18.5922 16.6297 18.5 16.3929 18.5H3.89286Z" fill="#34446D" />
                                                        </svg>



                                                    </button>
                                                </div>
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
                                    <div ref={setBounceEl} className="w-full">
                                        <div className="tariff-wrap w-[250px]" ref={setWrapperRef}>
                                            <button ref={setButtonRef} className='justify-center border-[#34446D] border border-solid tariff text-[20px] transition-all duration-300 font-bold tracking-normal m:flex items-center gap-[6px] px-[16px] py-[9px] text-[#34446D] hover:text-[#FFF] rounded-[4px]  group hover:bg-[#34446D]  leading-[1]'>
                                                <span>Оформить заявку</span>
                                                <svg className='group-hover:*:fill-[#FFF] *:transition-all *:duration-300' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M29.0627 0.9375L0.930664 12.1875L11.426 16.9336L26.2502 3.75L13.0666 18.5742L17.8127 29.0625L29.0627 0.9375Z" fill="#34446D" />
                                                </svg>

                                            </button>
                                        </div>
                                    </div>



                                </div>


                                <div className="tariff-wrap m:hidden" ref={setWrapperRef}>
                                    <button ref={setButtonRef} id="open-tariff" className='tariff justify-center  py-[18px] text-[20px] font-bold rounded-[4px] bg-[#000000] leading-[1] text-[#FFF]'>
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
