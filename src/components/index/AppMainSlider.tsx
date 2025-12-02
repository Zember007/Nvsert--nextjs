'use client'
// initSlider загружается асинхронно только при видимости компонента для оптимизации TBT
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { slides } from './utils';
import { filterPrepositions } from '@/hook/filter';
import '@/assets/styles/sections/main/main-slider-component.scss'
import { useButton } from '@/hook/useButton';
import { useHeaderContext } from '../contexts/HeaderContext';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hook/useIntersectionObserver';
import useWindowSize from '@/hook/useWindowSize';
import stylesBtn from '@/assets/styles/base/_button.module.scss';
import stylesSlider from '@/assets/styles/blocks/slider.module.scss';
import textSize from '@/assets/styles/base/text-size.module.scss';



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
    const { width: widthWindow } = useWindowSize();
    const [activeIndex, setActive] = useState<number>(0)
    const slider = useRef<HTMLDivElement>(null)
    const timeLine = useRef<any>(null)
    const [whiteBgBlur, setWhiteBgBlur] = useState(true)


    useEffect(() => {
        if (!isVisible || !ref.current) return

        if (timeLine.current) timeLine.current.destroy(); timeLine.current = null;




        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (entry.isIntersecting) {
                    // Асинхронная загрузка initSlider для уменьшения TBT
                    const { initSlider } = await import('@/scripts/slider');

                    if (widthWindow && widthWindow >= 1280) {
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

                                setWhiteBgBlur(false)
                                if (timeoutIdBg) {
                                    clearTimeout(timeoutIdBg)
                                }

                                timeoutIdBg = setTimeout(() => {
                                    setWhiteBgBlur(true)
                                }, 300)
                            },
                            mobile: false

                        })
                    } else {

                        setWhiteBgBlur(false)




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
    }, [ref, isVisible, widthWindow])

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


                <h2 className={`${textSize.headerH2} section__title`}>Помогаем с документами по отраслям</h2>
                <div className="cloneable">


                    <div className="slide-main">

                        <div className="slider-wrap">
                            <div className={`${stylesSlider.slideBlur} slide-blur-left ${whiteBgBlur ? stylesSlider.white : ''}`}>
                                <span className={`${stylesSlider.line} hidden xl:block white`} style={{ '--blur': '4px', '--lightness': '100%' } as React.CSSProperties}></span>
                                <span className={stylesSlider.line} style={{ '--blur': '9px', '--lightness': '100%' } as React.CSSProperties}></span>
                                <span className={stylesSlider.line} style={{ '--blur': '6px', '--lightness': '100%' } as React.CSSProperties}></span>
                                <span className={stylesSlider.line} style={{ '--blur': '3px', '--lightness': '100%' } as React.CSSProperties}></span>
                            </div>


                            <div className={`${stylesSlider.slideBlur} right-0`}>
                                <span className={stylesSlider.line} style={{ '--blur': '3px', '--lightness': '100%' } as React.CSSProperties}></span>
                                <span className={stylesSlider.line} style={{ '--blur': '6px', '--lightness': '100%' } as React.CSSProperties}></span>
                                <span className={stylesSlider.line} style={{ '--blur': '9px', '--lightness': '100%' } as React.CSSProperties}></span>
                            </div>
                            <div data-slider="list" className={`slider-list`}
                                style={{
                                    ...(widthWindow && widthWindow < 960 && {
                                        gap: (widthWindow - (250)) / 2
                                    })
                                }}
                            >


                                {
                                    slides.map((item, index) => (
                                        <div
                                            key={index} data-slider="slide" className="slider-slide slider-slide-item">
                                            <div className="slide-inner slide-inner-content">
                                                <Image 
                                                    src={item.img} 
                                                    alt='slide' 
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                    priority={index === 0}
                                                    fetchPriority={index === 0 ? 'high' : 'auto'}
                                                    loading={index === 0 ? 'eager' : 'lazy'}
                                                />
                                                <div className="slide-overlay-blend"></div>

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className={`${stylesSlider.slideDotsBoxContainer} xl:!hidden`}>
                        <div className={`${stylesSlider.slideDotsBox} xl:!hidden`}>
                            {slides.map((_, i) => (
                                <div key={i} className={`${activeIndex === i ? stylesSlider.activeDots : ""} ${stylesSlider.slideDots}`}></div>
                            ))}
                        </div>
                    </div>

                    <div
                        ref={overlayText}
                        className={`overlay`}>
                        <div className={`overlay-slider`}></div>


                        <div className="overlay-content-container">
                            <h3 className={`${textSize.headerH6} overlay-title`}>
                                {
                                    filterPrepositions(slidesLang[activeIndex].title)
                                }
                            </h3>
                            <p className={`slide-text-content ${textSize.text3}`}>

                                {filterPrepositions(slidesLang[activeIndex].text)}

                            </p>
                        </div>


                        <div className="slider__navigations">
                            <div className="slider-navigation-container">
                                <div
                                    ref={setWrapperRef}
                                    className={`${stylesBtn.tariffWrap} navigation-button-wrap`}>
                                    <button
                                        ref={setButtonRef}
                                        aria-label="previous slide" data-slider="button-prev"
                                        className={`${stylesBtn.tariff} item group`}>

                                        <span className="navigation-button-icon">
                                            <svg
                                                width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 21.957L2 13.404L2.00006 9.60268L10 2" stroke="white" strokeWidth="2.66667" />
                                            </svg>
                                        </span>
                                        <span className="navigation-button-icon">
                                            <svg
                                                width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 21.957L2 13.404L2.00006 9.60268L10 2" stroke="white" strokeWidth="2.66667" />
                                            </svg>
                                        </span>

                                    </button>
                                </div>
                                <div
                                    ref={setWrapperRef}
                                    className={`${stylesBtn.tariffWrap} navigation-button-wrap`}>
                                    <button
                                        ref={setButtonRef}
                                        aria-label="previous slide" data-slider="button-next"
                                        className={`${stylesBtn.tariff} item group`}>

                                        <span className="navigation-button-icon-next">
                                            <svg
                                                width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 21.957L10 13.404L9.99994 9.60268L2 2" stroke="white" strokeWidth="2.66667" />
                                            </svg>
                                        </span>
                                        <span className="navigation-button-icon-next">
                                            <svg
                                                width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 21.957L10 13.404L9.99994 9.60268L2 2" stroke="white" strokeWidth="2.66667" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="slide-counter-container">
                                <div className="slide-counter-overflow">
                                    <div className="count-column">
                                        <p data-slide-count="step" className={`${textSize.headerH3} count-heading`}>01</p>
                                    </div>
                                </div>
                                <span className='font-light'>/</span>
                                <div className="count-column ">
                                    <p data-slide-count="total" className={`${textSize.headerH3} count-heading`}>{slides.length}</p>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className={`${stylesSlider.slideDotsBoxContainer} xl:!hidden`}>
                        <div className={`${stylesSlider.slideDotsBox} xl:!hidden`}>
                            {slides.map((_, i) => (
                                <div
                                    onClick={() => {
                                        timeLine.current.toIndex(i, { ease: "power3", duration: 0.725 })
                                    }}
                                    key={i} className={`${activeIndex === i ? stylesSlider.activeDots : ""} ${stylesSlider.slideDots}`}></div>
                            ))}
                        </div>
                    </div>

                    <div className="main-button-slider-wrap  ${stylesBtn.tariffWrap}" ref={setWrapperRef}>
                        <button
                            onClick={() => { openDefaultModal('orderForm') }}
                            ref={setButtonRef} className={`${stylesBtn.btnIconAn} slider__button group  ${stylesBtn.tariff}`}>

                            <span
                                className={`${stylesBtn.sendText}`}
                            >Оформить заявку</span>
                            <span className={`${stylesBtn.sendIconLeft}`}>
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



