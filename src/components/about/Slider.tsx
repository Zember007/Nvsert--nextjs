import useWindowSize from '@/hook/useWindowSize';
import { horizontalLoop } from '@/scripts/slider';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import CountUp from '@/components/general/countUp';
import styles from '@/assets/styles/blocks/slider.module.scss';
import textSize from '@/assets/styles/base/base.module.scss';

const Slider = () => {

    const { width: widthWindow } = useWindowSize();




    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const gap = widthWindow && widthWindow < 640 ? (widthWindow - (300)) / 2 : 20

    // Функция для парсинга числа и суффикса из строки
    const parseProcent = (procent: string): { value: number; suffix: string } => {
        const match = procent.match(/(\d+(?:\.\d+)?)([+%]?)/);
        if (match) {
            return {
                value: parseFloat(match[1]),
                suffix: match[2] || ''
            };
        }
        return { value: 0, suffix: '' };
    };

    // Инициализация слайдера
    useEffect(() => {
        const slides = gsap.utils.toArray('[data-slider="slider-cards"]');
        if (slides.length > 0) {


            function updateOpacity() {

                const rectContainer = (sliderRef.current as unknown as HTMLElement)?.getBoundingClientRect();

                if (!rectContainer) return;
                slides.forEach(item => {
                    if (!(item instanceof HTMLElement)) return;
                    const rect = item.getBoundingClientRect();


                    // Насколько блок находится ВНЕ слева и справа
                    const outLeft = Math.max(0, rectContainer.left - rect.left);
                    const outRight = Math.max(0, rect.right - rectContainer.right);

                    // Сколько всего блока вне контейнера по горизонтали
                    const totalOutside = outLeft + outRight;

                    // Если больше половины элемента находится за пределами контейнера
                    if (totalOutside >= rect.width / 2) {
                        item.style.opacity = '0';
                    } else {
                        item.style.opacity = '1';
                    }
                });
            }
            let timeoutIdBg: NodeJS.Timeout | null = null;

            const loop: any = horizontalLoop(slides, {
                paused: true,
                draggable: true,
                mobile: widthWindow && widthWindow < 1280,
                snap: true,
                gap: widthWindow && widthWindow < 640 ? (widthWindow - (300)) / 2 : 20,
                center: widthWindow && (widthWindow < 640 || widthWindow >= 1280) ? true : false,
                onChange: (index: number) => {
                    setActiveIndex(index);
                },

                onDragFunction: () => {
                    slides.forEach(item => {
                        if (!(item instanceof HTMLElement)) return;
                        item.style.opacity = '1';
                    });

                    if (timeoutIdBg) {
                        clearTimeout(timeoutIdBg);
                    }

                    timeoutIdBg = setTimeout(() => {
                        updateOpacity();
                    }, 100);
                }
            });

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        loop.next({ ease: "power3", duration: 0.725 });

                        if (sliderRef.current) {
                            observer.unobserve(sliderRef.current);
                        }
                    }
                },
                { threshold: 0.5 }
            );

            if (sliderRef.current) {
                observer.observe(sliderRef.current);
            }

            return () => {
                loop.destroy();
            };
        }
    }, [widthWindow]);

    const sliderBlocks: any[] = [
        {
            procent: "15+",
            title: "Лет на рынке сертификации",
            description: "Являемся надёжным партнёром с глубоким пониманием требований и процедур в разных отраслях"
        },
        {
            procent: "7",
            title: "Этапов комплексного сопровождения",
            description: "Ведём клиента от первой консультации до регистрации документов в реестре и передачи оригиналов в установленные сроки."
        },
        {
            procent: "75+",
            title: "Квалифицированных экспертов в команде",
            description: "Каждый проект сопровождает команда специалистов с опытом от 5 лет, что гарантирует точность и надёжность результата."
        },
        {
            procent: "10000+",
            title: "Компаний доверяют нам работу",
            description: "NVSERT выбрали компании по всей России, ЕАЭС и зарубежные партнёры. Среди наших клиентов — крупные холдинги и корпорации."
        },
        {
            procent: "25+",
            title: "Отраслей в нашей практике",
            description: "Мы работаем с промышленностью, пищевой продукцией, строительными материалами, и другими сегментами рынка."
        },
        {
            procent: "99%",
            title: "Заказов выполняем раньше срока",
            description: "Документы подготавливаются быстрее, чем указано в договоре, при этом качество и юридическая сила остаются безупречными."
        }
    ];



    return (
        <div key="slider-container" ref={sliderRef} className="slider-container relative overflow-hidden mt-[15px] 1k:max-w-[calc(100vw-824px)] xl:max-w-[calc(100vw-656px)] l:max-w-[640px] xxs:max-w-[580px] xxs:mx-auto -mx-[26px] w-[calc(100%+52px)]">
            <div className={`${styles.slideBlur} ${styles.feedbackBlur} left-0`}>
                <span className={styles.line} style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                <span className={styles.line} style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}></span>
                <span className={styles.line} style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}></span>
            </div>
            <div className={`${styles.slideBlur} ${styles.feedbackBlur} right-0 `}>
                <span className={styles.line} style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}></span>
                <span className={styles.line} style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}></span>
                <span className={styles.line} style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
            </div>
            <div
                data-slider="slider-wrap"
                className="slider-wrapper flex  "
                style={{ gap: `${gap}px` }}
            >

                {sliderBlocks.map((block, index) => {



                    return (
                        <div
                            key={index}
                            data-slider="slider-cards"
                            className="p-[20px] l:w-[300px] l:min-w-[300px] xxs:w-[280px] xxs:min-w-[280px] xss:w-[300px] xss:min-w-[300px] w-[280px] min-w-[280px] l:min-h-[200px] min-h-[270px] relative border border-[#93969D] bg-[#93969d26] rounded-[4px] flex flex-col justify-between transition-opacity duration-300"
                        >
                            <svg
                                className="absolute top-[10px] right-[10px]"
                                width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 0L16.1889 7.2177C16.7462 10.6016 19.3984 13.2538 22.7823 13.8111L30 15L22.7823 16.1889C19.3984 16.7462 16.7462 19.3984 16.1889 22.7823L15 30L13.8111 22.7823C13.2538 19.3984 10.6016 16.7462 7.2177 16.1889L0 15L7.2177 13.8111C10.6016 13.2538 13.2538 10.6016 13.8111 7.2177L15 0Z" fill="#93969D" fillOpacity="0.5" />
                            </svg>
                            <div className="flex flex-col gap-[15px] w-full">

                                <h2 className="!text-[48px] text-[#34446D]">
                                    {(() => {
                                        const { value, suffix } = parseProcent(block.procent);
                                        return (
                                            <>
                                                <CountUp
                                                    to={value}
                                                    duration={0.5}
                                                    className="inline-block"
                                                />
                                                {suffix && <span>{suffix}</span>}
                                            </>
                                        );
                                    })()}
                                </h2>

                                <h6 className={`${textSize.headerH6} leading-[1.3] text-black !font-normal`}>
                                    {block.title}
                                </h6>
                                <div>
                                    {block.description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={`${styles.slideDotsBoxContainer} !flex my-[20px]`}>
                <div className={`${styles.slideDotsBox} !flex`}>
                    {sliderBlocks.map((_, i) => (
                        <div key={i} className={`${activeIndex === i ? styles.activeDots : ""} ${styles.slideDots}`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slider;