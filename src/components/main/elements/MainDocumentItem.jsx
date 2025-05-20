
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { filterPrepositions } from '@/hook/filter';
import { PhotoView } from '@/assets/lib/react-photo-view';
import { useButton } from '@/hook/useButton';
import { useAnimation, motion } from "framer-motion";
import { useHeaderContext } from '@/components/contexts/HeaderContext';



const MainDocumentItem = ({ setPhoto, img, index, title, content, content1, price, duration, active, setActive }) => {
    const controls = useAnimation();

    const [listHidden, setListHidden] = useState(true);

    const { setButtonRef, setWrapperRef } = useButton()

    const wrapperRef = useRef(null);
    const photoRef = useRef(null);

    const containerPhotoRef = useRef(null);
    const LinkServiceRef = useRef(null);
    const smallPhotoRef = useRef(null);
    const [photoWidth, setPhotoWidth] = useState(0);


    useEffect(() => {
        const container = containerPhotoRef.current

        if (!container) return

        const width = container.offsetHeight / img.height * img.width

        setPhotoWidth(width >= 190 ? width : 190)


    }, [containerPhotoRef.current])






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



    const isInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    const scrollToElement = (el) => {

        const documents_box = document.getElementById('documents_box')
        if (!documents_box || !el) return

        if (index === 0) {
            documents_box.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } else if (index === 17) {
            documents_box.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }


    };



    // Применение анимации в useEffect:
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

            const el = wrapperRef.current;
            if (!el) return;

            if (!isInViewport(el)) {

                setTimeout(() => {
                    scrollToElement(el);
                }, 200)

            }
        }
    }, [active]);


    const { openDefaultModal } = useHeaderContext();




    return (
        <div className={`wrapper document-wrapper-border group/wrapper relative`}
            ref={wrapperRef}
        >
            <div className={`absolute top-[-1px] bottom-[-1px] border-group right-[16px] left-[16px] ${!active && ' group-hover/wrapper:!border-[transparent]'}`}
                style={{
                    borderTopColor: (active) ? 'transparent' : '#93969D',
                    borderBottomColor: (active) ? 'transparent' : '#93969D'
                }}
            >
            </div>

            <div
                className={`mx-[-30px]  flex flex-col  group/main cursor-pointer ${!active && 'hover:bg-[#34446D33] hover:backdrop-blur-[1px]'} rounded-[6px] relative`}>
                <div className={`pointer-events-none absolute top-0 bottom-0 right-0 left-0 z-[1] rounded-[6px] ${!active ? 'group-hover/main:border-[#34446D]' : '!border-[#34446D]'} border-solid border border-[transparent]`}></div>



                <div
                    onClick={(event) => {
                        if (photoRef.current?.contains(event.target)) return;
                        if (LinkServiceRef.current?.contains(event.target) && active) return;
                        setActive(!active);



                    }}
                    className={`materialBtn rounded-[6px] overflow-hidden text-left group/window box-scale active:shadow-[2px_2px_4px_0px_#000000CC_inset,-2px_-2px_4px_0px_#000000CC_inset] transition-scale ${!active ? '' : ' bg-[#34446D]  '} active:bg-[#5B6788]  px-[30px]  relative w-full  z-[0]`}>

                    <div className={`border-[transparent] border-solid border ${active && '!border-[#000]'} absolute top-[-1px] bottom-[-1px] right-[0] z-[1000] rounded-[6px] left-[0] transition-all duration-300`}></div>

                    <div
                        className={` ${active && ' translate-y-[100%]'} transition-all duration-100   z-[2] absolute top-1/2 -translate-y-1/2 left-[30px]`}>

                        <Image
                            className='border-[0.2px] solid border-[#A4A4A4] rounded-[5px]'
                            ref={smallPhotoRef}
                            alt='document' src={img}
                            width="43"
                            height="60"
                        />

                    </div>

                    <div
                        style={{
                            textRendering: 'geometricPrecision'
                        }}
                        className={`w-full  relative z-[2] container-scale  transition-scale backface-hidden gap-[10px] flex items-center justify-between py-[15px] s:py-[23px] ${active ? 'text-[#FFF] ' : 'text-[#000]'} group-active/window:text-[#FFF]    relative`}

                    >

                        <p className="translate-y-[-1px] transition-all duration-200 leading-[11px] will-change-transform w-[60%] pl-[63px]  text-[16px] s:text-[18px] m:text-[20px]  font-bold tracking-normal">


                            {title}

                        </p>
                        <div className="will-change-transform *:will-change-transform w-[40%] grid grid-cols-[1fr_1fr_auto] items-center justify-between">
                            <p className="translate-y-[-1px] text-[16px] s:text-[18px] m:text-[20px] transition-all duration-200 font-bold tracking-normal">{duration}</p>
                            <p className="translate-y-[-1px] text-[16px] s:text-[18px] m:text-[20px] transition-all duration-200 font-bold tracking-normal">{price}</p>
                            <button>
                                <svg
                                    className={`${!active && 'rotate-[180deg]'} group-active/window:*:transition-all group-active/window:*:duration-200 group-active/window:*:stroke-[#FFF] ${active ? '' : 'group-active/window:*:stroke-[#000]'} transition-all duration-300`}
                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 19L5 5" stroke={`${active ? 'white' : 'black'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 13L5 5L13 5" stroke={`${active ? 'white' : 'black'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </button>
                        </div>

                    </div>
                </div>

                <div className={`${active && 'bg-[#FFFFFF26] backdrop-blur-[1px]'}`}>

                    <div className={`transition-all easy-in duration-200 overflow-hidden max-h-0   ${active && '!max-h-[1400px] '}`}
                    >
                        <div className="s:p-[30px] p-[15px] document-item  flex flex-col l:flex-row gap-[10px] ">
                            <div className="w-[60%] s:gap-0 gap-[20px] flex flex-col m:flex-row m:items-stretch">
                                <div className='m:m-0 m-auto'>

                                    <PhotoView
                                        src={img.src}
                                        width={475}
                                        height={667}
                                    >
                                        <div ref={photoRef}
                                            onClick={() => setPhoto()}
                                            className={`${!active && 'pointer-events-none'} transition-all duration-200 `}>
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={controls}
                                                className="!shadow-none border-[0.2px] solid border-[#A4A4A4] overflow-hidden rounded-[5px]">
                                                <Image
                                                    alt='document' src={img}
                                                    width={photoWidth || 190}
                                                    height={photoWidth / img.width * img.height || 267}
                                                    className={`transition-all duration-200 h-auto`} />
                                            </ motion.div>

                                        </div>
                                    </PhotoView>
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

                                        <motion.div
                                            animate={controls}
                                            initial={{ y: 20, opacity: 0 }}
                                            className="tariff-wrap w-[250px] " ref={setWrapperRef}>
                                            <button

                                                ref={setButtonRef}
                                                className='btnIconAn doc-btn tariff text-[20px] group hover:bg-[#34446D] hover:text-[#FFF] font-bold tracking-normal m:flex items-center gap-[10px] text-[#34446D] rounded-[4px] border-[#34446D] border border-solid leading-[1]'>
                                                <div className="justify-between w-full m:flex items-center px-[16px] py-[9px] relative overflow-hidden">
                                                    <div className="sendIconLeft transition-all ease-in">
                                                        <svg className=' group-hover:*:fill-[#FFF] *:transition-all *:duration-300' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.2857 8.875V1H9.25C8.5396 1 7.85829 1.27656 7.35596 1.76884C6.85363 2.26113 6.57143 2.92881 6.57143 3.625V16.75H16.3929C17.1033 16.75 17.7846 17.0266 18.2869 17.5188C18.7892 18.0111 19.0714 18.6788 19.0714 19.375C19.0714 20.0712 18.7892 20.7389 18.2869 21.2312C17.7846 21.7234 17.1033 22 16.3929 22H6.57143V26.375C6.57143 27.0712 6.85363 27.7389 7.35596 28.2312C7.85829 28.7234 8.5396 29 9.25 29H25.3214C26.0318 29 26.7131 28.7234 27.2155 28.2312C27.7178 27.7389 28 27.0712 28 26.375V11.5H19.9643C19.2539 11.5 18.5726 11.2234 18.0702 10.7312C17.5679 10.2389 17.2857 9.57119 17.2857 8.875ZM10.1429 14.125C10.1429 13.8929 10.2369 13.6704 10.4044 13.5063C10.5718 13.3422 10.7989 13.25 11.0357 13.25H23.5357C23.7725 13.25 23.9996 13.3422 24.1671 13.5063C24.3345 13.6704 24.4286 13.8929 24.4286 14.125C24.4286 14.3571 24.3345 14.5796 24.1671 14.7437C23.9996 14.9078 23.7725 15 23.5357 15H11.0357C10.7989 15 10.5718 14.9078 10.4044 14.7437C10.2369 14.5796 10.1429 14.3571 10.1429 14.125ZM10.1429 24.625C10.1429 24.3929 10.2369 24.1704 10.4044 24.0063C10.5718 23.8422 10.7989 23.75 11.0357 23.75H23.5357C23.7725 23.75 23.9996 23.8422 24.1671 24.0063C24.3345 24.1704 24.4286 24.3929 24.4286 24.625C24.4286 24.8571 24.3345 25.0796 24.1671 25.2437C23.9996 25.4078 23.7725 25.5 23.5357 25.5H11.0357C10.7989 25.5 10.5718 25.4078 10.4044 25.2437C10.2369 25.0796 10.1429 24.8571 10.1429 24.625ZM19.0714 8.875V1.4375L27.5536 9.75H19.9643C19.7275 9.75 19.5004 9.65781 19.3329 9.49372C19.1655 9.32962 19.0714 9.10706 19.0714 8.875ZM3.89286 18.5C3.65606 18.5 3.42896 18.5922 3.26151 18.7563C3.09407 18.9204 3 19.1429 3 19.375C3 19.6071 3.09407 19.8296 3.26151 19.9937C3.42896 20.1578 3.65606 20.25 3.89286 20.25H16.3929C16.6297 20.25 16.8568 20.1578 17.0242 19.9937C17.1916 19.8296 17.2857 19.6071 17.2857 19.375C17.2857 19.1429 17.1916 18.9204 17.0242 18.7563C16.8568 18.5922 16.6297 18.5 16.3929 18.5H3.89286Z" fill="#34446D" />
                                                        </svg>
                                                    </div>
                                                    <span
                                                        className="transition-all ease-in"
                                                    >Перейти в услугу</span>
                                                    <div className="sendIconRight transition-all ease-in">
                                                        <svg className=' group-hover:*:fill-[#FFF] *:transition-all *:duration-300' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.2857 8.875V1H9.25C8.5396 1 7.85829 1.27656 7.35596 1.76884C6.85363 2.26113 6.57143 2.92881 6.57143 3.625V16.75H16.3929C17.1033 16.75 17.7846 17.0266 18.2869 17.5188C18.7892 18.0111 19.0714 18.6788 19.0714 19.375C19.0714 20.0712 18.7892 20.7389 18.2869 21.2312C17.7846 21.7234 17.1033 22 16.3929 22H6.57143V26.375C6.57143 27.0712 6.85363 27.7389 7.35596 28.2312C7.85829 28.7234 8.5396 29 9.25 29H25.3214C26.0318 29 26.7131 28.7234 27.2155 28.2312C27.7178 27.7389 28 27.0712 28 26.375V11.5H19.9643C19.2539 11.5 18.5726 11.2234 18.0702 10.7312C17.5679 10.2389 17.2857 9.57119 17.2857 8.875ZM10.1429 14.125C10.1429 13.8929 10.2369 13.6704 10.4044 13.5063C10.5718 13.3422 10.7989 13.25 11.0357 13.25H23.5357C23.7725 13.25 23.9996 13.3422 24.1671 13.5063C24.3345 13.6704 24.4286 13.8929 24.4286 14.125C24.4286 14.3571 24.3345 14.5796 24.1671 14.7437C23.9996 14.9078 23.7725 15 23.5357 15H11.0357C10.7989 15 10.5718 14.9078 10.4044 14.7437C10.2369 14.5796 10.1429 14.3571 10.1429 14.125ZM10.1429 24.625C10.1429 24.3929 10.2369 24.1704 10.4044 24.0063C10.5718 23.8422 10.7989 23.75 11.0357 23.75H23.5357C23.7725 23.75 23.9996 23.8422 24.1671 24.0063C24.3345 24.1704 24.4286 24.3929 24.4286 24.625C24.4286 24.8571 24.3345 25.0796 24.1671 25.2437C23.9996 25.4078 23.7725 25.5 23.5357 25.5H11.0357C10.7989 25.5 10.5718 25.4078 10.4044 25.2437C10.2369 25.0796 10.1429 24.8571 10.1429 24.625ZM19.0714 8.875V1.4375L27.5536 9.75H19.9643C19.7275 9.75 19.5004 9.65781 19.3329 9.49372C19.1655 9.32962 19.0714 9.10706 19.0714 8.875ZM3.89286 18.5C3.65606 18.5 3.42896 18.5922 3.26151 18.7563C3.09407 18.9204 3 19.1429 3 19.375C3 19.6071 3.09407 19.8296 3.26151 19.9937C3.42896 20.1578 3.65606 20.25 3.89286 20.25H16.3929C16.6297 20.25 16.8568 20.1578 17.0242 19.9937C17.1916 19.8296 17.2857 19.6071 17.2857 19.375C17.2857 19.1429 17.1916 18.9204 17.0242 18.7563C16.8568 18.5922 16.6297 18.5 16.3929 18.5H3.89286Z" fill="#34446D" />
                                                        </svg>
                                                    </div>
                                                </div>



                                            </button>
                                        </motion.div>

                                    </div>
                                </div>
                            </div>

                            <div className="w-[40%] items-start flex gap-[20px] flex-col   text-[#000]">

                                <div className="flex gap-[10px] flex-col grow  m:max-w-[500px]">
                                    {
                                        content1.map((cont, contIndex) => (
                                            <div key={contIndex} className='flex gap-[10px] flex-col items-start'>
                                                <p className={`${contIndex === 0 ? 'text-[19px]' : 'text-[16px]'} font-bold`}>{filterPrepositions(cont.title)}</p>

                                                {cont.subtitle && <span>{cont.subtitle}</span>}

                                                <ul className=' list-disc pl-[20px] flex flex-col gap-[6px]'>

                                                    {
                                                        cont.list.map((list, index) => (
                                                            <li className={`${listHidden && (index > 2 || contIndex > 0) && 'hidden'}`} key={index}>{filterPrepositions(list)}</li>
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

                                <motion.div
                                    animate={controls}
                                    initial={{ y: 20, opacity: 0 }}
                                    className="tariff-wrap w-[250px]" ref={setWrapperRef}>
                                    <button
                                        onClick={() => { openDefaultModal('orderForm') }}
                                        ref={setButtonRef} className='btnIconAn doc-btn  border-[#34446D] border border-solid tariff text-[20px] transition-all duration-300 font-bold tracking-normal  gap-[6px]  text-[#34446D] hover:text-[#FFF] rounded-[4px]  group hover:bg-[#34446D]  leading-[1]'>
                                        <div className="justify-center m:flex items-center px-[16px] py-[9px] relative overflow-hidden">
                                            <div className="sendIconLeft transition-all ease-in">
                                                <svg className='group-hover:*:fill-[#FFF] rotate-[45deg] *:transition-all *:duration-300' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M29.0627 0.9375L0.930664 12.1875L11.426 16.9336L26.2502 3.75L13.0666 18.5742L17.8127 29.0625L29.0627 0.9375Z" fill="#34446D" />
                                                </svg>
                                            </div>
                                            <span
                                                className="transition-all ease-in"
                                            >Оформить заявку</span>
                                            <div className="sendIconRight transition-all ease-in">
                                                <svg className='group-hover:*:fill-[#FFF] rotate-[45deg] *:transition-all *:duration-300' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M29.0627 0.9375L0.930664 12.1875L11.426 16.9336L26.2502 3.75L13.0666 18.5742L17.8127 29.0625L29.0627 0.9375Z" fill="#34446D" />
                                                </svg>
                                            </div>
                                        </div>

                                    </button>
                                </motion.div>




                            </div>


                            <div className="tariff-wrap m:hidden" ref={setWrapperRef}>
                                <button ref={setButtonRef} className='tariff justify-center  py-[18px] text-[20px] font-bold rounded-[4px] bg-[#000000] leading-[1] text-[#FFF]'>
                                    Оформить заявку
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div >
    );
};

export default MainDocumentItem;
