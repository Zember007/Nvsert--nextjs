import '@/assets/styles/sections/main/main-slider.scss'
import { initSlider, activeIndex } from '@/scripts/slider'
import { useEffect, useState } from 'react';
import ArrowImg from '@/assets/images/svg/arrow-slider.svg'
import Image from 'next/image';
import { slides } from './utils';

const Slider = () => {


    const [active, setActive] = useState<number>(activeIndex.index)

    useEffect(() => {
        initSlider()
    }, [])








    return (
        <section className='py-[75px] text-[#000] bg-[#FFF]'>
            <div className="wrapper flex flex-col gap-[50px]">
                <h2 className='leading-[1] tracking-[-0.04em] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px]'>Мы помогаем с документами по отраслям:</h2>
                <div className="cloneable l:h-[550px] h-[710px]">
                    <div className="overlay l:w-[45%] w-full p-[30px] relative z-[0]  rounded-[8px] border border-solid border-[#CCCCCC] overflow-hidden">
                        <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#F5F5F580] z-[-1] backdrop-blur-[10px] ">

                        </div>
                        <div className="flex flex-col justify-between h-full l:items-start items-center">
                            <div className="flex flex-col grow l:gap-[10px] gap-[30px]">
                                <div className="flex items-center gap-[10px]">


                                    <div className="p-[10px] rounded-[4px] bg-[#0000001A]">
                                        <span className='text-[28px] font-bold'>
                                            {
                                                slides[active].title
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="l:grow">
                                    <p className="text-[16px] l:my-auto tracking-normal">

                                        {
                                            slides[active].text
                                        }

                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between items-end w-full">
                                <div className="flex gap-[10px]">
                                    <button
                                        onClick={() => {
                                            setTimeout(() => {
                                                setActive(activeIndex.index)
                                            }, 300)
                                        }}
                                        aria-label="previous slide" data-slider="button-prev" className="w-[100px] h-[50px] rounded-[4px] bg-[#000000] flex items-center justify-center">
                                        <Image src={ArrowImg} alt='prev' width={34} height={45} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setTimeout(() => {
                                                setActive(activeIndex.index)
                                            }, 300)
                                        }}
                                        aria-label="previous slide" data-slider="button-next" className="w-[100px] h-[50px] rounded-[4px] bg-[#000000] flex items-center justify-center">
                                        <Image src={ArrowImg} alt='next' className='rotate-[180deg]' width={34} height={45} />
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
                    <div className="slide-main l:inset-[0%] l:h-full h-[300px] l:bottom-0 bottom-[80px] l:z-0 z-[]">
                        <div className="slider-wrap">
                            <div data-slider="list" className="slider-list">

                                {
                                    slides.map((item, index) => (
                                        <div key={index} data-slider="slide" className="slider-slide active l:w-[710px] l:h-[550px] w-[415px] h-[306px]">
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
