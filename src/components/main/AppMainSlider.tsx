import '@/assets/styles/sections/main/main-slider.scss'
import { initSlider } from '@/scripts/slider'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { slides } from './utils';
import { filterPrepositions } from '@/hook/filter';
import HorizontalSlide from './elements/HorisontalSlide'

import { useButton } from '@/hook/useButton';
import { useHeaderContext } from '../contexts/HeaderContext';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hook/useIntersectionObserver';
import useWindowWidth from '@/hook/useWindowWidth';


interface slideItem {
    title: string;
    text: string;
}

const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)"
};



const SliderMain = () => {
    const { ref, isVisible } = useIntersectionObserver();
    const widthWindow = useWindowWidth();
    const [activeIndex, setActive] = useState<number>(0)
    const whiteBgRef = useRef<HTMLDivElement | null>(null)
    const sliders = useRef<HTMLDivElement[]>([])
    const timeLine = useRef<any>(null)

    useEffect(() => {
        if (!whiteBgRef.current || !isVisible || !ref.current) return

        if (widthWindow >= 1240) {
            let timeoutIdBg: NodeJS.Timeout | null = null;



            timeLine.current = initSlider({
                onChangeFunction: (index: number) => {

                    setActive(index)

                    if (!sliders.current[0].classList.contains('animate')) {
                        sliders.current.forEach(el => {
                            el.classList.add('animate')
                        });

                        setTimeout(() => {
                            sliders.current.forEach(el => {
                                el.classList.remove('animate')
                            });
                        }, 400)
                    }

                },
                onDragFunction: () => {

                    whiteBgRef.current?.classList.remove('white')
                    if (timeoutIdBg) {
                        clearTimeout(timeoutIdBg)
                    }

                    timeoutIdBg = setTimeout(() => {
                        whiteBgRef.current?.classList.add('white')
                    }, 300)
                },
                mobile: false

            })
        } else {

            whiteBgRef.current?.classList.remove('white')


            if (timeLine.current) timeLine.current.kill()

            timeLine.current = initSlider({
                onChangeFunction: (index: number) => {

                    setActive(index)

                    if (!sliders.current[0].classList.contains('animate')) {
                        sliders.current.forEach(el => {
                            el.classList.add('animate')
                        });

                        setTimeout(() => {
                            sliders.current.forEach(el => {
                                el.classList.remove('animate')
                            });
                        }, 400)
                    }

                },
                onDragFunction: null,
                mobile: true
            })
        }


        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (timeLine.current) timeLine.current.next({ ease: "power3", duration: 0.725 })

                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }


        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }

        };
    }, [whiteBgRef, ref, isVisible, widthWindow])



    const { setButtonRef, setWrapperRef } = useButton()

    const { openDefaultModal } = useHeaderContext();

    const { t } = useTranslation()


    const slidesLang = t('MainSlider.items', { returnObjects: true }) as slideItem[]



    return (
        <>
            <section ref={ref} className='py-[75px] text-[#000] relative'>
                <div className="wrapper flex flex-col gap-[40px]">

                    <h2 className='leading-[1] tracking-[-0.04em] text-center text-[24px] xs:text-[40px] xl:text-[56px]'>Помогаем с документами по отраслям</h2>
                    <div className="cloneable xl:flex-row flex-col xl:gap-0 gap-[30px] xl:pt-0 pt-[240px]">

                        <div className={`overlay xl:w-[642px] xl:h-[447px] h-[630px] w-full p-[30px] pr-[76px] relative z-[0]  rounded-[8px] border border-solid border-[#34446D] overflow-hidden `}>
                            <div className={`overlay-slider absolute top-0 right-[76px] left-0 bottom-0 z-[-2] transition-all duration-300 `}></div>
                            <div className="flex flex-col justify-between h-full xl:items-start items-center w-full">
                                <div className=" grow relative w-full overflow-hidden">
                                    <div className="absolute z-[-1] h-[50px] bg-[#d6dae2] rounded-[4px]  w-full border-[#34446D] border-solid border">
                                    </div>
                                    <div className={`absolute wrapper-slide top-0  w-full h-full pointer-events-none`}>
                                        <div
                                            ref={(el) => {
                                                if (!el) return
                                                sliders.current.push(el)
                                            }}
                                            className="slider flex">
                                            <div className='w-full'>
                                                <div className="flex flex-col xl:gap-[15px] gap-[30px]  w-full">
                                                    <span className="text-[24px] font-bold text-[#000000] block  h-[50px] relative text-center py-[10px] w-full  border border-solid border-[transparent] relative z-[10]">
                                                        {
                                                            filterPrepositions(slidesLang[activeIndex].title)
                                                        }
                                                    </span>
                                                    <p className={`xl:grow slide-text relative w-full h-full text-[16px] bg-[#FFF] `}>

                                                        {filterPrepositions(slidesLang[activeIndex].text)}

                                                    </p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className="flex justify-between items-end w-full relative z-[10]">
                                    <div className="flex gap-[10px]">
                                        <div
                                            ref={setWrapperRef}
                                            className="tariff-wrap w-[100px]">
                                            <button
                                                ref={setButtonRef}
                                                aria-label="previous slide" data-slider="button-prev"
                                                className="tariff hover:bg-[#34446D] group h-[50px] rounded-[4px] border-[#34446D] border border-solid flex items-center justify-center">

                                                <svg className='group-hover:*:*:fill-[#FFF] *:*:transition-all *:*:duration-300' xmlns="http://www.w3.org/2000/svg" width="46" height="38" viewBox="0 0 46 38" fill="none">
                                                    <path d="M24.4482 34.9009H28.7887" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                                    <path d="M24.4482 3.02588L28.7887 3.02588" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                                    <g filter="url(#filter0_d_1459_643)">
                                                        <path d="M30.1421 2H23.8391L10.1421 18.962L23.8391 35.9239H30.1421L16.4451 18.962L30.1421 2Z" fill="#34446D" />
                                                    </g>
                                                    <defs>
                                                        <filter id="filter0_d_1459_643" x="7" y="0" width="27" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 5 0" result="hardAlpha" />
                                                            <feOffset dx="1" dy="0" />
                                                            <feGaussianBlur stdDeviation="0.723404" />
                                                            <feComposite in2="hardAlpha" operator="out" />
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1459_613" />
                                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1459_613" result="shape" />
                                                        </filter>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </div>
                                        <div
                                            ref={setWrapperRef}
                                            className="tariff-wrap w-[100px]">
                                            <button
                                                ref={setButtonRef}
                                                aria-label="previous slide" data-slider="button-next"
                                                className=" tariff group hover:bg-[#34446D] h-[50px] rounded-[4px] border-[#34446D] border border-solid flex items-center justify-center">

                                                <svg className='rotate-[180deg] group-hover:*:*:fill-[#FFF] *:*:transition-all *:*:duration-300' xmlns="http://www.w3.org/2000/svg" width="46" height="38" viewBox="0 0 46 38" fill="none">
                                                    <path d="M24.4482 34.9009H28.7887" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                                    <path d="M24.4482 3.02588L28.7887 3.02588" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                                    <g filter="url(#filter0_d_1459_613)">
                                                        <path d="M30.1421 2H23.8391L10.1421 18.962L23.8391 35.9239H30.1421L16.4451 18.962L30.1421 2Z" fill="#34446D" />
                                                    </g>
                                                    <defs>
                                                        <filter id="filter0_d_1459_613" x="7" y="0" width="27" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 5 0" result="hardAlpha" />
                                                            <feOffset dx="1" dy="0" />
                                                            <feGaussianBlur stdDeviation="0.723404" />
                                                            <feComposite in2="hardAlpha" operator="out" />
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1459_613" />
                                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1459_613" result="shape" />
                                                        </filter>
                                                    </defs>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex item-center text-[40px] font-[300] text-[#34446D] ">
                                        <div className="h-[40px] overflow-hidden">
                                            <div className="count-column rubik">
                                                <h3 data-slide-count="step" className="count-heading ">01</h3>
                                            </div>
                                        </div>
                                        <span className='leading-[1] rubik'>/</span>
                                        <div className="count-column ">
                                            <h3 data-slide-count="total" className="count-heading rubik">{slides.length}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="tariff-wrap w-[252px] " ref={setWrapperRef}>
                            <button
                                onClick={() => { openDefaultModal('introForm') }}
                                ref={setButtonRef} className='justify-center m:flex items-center px-[16px] py-[9px] relative overflow-hidden btnIconAn doc-btn  border-[#34446D] border border-solid tariff text-[20px] transition-all duration-300 font-bold tracking-normal  gap-[6px]  text-[#34446D] hover:text-[#FFF] rounded-[4px]  group hover:bg-[#34446D]   leading-[1]'>
                                <span className="sendIconLeft transition-all ease-in">
                                    <svg className='group-hover:*:fill-[#FFF] rotate-[45deg] *:transition-all *:duration-300' width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M29.0627 0.9375L0.930664 12.1875L11.426 16.9336L26.2502 3.75L13.0666 18.5742L17.8127 29.0625L29.0627 0.9375Z" fill="#34446D" />
                                    </svg>
                                </span>
                                <span
                                    className="transition-all ease-in sendText"
                                >Оформить заявку</span>

                            </button>
                        </div>

                        <div

                            className="slide-main xl:inset-[0%] xl:h-[100%] h-[220px] top-0 z-0">

                            <div className="slider-wrap">
                                <div ref={whiteBgRef} className={`slide-blur xl:left-[562px] left-0 `}>
                                    <span className="line hidden xl:block white" style={{ '--blur': '4px', '--lightness': '100%' } as React.CSSProperties}></span>
                                    <span className="line" style={{ '--blur': '9px', '--lightness': '100%' } as React.CSSProperties}></span>
                                    <span className="line" style={{ '--blur': '6px', '--lightness': '100%' } as React.CSSProperties}></span>
                                    <span className="line" style={{ '--blur': '3px', '--lightness': '100%' } as React.CSSProperties}></span>
                                </div>


                                <div className="slide-blur right-0">
                                    <span className="line" style={{ '--blur': '3px', '--lightness': '100%' } as React.CSSProperties}></span>
                                    <span className="line" style={{ '--blur': '6px', '--lightness': '100%' } as React.CSSProperties}></span>
                                    <span className="line" style={{ '--blur': '9px', '--lightness': '100%' } as React.CSSProperties}></span>
                                </div>
                                <div data-slider="list" className={`slider-list`}
                                    onMouseMove={() => {
                                    }}
                                >


                                    {
                                        slides.map((item, index) => (
                                            <div
                                                key={index} data-slider="slide" className="slider-slide xl:min-w-[336px] xl:max-w-[336px] xl:h-[336px] min-w-[220px] max-w-[220px] h-[220px] shadow-[0px_0px_4px_0px_#00000080] rounded-[8px] border border-solid border-[#FFF]">
                                                <div className="slide-inner relative bg-[#FFF] overflow-hidden rounded-[8px]">
                                                    <Image src={item.img} alt='slide' fill
                                                        style={{ objectFit: 'cover' }} />
                                                    <div className="absolute scale-[-0.9] w-full h-auto bg-[#34446D] mix-blend-hue"></div>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SliderMain;



