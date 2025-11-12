 'use client'

import { PhotoProvider, PhotoView } from '@/assets/lib/react-photo-view';
import { useEffect, useRef, useState } from 'react';
import { useButton } from '@/hook/useButton';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import useWindowSize from '@/hook/useWindowSize';
import '@/assets/styles/sections/main/main-feedback.scss';




const AppMainFeedback = () => {

    const { width: widthWindow } = useWindowSize();

    const ref = useRef(null)

    const [activeIndex, setActive] = useState<number>(0)
    const [activeIndex1, setActive1] = useState<number>(0)

    const loop = useRef<any>(null)
    const loop1 = useRef<any>(null)

    useEffect(() => {
        // Ленивая загрузка GSAP и slider только когда секция видна
        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (entry.isIntersecting) {
                    // Динамический импорт GSAP и slider для code splitting
                    const [gsapModule, sliderModule] = await Promise.all([
                        import('gsap'),
                        import('@/scripts/slider')
                    ]);
                    const gsap = gsapModule.default || gsapModule;
                    const { horizontalLoop } = sliderModule;
                    
                    const slides = gsap.utils.toArray('[data-slider="slide-feedback"]');
                    const slides1 = gsap.utils.toArray('[data-slider="slide-feedback1"]');
                    loop.current = horizontalLoop(slides, {
                        paused: true,
                        draggable: true,
                        speed: 0.5,
                        offsetLeft: 0,
                        repeat: -1,
                        center: true,
                        mobile: widthWindow && widthWindow < 1280,
                        snap: false,
                        gap: 20,
                        opacity: false,
                        onChange: (index: number) => {
                            setActive(index)
                        }
                    });

                    loop1.current = horizontalLoop(slides1, {
                        paused: true,
                        draggable: true,
                        speed: 0.5,
                        offsetLeft: 0,
                        repeat: -1,
                        center: true,
                        snap: false,
                        gap: 20,
                        mobile: widthWindow && widthWindow < 1280,
                        reversed: true,
                        opacity: false,
                        onChange: (index: number) => {
                            setActive1(index)
                        }
                    });
                    loop.current?.next({ ease: "power3", duration: 0.725 })
                    loop1.current?.previous({ ease: "power3", duration: 0.725 })

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
            loop.current?.destroy();
            loop1.current?.destroy();
            loop.current = null;
            loop1.current = null;
        }
    }, [widthWindow])



    const { t } = useTranslation()


    return (
        <section className="section wrapper">
            <div id="feedback" className="absolute top-[-50px] pointer-events-none" ></div>

            <h2 className="section__title">{t('MainFeedback.title')}</h2>
            <PhotoProvider maskOpacity={0.4} maskClassName="blurred-mask"
                speed={() => 0}

                maskClosable={false}

            >
                <div ref={ref} className="feedback-slider-box">

                    <div className="slide-blur feedback-blur left-0">
                        <span className="line" style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}></span>
                    </div>

                    <div className="feedback-slider-section">



                        <div className="feedback-slider-container">
                            {[...Array(14)].map((_, index) =>
                                <div
                                    data-slider="slide-feedback" key={index} className="feedback-item">
                                    <PhotoView src={`/feedbacks/big/${index + 1}.png`}
                                    >
                                        <Image
                                            className='feedback-image'
                                            src={`/feedbacks/small/${index + 1}.png`} 
                                            alt='feedback' 
                                            width={190} 
                                            height={267}
                                            loading="lazy"
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                    </PhotoView>
                                </div>)}

                        </div>
                        <div className="slide-dots-box-container !flex xl:!hidden">

                            <div className="slide-dots-box !flex xl:!hidden">
                                {[...Array(14)].map((_, i) => (
                                    <div key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="feedback-slider-section">

                        <div className="feedback-slider-container">
                            {[...Array(14)].map((_, index) =>
                                <div
                                    data-slider="slide-feedback1" key={index} className="feedback-item">
                                    <PhotoView
                                        src={`/feedbacks/big/${15 + index}.png`}>
                                        <Image
                                            className='feedback-image'
                                            src={`/feedbacks/small/${15 + index}.png`} 
                                            alt='feedback' 
                                            width={190} 
                                            height={267}
                                            loading="lazy"
                                            placeholder="blur"
                                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                                    </PhotoView>
                                </div>)}

                        </div>

                        <div className="slide-dots-box-container !flex xl:!hidden">
                            <div className="slide-dots-box !flex xl:!hidden">
                                {[...Array(14)].map((_, i) => (
                                    <div key={i} className={`${activeIndex1 === i ? 'active' : ""} slide-dots`}></div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="slide-blur feedback-blur right-0 ">
                        <span className="line" style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                    </div>

                </div>
            </PhotoProvider>
        </section>

    );
};

export default AppMainFeedback;