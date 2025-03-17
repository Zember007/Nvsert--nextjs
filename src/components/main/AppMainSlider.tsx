import '@/assets/styles/sections/main/main-slider.scss'
import { initSlider, activeIndex } from '@/scripts/slider'
import { useEffect, useState } from 'react';
import ArrowImg from '@/assets/images/svg/arrow-slider.svg'
import Image from 'next/image';
import { slides } from './utils';
import { filterPrepositions } from '@/hook/filter';

const Slider = () => {


    const [active, setActive] = useState<number>(activeIndex.index)
    const [changeBg, setChangeBg] = useState(false)

    useEffect(() => {
        initSlider()
    }, [])


    return (
        <section className='py-[75px] text-[#000] bg-[#FFF]'>
            <div className="wrapper flex flex-col gap-[50px]">
                <h2 className='leading-[1] tracking-[-0.04em] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px]'>Мы помогаем с документами по отраслям:</h2>
                <div className="cloneable l:h-[470px] h-[710px]">
                    <div className="overlay animation-content l:w-[45%] w-full py-[30px] relative z-[0]  rounded-[8px] border border-solid border-[#737373] overflow-hidden">
                        <div className={`overlay-slider absolute  top-0 right-0 left-0 bottom-0 z-[-2]  ${!changeBg && '!bg-[#F5F5F5] transition-all duration-1000'}`}></div>
                        <div className="absolute  top-0 right-0 left-0 bottom-0 bg-[#F5F5F580] z-[-1] backdrop-blur-[10px] ">
                        </div>
                        <div className="flex flex-col justify-between h-full l:items-start items-center">
                            <div className="flex flex-col grow l:gap-[15px] gap-[30px]">
                                <div className="flex items-center gap-[10px] mr-[30px]">


                                    <div className="py-[6.2px] px-[10px] pl-[30px]  rounded-r-[4px] bg-[#0000001A] w-full border-[#CCCCCC] border-solid border">
                                        <span className='text-[24px] font-bold text-[#34446D]'>
                                            {
                                                filterPrepositions(slides[active].title)
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="l:grow relative w-full h-full px-[30px]">

                                    <p className={` text-[16px] l:my-auto tracking-normal translate-y-[15px] opacity-0   ${!changeBg && ' !opacity-100 !translate-y-[0px] duration-500 transition-all'} `}>

                                        {
                                            filterPrepositions(slides[active].text)
                                        }

                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between items-end w-full px-[30px]">
                                <div className="flex gap-[10px]">
                                    <button
                                        onClick={() => {
                                            setChangeBg(true)
                                            setTimeout(() => {
                                                setActive(activeIndex.index)
                                                setChangeBg(false)
                                            }, 300)
                                        }}
                                        aria-label="previous slide" data-slider="button-prev" className="w-[100px] h-[50px] rounded-[4px] bg-[#0000001A] border-[#34446D] border border-solid flex items-center justify-center">
                                        <Image src={ArrowImg} alt='prev' width={20} height={34} className='rotate-[180deg]' />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setChangeBg(true)
                                            setTimeout(() => {
                                                setActive(activeIndex.index)
                                                setChangeBg(false)
                                            }, 300)
                                        }}
                                        aria-label="previous slide" data-slider="button-next" className="w-[100px] h-[50px] rounded-[4px] bg-[#0000001A] border-[#34446D] border border-solid flex items-center justify-center">
                                        <Image src={ArrowImg} alt='next' width={20} height={34} />
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
                                        setChangeBg(true)
                                        setTimeout(() => {
                                            setActive(activeIndex.index)
                                            setChangeBg(false)
                                        }, 1000)
                                    }
                                }}
                                onMouseLeave={() => {
                                    setTimeout(() => {
                                        setActive(activeIndex.index)
                                        setChangeBg(false)
                                    }, 300)
                                }}
                            >

                                {
                                    slides.map((item, index) => (
                                        <div
                                            key={index} data-slider="slide" className="slider-slide active l:w-[547px] l:h-[410px] w-[415px] h-[306px]">
                                            <div className="slide-inner relative bg-[#FFF]">
                                                <Image src={item.img} alt='slide' fill
                                                    style={{ objectFit: 'cover' }} />
                                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#34446D] mix-blend-hue"></div>

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
