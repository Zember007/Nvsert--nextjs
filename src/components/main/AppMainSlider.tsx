import { initSlider } from '@/scripts/slider'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { slides } from './utils';
import { filterPrepositions } from '@/hook/filter';
import HorizontalSlide from './elements/HorisontalSlide'
import '@/assets/styles/sections/main/main-slider-component.scss'
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
    const { ref, isVisible } = useIntersectionObserver({}, true);
    const widthWindow = useWindowWidth();
    const [activeIndex, setActive] = useState<number>(0)
    const whiteBgRef = useRef<HTMLDivElement | null>(null)
    const slider = useRef<HTMLDivElement>(null)
    const timeLine = useRef<any>(null)

    useEffect(() => {
        if (!whiteBgRef.current || !isVisible || !ref.current) return

        if (timeLine.current) timeLine.current.destroy(); timeLine.current = null;

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

                <div id="slider" className="absolute top-[-50px] pointer-events-none" ></div>


                <h2 className='section__title'>Помогаем с документами по отраслям</h2>
                <div className="cloneable">


                    <div className="slide-main">

                        <div className="slider-wrap">
                            <div ref={whiteBgRef} className={`slide-blur slide-blur-left`}>
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
                                    ...(widthWindow && widthWindow < 900 && {
                                        gap: (widthWindow - (250)) / 2
                                    })
                                }}
                            >


                                {
                                    slides.map((item, index) => (
                                        <div
                                            key={index} data-slider="slide" className="slider-slide slider-slide-item">
                                            <div className="slide-inner slide-inner-content">
                                                <Image src={item.img} alt='slide' fill
                                                    style={{ objectFit: 'cover' }} />
                                                <div className="slide-overlay-blend"></div>

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="slide-dots-box-container xl:!hidden">
                        <div className="slide-dots-box xl:!hidden">
                            {slides.map((_, i) => (
                                <div key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
                            ))}
                        </div>
                    </div>

                    <div
                        ref={overlayText}
                        className={`overlay`}>
                        <div className={`overlay-slider`}></div>


                        <div className="overlay-content-container">
                            <h6 className="overlay-title">
                                {
                                    filterPrepositions(slidesLang[activeIndex].title)
                                }
                            </h6>
                            <p className={`slide-text-content text-3`}>

                                {filterPrepositions(slidesLang[activeIndex].text)}

                            </p>
                        </div>


                        <div className="slider__navigations">
                            <div className="slider-navigation-container">
                                <div
                                    ref={setWrapperRef}
                                    className="navigation-button-wrap tariff-wrap">
                                    <button
                                        ref={setButtonRef}
                                        aria-label="previous slide" data-slider="button-prev"
                                        className="tariff item group">

                                        <div className="navigation-button-icon">
                                            <svg
                                                width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 21.957L2 13.404L2.00006 9.60268L10 2" stroke="white" strokeWidth="2.66667"  />
                                            </svg>
                                        </div>
                                        <div className="navigation-button-icon">
                                            <svg
                                                width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 21.957L2 13.404L2.00006 9.60268L10 2" stroke="white" strokeWidth="2.66667"  />
                                            </svg>
                                        </div>

                                    </button>
                                </div>
                                <div
                                    ref={setWrapperRef}
                                    className="navigation-button-wrap tariff-wrap">
                                    <button
                                        ref={setButtonRef}
                                        aria-label="previous slide" data-slider="button-next"
                                        className=" tariff item group">

                                        <div className="navigation-button-icon-next">
                                            <svg
                                                width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 21.957L10 13.404L9.99994 9.60268L2 2" stroke="white" strokeWidth="2.66667"  />
                                            </svg>
                                        </div>
                                        <div className="navigation-button-icon-next">
                                            <svg
                                                width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 21.957L10 13.404L9.99994 9.60268L2 2" stroke="white" strokeWidth="2.66667" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="slide-counter-container">
                                <div className="slide-counter-overflow">
                                    <div className="count-column">
                                        <h3 data-slide-count="step" className="count-heading ">01</h3>
                                    </div>
                                </div>
                                <span>/</span>
                                <div className="count-column ">
                                    <h3 data-slide-count="total" className="count-heading">{slides.length}</h3>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="slide-dots-box-container xl:!hidden">
                        <div className="slide-dots-box xl:!hidden">
                            {slides.map((_, i) => (
                                <div
                                    onClick={() => {
                                        timeLine.current.toIndex(i, { ease: "power3", duration: 0.725 })
                                    }}
                                    key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
                            ))}
                        </div>
                    </div>

                    <div className="main-button-wrap tariff-wrap" ref={setWrapperRef}>
                        <button
                            onClick={() => { openDefaultModal('orderForm') }}
                            ref={setButtonRef} className='slider__button group btnIconAn doc-btn tariff'>

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



