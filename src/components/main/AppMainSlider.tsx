import '@/assets/styles/sections/main/main-slider.scss'
import { initSlider, activeIndex } from '@/scripts/slider'
import { useEffect, useState } from 'react';
import ArrowImg from '@/assets/images/svg/right-arrow-slider.svg'
import Image from 'next/image';
import { slides } from './utils';
import { filterPrepositions } from '@/hook/filter';
import gsap from 'gsap';

const Slider = () => {


    const [active, setActive] = useState<number>(0)
    const [oldActive, setOldActive] = useState<number>(0)
    const [changeBg, setChangeBg] = useState(false)
    const direction = ((oldActive < active || (oldActive + 1 === slides.length && active === 0)) && !(oldActive === 0 && active + 1 === slides.length)) ? -1 : 1;

    useEffect(() => {
        initSlider(70, (index: number) => {

            setTimeout(() => {
                setChangeBg(false)
            }, 100)

            const myElement = document.getElementById("title-block") as HTMLElement;
            if (myElement) {

                
                setActive(prev => {
                    let direct = ((prev < index || (prev + 1 === slides.length && index === 0)) && !(prev === 0 && index + 1 === slides.length)) ? -1 : 1;
                    
                    bounceElement(myElement, {
                        startPosition: "0",
                        endPosition: `${5 * direct}px`,
                        duration: 200,
                        easing: "ease-in",
                    });

                    return index
                })
            }
        })
    }, [])

    useEffect(() => {
        if (oldActive !== active) {
            const element = document.querySelector('.slide-text') as HTMLElement

            gsap.to(".slide-text", {
                x: (element.offsetWidth + (element.offsetWidth / 100 * 10) - 67) * direction,
                duration: 0.5,
                ease: "power3.out",
                onComplete: () => {
                    setOldActive(active)
                }
            });
        }
    }, [active]);

    useEffect(() => {
        if (oldActive === active) {
            gsap.to(".slide-text", {
                x: 0,
                duration: 0
            })
        }
    }, [oldActive])

    interface BounceOptions {
        startPosition?: string;
        endPosition?: string;
        duration?: number;
        easing?: string;
    }

    function bounceElement(
        element: HTMLElement,
        {
            startPosition = "0",
            endPosition = "72px",
            duration = 500,
            easing = "ease-out",
        }: BounceOptions = {}
    ): void {
        // Останавливаем текущую анимацию и сбрасываем состояние
        element.style.animation = "none";
        element.style.top = startPosition;
        element.style.position = "relative";

        // Запускаем новую анимацию
        requestAnimationFrame(() => {
            element.style.animation = `bounce ${duration}ms ${easing} forwards`;

            // Добавляем keyframes динамически
            const keyframes = `
            @keyframes bounce {
              from { left: ${startPosition}; }
              to { left: ${endPosition}; }
            }
          `;

            // Удаляем существующий стиль анимации, если есть
            const existingStyle = document.getElementById("bounce-keyframes");
            if (existingStyle) existingStyle.remove();

            // Создаем новый стиль
            const styleSheet = document.createElement("style");
            styleSheet.id = "bounce-keyframes";
            styleSheet.textContent = keyframes;
            document.head.appendChild(styleSheet);
        });

        // Очищаем анимацию после завершения
        element.addEventListener(
            "animationend",
            () => {
                element.style.animation = "";
            },
            { once: true }
        );
    }


    return (
        <section className='py-[75px] text-[#000] bg-[#FFF]'>
            <div className="wrapper flex flex-col gap-[50px]">
                <h2 className='leading-[1] tracking-[-0.04em] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px]'>Мы помогаем с документами по отраслям:</h2>
                <div className="cloneable l:h-[470px] h-[710px]">
                    <div className="overlay l:w-[590px] w-full py-[30px] relative z-[0]  rounded-[8px] border border-solid border-[#34446D] overflow-hidden">
                        <div className={`absolute top-0 bottom-0 right-0 left-0 blurred-element z-[10]   ${!changeBg && 'opacity-0 invisible transition-all duration-300'}`}></div>
                        <div className={`overlay-slider absolute  top-0 right-0 left-0 bottom-0 z-[-2]  ${!changeBg && '!bg-[#F5F5F5] transition-all duration-1000'}`}></div>
                        <div className="absolute  top-0 right-0 left-0 bottom-0 bg-[#F5F5F580] z-[-1] backdrop-blur-[10px] ">
                        </div>
                        <div className="flex flex-col justify-between h-full l:items-start items-center w-full">
                            <div className="flex flex-col grow l:gap-[15px] gap-[30px] w-full">
                                <div className="flex items-center gap-[10px] mr-[30px] relative z-[10]">


                                    <div className="h-[50px] p-[10px] pl-[30px]  rounded-r-[4px] bg-[#34446D] w-full border-[#34446D] border-solid border border-l-0">
                                        <span id='title-block' className='text-[24px] font-bold text-[#FFF]'>
                                            {
                                                filterPrepositions(slides[active].title)
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className={`l:grow slide-text relative w-full h-full px-[30px] ${changeBg && 'transition-all duration-500'}`}>
                                    <p className="text-[16px] absolute top-0 bottom-0 "
                                        style={{
                                            transform: `translateX(${110 * direction * -1}%)`,
                                            right: '30px',
                                            left: '30px'
                                        }}
                                    >
                                        {filterPrepositions(slides[active].text)}
                                    </p>
                                    <p className="text-[16px] absolute top-0 left-[30px] right-[30px] bottom-0 ">
                                        {filterPrepositions(slides[oldActive].text)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between items-end w-full px-[30px] relative z-[10]">
                                <div className="flex gap-[10px]">

                                    <button
                                        onClick={() => {
                                            setOldActive(active)
                                            setChangeBg(true)
                                        }}
                                        aria-label="previous slide" data-slider="button-next" className="w-[100px] h-[50px] rounded-[4px] bg-[#0000001A] border-[#34446D] border border-solid flex items-center justify-center">
                                        <Image src={ArrowImg} alt='next' width={45} height={34} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setOldActive(active)
                                            setChangeBg(true)
                                        }}
                                        aria-label="previous slide" data-slider="button-prev" className="w-[100px] h-[50px] rounded-[4px] bg-[#0000001A] border-[#34446D] border border-solid flex items-center justify-center">
                                        <Image src={ArrowImg} alt='prev' width={45} height={34} className='rotate-[180deg]' />
                                    </button>

                                </div>
                                <div className="flex item-center text-[32px] font-bold leading-[1]">
                                    <div className="count-column">
                                        <h3 data-slide-count="step" className="count-heading">01</h3>
                                    </div>
                                    <span>/</span>
                                    <div className="count-column">
                                        <h3 data-slide-count="total" className="count-heading">{slides.length}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div

                        className="slide-main l:inset-[0%] l:h-full h-[300px] l:bottom-0 bottom-[80px] l:z-0 z-[]">
                        <div className="slider-wrap">
                            <div data-slider="list" className="slider-list"
                                onMouseMove={() => {
                                    if (activeIndex.index !== active) {
                                        setOldActive(active)
                                        setChangeBg(true)

                                    }
                                }}
                                onMouseLeave={() => {
                                    setOldActive(active)
                                }}
                            >

                                {
                                    slides.map((item, index) => (
                                        <div
                                            key={index} data-slider="slide" className="slider-slide overflow-hidden active l:w-[540px] l:h-[415px] w-[415px] h-[306px]">
                                            <div className="slide-inner overflow-hidden relative bg-[#FFF]">
                                                <Image src={item.img} alt='slide' fill
                                                    style={{ objectFit: 'cover' }} />
                                                <div className="absolute scale-[-0.9] w-full h-full bg-[#34446D] mix-blend-hue"></div>

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
    );
};

export default Slider;
