
import { PhotoProvider, PhotoView } from '@/assets/lib/react-photo-view';
import { useEffect, useRef, useState } from 'react';
import { horizontalLoop } from '@/scripts/slider';
import { useButton } from '@/hook/useButton';
import Image from 'next/image';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import useWindowWidth from '@/hook/useWindowWidth';
import '@/assets/styles/sections/main/main-feedback.scss';




const AppMainFeedback = () => {

    const widthWindow = useWindowWidth();
    const ref = useRef(null)

    const [activeIndex, setActive] = useState<number>(0)
    const [activeIndex1, setActive1] = useState<number>(0)

    useEffect(() => {
        const slides = gsap.utils.toArray('[data-slider="slide-feedback"]');
        const slides1 = gsap.utils.toArray('[data-slider="slide-feedback1"]');
        const loop: any = horizontalLoop(slides, {
            paused: true,
            draggable: true,
            speed: 0.5,
            offsetLeft: 0,
            repeat: -1,
            center: true,
            mobile: widthWindow && widthWindow < 1240,
            snap: false,
            gap: 20,
            opacity: false,
            onChange: (index: number) => {
                setActive(index)
            }
        });

        const loop1: any = horizontalLoop(slides1, {
            paused: true,
            draggable: true,
            speed: 0.5,
            offsetLeft: 0,
            repeat: -1,
            center: true,
            snap: false,
            gap: 20,
            mobile: widthWindow && widthWindow < 1240,
            reversed: true,
            opacity: false,
            onChange: (index: number) => {
                setActive1(index)
            }
        });


        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loop.next({ ease: "power3", duration: 0.725 })
                    loop1.previous({ ease: "power3", duration: 0.725 })

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
            loop.destroy();
            loop1.destroy();
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
                                            src={`/feedbacks/small/${index + 1}.png`} alt='feedback' width={190} height={267} />
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
                                    <PhotoView src={`/feedbacks/big/${15 + index}.png`}>
                                        <Image
                                            className='feedback-image'
                                            src={`/feedbacks/small/${15 + index}.png`} alt='feedback' width={190} height={267} />
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