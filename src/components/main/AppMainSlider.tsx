import '@/assets/styles/sections/main/main-slider.scss'
import { initSlider } from '@/scripts/slider'
import { useEffect } from 'react';
import ArrowImg from '@/assets/images/svg/arrow-slider.svg'
import Image from 'next/image';
import ImgSlider from '@/assets/images/slider/1.webp'


const Slider = () => {

    useEffect(() => {
        initSlider()
    }, [])

    return (
        <section className='py-[75px] text-[#000]'>
            <div className="wrapper flex flex-col gap-[50px]">
                <h2 className='text-[56px]'>Мы помогаем с документами по отраслям:</h2>
                <div className="cloneable">
                    <div className="overlay pr-[20px]">
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex items-center gap-[10px]">
                                <div className="flex item-center text-[32px] font-bold">
                                    <div className="count-column">
                                        <h2 data-slide-count="step" className="count-heading">01</h2>
                                    </div>
                                    <span className='translate-y-[2px]'>/</span>
                                    <div className="count-column">
                                        <h2 data-slide-count="total" className="count-heading">04</h2>
                                    </div>
                                </div>

                                <div className="py-[10px] px-[25px] rounded-[4px] bg-[#0000001A]">
                                    <span className='text-[20px] font-bold'>Лёгкая промышленность</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <p className='text-[16px]'>
                                    Одежда, обувь и другие товары лёгкой промышленности подлежат обязательной оценке качества — их проверяют в лабораторных условиях, после чего предприниматель получает разрешительный документ (сертификат или декларацию на данный тип продукции). Полученный документ даёт возможность законно производить и импортировать, а также продавать данный тип продукции в России, а также на территории Таможенного союза. Только после прохождения сертификации лёгкой промышленности можно осуществлять деятельность на легитимных условиях — в противном случае компанию ждут серьёзные наказания административного характера.

                                </p>
                                <p className='text-[16px]'>

                                    Классифицируют и идентифицируют текстильные товары по кодам продукции ТН ВЭД. Чтобы провести сертификацию продукции лёгкой промышленности, предприниматель должен предварительно определить код товара.
                                </p>
                            </div>
                            <div className="overlay-nav-row">
                                <button aria-label="previous slide" data-slider="button-prev" className="w-[100px] h-[50px] rounded-[4px] bg-[#000000] flex items-center justify-center">
                                    <Image src={ArrowImg} alt='prev' width={34} height={45} />
                                </button>
                                <button aria-label="previous slide" data-slider="button-next" className="w-[100px] h-[50px] rounded-[4px] bg-[#000000] flex items-center justify-center">
                                    <Image src={ArrowImg} alt='next' className='rotate-[180deg]' width={34} height={45} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="slide-main">
                        <div className="slider-wrap">
                            <div data-slider="list" className="slider-list">
                                <div data-slider="slide" className="slider-slide">
                                    <div className="slide-inner">
                                        
                                    <Image src={ImgSlider} alt='asdasd'sizes="(max-width: 479px) 100vw, 560px"/>
                                    
                                        <div className="slide-caption">
                                            <div className="caption-dot"></div>
                                            <p className="caption">Layout nº001</p>
                                        </div>
                                    </div>
                                </div>
                                <div data-slider="slide" className="slider-slide active">
                                    <div className="slide-inner">
                                    <Image src={ImgSlider} alt='asdasd'sizes="(max-width: 479px) 100vw, 560px"/>
                                        <div className="slide-caption">
                                            <div className="caption-dot"></div>
                                            <p className="caption">Layout nº002</p>
                                        </div>
                                    </div>
                                </div>
                                <div data-slider="slide" className="slider-slide">
                                    <div className="slide-inner">
                                    <Image src={ImgSlider} alt='asdasd'sizes="(max-width: 479px) 100vw, 560px"/>
                                        <div className="slide-caption">
                                            <div className="caption-dot"></div>
                                            <p className="caption">Layout nº003</p>
                                        </div>
                                    </div>
                                </div>
                                <div data-slider="slide" className="slider-slide">
                                    <div className="slide-inner">
                                    <Image src={ImgSlider} alt='asdasd'sizes="(max-width: 479px) 100vw, 560px"/>
                                        <div className="slide-caption">
                                            <div className="caption-dot"></div>
                                            <p className="caption">Layout nº004</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slider;
