
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

    const readyPhoto = () => {
        setTimeout(() => {


            const portal = document.querySelector('.PhotoView-Portal') as HTMLDivElement;
            const arrowLeft = document.querySelector('.PhotoView-Slider__ArrowLeft') as HTMLDivElement;
            const arrowRight = document.querySelector('.PhotoView-Slider__ArrowRight') as HTMLDivElement;
            const closeBtn = document.querySelector('.PhotoView-Slider__BannerRight') as HTMLDivElement;


            if (!portal || !arrowLeft || !arrowRight) {
                console.error('Один из необходимых элементов не найден');
                return;
            }

            // Отслеживание движения курсора
            portal.addEventListener('mousemove', (e: any) => {
                const rect = portal.getBoundingClientRect(); // Получаем размеры и положение блока
                const cursorX = e.clientX - rect.left; // Позиция курсора относительно левого края блока
                const halfWidth = rect.width / 2; // Половина ширины блока

                // Удаляем оба класса перед добавлением нового
                portal.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');

                // Добавляем класс в зависимости от положения курсора
                if (cursorX <= halfWidth) {
                    portal.classList.add('modal__nav-arrow--left');
                } else {
                    portal.classList.add('modal__nav-arrow--right');
                }
            });

            // Удаление классов при выходе курсора из блока
            portal.addEventListener('mouseleave', () => {
                portal.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');
            });

            // Обработка клика
            portal.addEventListener('click', (e: any) => {
                const target = e.target as Element;
                if (target?.closest('.PhotoView-Slider__BannerRight') || target?.closest('.PhotoView-Slider__ArrowLeft') || target?.closest('.PhotoView-Slider__ArrowRight')) return

                const rect = portal.getBoundingClientRect();
                const cursorX = e.clientX - rect.left;
                const halfWidth = rect.width / 2;

                // Симулируем клик на соответствующую стрелку
                if (cursorX <= halfWidth) {
                    arrowLeft.click();
                } else {
                    arrowRight.click();

                }
            });


            closeBtn.addEventListener('click', (e) => {
                portal.removeEventListener('click', () => { })
                portal.removeEventListener('mouseleave', () => { })
                portal.removeEventListener('mousemove', () => { })
                closeBtn.removeEventListener('click', () => { })
            });

        }, 100)
    }

  const { t } = useTranslation()


    return (
        <section  className="section wrapper">
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
                                {[...Array(19)].map((_, index) =>
                                    <div
                                        onClick={readyPhoto}
                                        data-slider="slide-feedback" key={index} className="feedback-item">
                                        <PhotoView src={`/feedbacks/big/${index + 1}.png`}
                                        >
                                            <Image
                                                className='feedback-image'
                                                src={`/feedbacks/small/${index + 1}.png`} alt='feedback' width={190} height={267} />
                                        </PhotoView>
                                    </div>)}

                            </div>

                            <div className="slide-dots-box">
                                {[...Array(19)].map((_, i) => (
                                    <div key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
                                ))}
                            </div>
                        </div>

                        <div className="feedback-slider-section">

                            <div className="feedback-slider-container">
                                {[...Array(19)].map((_, index) =>
                                    <div
                                        onClick={readyPhoto}

                                        data-slider="slide-feedback1" key={index} className="feedback-item">
                                        <PhotoView src={`/feedbacks/big/${20 + index}.png`}>
                                            <Image
                                                className='feedback-image'
                                                src={`/feedbacks/small/${20 + index}.png`} alt='feedback' width={190} height={267} />
                                        </PhotoView>
                                    </div>)}

                            </div>

                            <div className="slide-dots-box">
                                {[...Array(19)].map((_, i) => (
                                    <div key={i} className={`${activeIndex1 === i ? 'active' : ""} slide-dots`}></div>
                                ))}
                            </div>
                        </div>


                        <div className="slide-blur right-0 ">
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