import '@/assets/styles/sections/main/main-slider.scss'
import { initSlider, activeIndex } from '@/scripts/slider'
import { useEffect, useState } from 'react';
import ArrowImg from '@/assets/images/svg/right-arrow-slider.svg'
import Image from 'next/image';
import { slides } from './utils';
import { filterPrepositions } from '@/hook/filter';
import gsap from 'gsap';
import { BounceEffect } from '@/hook/useBounce';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)"
};

const images = [
    {
        src: "https://images.unsplash.com/photo-1467093378883-9684de425866?dpr=1&auto=compress,format&crop=entropy&fit=crop&w=700&h=500&q=80",
        title: "Far far away",
        text: "Behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean."
    },
    {
        src: "https://images.unsplash.com/photo-1467093378883-9684de425866?dpr=1&auto=compress,format&crop=entropy&fit=crop&w=700&h=500&q=80",
        title: "A small river",
        text: "Named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth."
    },
    {
        src: "https://images.unsplash.com/photo-1467092650124-c9c93cc63877?dpr=1&auto=compress,format&crop=entropy&fit=crop&w=700&h=500&q=80",
        title: "Even the all-powerful",
        text: "Pointing has no control about the blind texts it is an almost unorthographic life. One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar."
    }
];

const SliderMain = () => {


    const [active, setActive] = useState<number>(0)
    const [oldActive, setOldActive] = useState<number>(0)
    const [changeBg, setChangeBg] = useState(false)
    const direction = ((oldActive < active || (oldActive + 1 === slides.length && active === 0)) && !(oldActive === 0 && active + 1 === slides.length)) ? -1 : 1;

    // useEffect(() => {
    //     initSlider(70, (index: number) => {

    //         setTimeout(() => {
    //             setChangeBg(false)
    //         }, 100)

    //         const myElement = document.getElementById("title-block") as HTMLElement;
    //         if (myElement) {


    //             setActive(prev => {
    //                 let direct = ((prev < index || (prev + 1 === slides.length && index === 0)) && !(prev === 0 && index + 1 === slides.length)) ? -1 : 1;

    //                 BounceEffect(myElement, {
    //                     startPosition: "0",
    //                     endPosition: `${5 * direct}px`,
    //                     duration: 200,
    //                     easing: "ease-in",
    //                 });

    //                 return index
    //             })
    //         }
    //     })
    // }, [])

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




    return (
        <section className='py-[75px] text-[#000] bg-[#FFF]'>
            <div className="wrapper flex flex-col gap-[50px]">
                <h2 className='leading-[1] tracking-[-0.04em] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px]'>Мы помогаем с документами по отраслям:</h2>
                <div className="cloneable l:h-[470px] h-[710px]">
                    <div className="overlay l:w-[590px] w-full py-[30px] relative z-[0]  rounded-[8px] border border-solid border-[#34446D] overflow-hidden">
                        <div className={`absolute top-0 bottom-0 right-0 left-0 blurred-element z-[10]   ${!changeBg && 'opacity-0 invisible transition-all duration-300'}`}></div>
                        <div className={`overlay-slider absolute  top-0 right-0 left-0 bottom-0 z-[-2]  ${!changeBg && '!bg-[#F5F5F5] transition-all duration-1000'}`}></div>
                        {/* <div className="absolute  top-0 right-0 left-0 bottom-0 bg-[#F5F5F580] z-[-1] backdrop-blur-[10px] ">
                        </div>
                        <div className="flex flex-col justify-between h-full l:items-start items-center w-full">
                            <div className="flex flex-col grow l:gap-[15px] gap-[30px] w-full">
                                <div className="flex items-center gap-[10px] mr-[30px] relative z-[10]">


                                    <div className="h-[50px] p-[10px] pl-[30px]  rounded-r-[4px] bg-[#34446D] w-full border-[#34446D] border-solid border border-l-0">
                                        <span id='title-block' className='text-[24px] font-bold text-[#FFF] block'>
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
                        </div> */}
                        {[...Array(5)].map((_, i) => (
                            <div
                                style={{
                                    zIndex: i
                                }}
                                key={i} className={`absolute wrapper-slide top-0  w-1/5 h-full pointer-events-none z-`}>

                                <Slider {
                                    ...{
                                        ...settings,
                                        autoplaySpeed: 1000 
                                    }
                                }
                                    className="w-[500%] slider">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img src={image.src} alt={image.title} className="w-full h-auto rounded-lg shadow-lg" />
                                            <div className="absolute top-5 left-5 bg-black bg-opacity-50 p-4 rounded-lg text-white">
                                                <h2 className="text-2xl font-bold">{image.title}</h2>
                                                <p className="text-sm mt-2">{image.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        ))}
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

export default SliderMain;



