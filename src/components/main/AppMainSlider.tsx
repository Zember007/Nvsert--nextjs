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
    const slider = useRef<HTMLDivElement>(null)
    const timeLine = useRef<any>(null)

    useEffect(() => {
        if (!whiteBgRef.current || !isVisible || !ref.current) return

        if (widthWindow && widthWindow >= 1240) {
            let timeoutIdBg: NodeJS.Timeout | null = null;



            timeLine.current = initSlider({
                onChangeFunction: (index: number) => {

                    setActive(index)

                    if (slider.current && !slider.current.classList.contains('animate')) {
                        slider.current.classList.add('animate')

                        setTimeout(() => {
                            if (!slider.current) return
                            slider.current.classList.remove('animate')
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

                    if (slider.current && !slider.current.classList.contains('animate')) {
                        slider.current.classList.add('animate')

                        setTimeout(() => {
                            if (!slider.current) return
                            slider.current.classList.remove('animate')
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
            { threshold: 0.2 }
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

    const overlayText = useRef<HTMLDivElement>(null)


    useEffect(() => {

        if (!overlayText.current) return

        let startX = 0;

        overlayText.current.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        });

        overlayText.current.addEventListener('touchend', function (e) {
            const endX = e.changedTouches[0].clientX;
            const diffX = endX - startX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    timeLine.current.previous({ ease: "power3", duration: 0.725 })

                } else {
                    timeLine.current.next({ ease: "power3", duration: 0.725 })

                }
            }
        });

        return () => {
            overlayText.current?.removeEventListener('touchend', function () { })
            overlayText.current?.removeEventListener('touchstart', function () { })
        }
    }, [overlayText, timeLine])



    return (
        <>
            <section ref={ref} className='section wrapper'>

                <h2 className='section__title'>Помогаем с документами по отраслям</h2>
                <div className="cloneable">


                    <div className="slide-main">

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
                                style={{
                                    ...(widthWindow && widthWindow < 1240 && {
                                        gap: (widthWindow - 320) / 2
                                    })
                                }}
                            >


                                {
                                    slides.map((item, index) => (
                                        <div
                                            key={index} data-slider="slide" className="slider-slide xl:w-[336px] xl:h-[336px] w-[320px]  h-[320px] rounded-[6px]">
                                            <div className="slide-inner relative bg-[#FFF] overflow-hidden rounded-[6px]">
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

                    <div className="slide-dots-box">
                        {slides.map((_, i) => (
                            <div key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
                        ))}
                    </div>

                    <div
                        ref={overlayText}
                        className={`overlay `}>
                        <div className={`overlay-slider`}></div>


                        <div className="flex flex-col xl:gap-[15px]  grow relative w-full overflow-hidden">
                            <span className="overlay-title">
                                {
                                    filterPrepositions(slidesLang[activeIndex].title)
                                }
                            </span>
                            <p className={`arial grow slide-text xl:p-0 p-[20px] w-full h-full text-[16px] bg-[#FFF] `}>

                                {filterPrepositions(slidesLang[activeIndex].text)}

                            </p>
                        </div>


                        <div className="slider__navigations">
                            <div className="flex gap-[10px]">
                                <div
                                    ref={setWrapperRef}
                                    className="tariff-wrap w-[100px]">
                                    <button
                                        ref={setButtonRef}
                                        aria-label="previous slide" data-slider="button-prev"
                                        className="tariff item group">

                                        <svg
                                            className='group-hover:*:fill-[#FFF] *:transition-all *:duration-300'
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13 9V7H16V9H13ZM7.03233 1L8.47092 2.43076L3.89081 6.98713H10V9.01185H3.89081L8.47092 13.5682L7.03233 15L0 8L0.717771 7.28462L1.43656 6.56823L7.03233 1Z" fill="#34446D" />
                                        </svg>

                                    </button>
                                </div>
                                <div
                                    ref={setWrapperRef}
                                    className="tariff-wrap w-[100px]">
                                    <button
                                        ref={setButtonRef}
                                        aria-label="previous slide" data-slider="button-next"
                                        className=" tariff item group">

                           
                                        <svg
                                            className='group-hover:*:fill-[#FFF] *:transition-all *:duration-300'
                                            width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 9V7H0V9H3ZM8.96767 1L7.52908 2.43076L12.1092 6.98713H6V9.01185H12.1092L7.52908 13.5682L8.96767 15L16 8L15.2822 7.28462L14.5634 6.56823L8.96767 1Z" fill="#34446D" />
                                        </svg>

                                    </button>
                                </div>
                            </div>
                            <div className="flex item-center text-[40px] font-[300] text-[#93969D] ">
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

                    <div className="slide-dots-box">
                        {slides.map((_, i) => (
                            <div
                                onClick={() => {
                                    timeLine.current.toIndex(i, { ease: "power3", duration: 0.725 })
                                }}
                                key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
                        ))}
                    </div>

                    <div className="tariff-wrap xl:w-[246px] w-[280px] m:mx-0 mx-auto" ref={setWrapperRef}>
                        <button
                            onClick={() => { openDefaultModal('introForm') }}
                            ref={setButtonRef} className=' slider__button group btnIconAn doc-btn tariff'>

                            <span
                                className="sendText"
                            >Оформить заявку</span>
                            <span className="sendIconLeft">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
                                </svg>
                            </span>
                        </button>
                    </div>

                </div>
            </section>
        </>
    );
};

export default SliderMain;



