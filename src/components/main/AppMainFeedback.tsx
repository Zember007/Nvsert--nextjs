
import { PhotoProvider } from 'react-photo-view';
import Feedback from './elements/Feedback';
import 'react-photo-view/dist/react-photo-view.css';
import { useEffect, useRef, useState } from 'react';
import { horizontalLoop } from '@/scripts/slider';
import { useButton } from '@/hook/useButton';
import Image from 'next/image';





const AppMainFeedback = () => {

    const { setButtonRef, setWrapperRef } = useButton()


    return (
        <section className="py-[75px]">
            <div className="wrapper flex flex-col gap-[40px]">
                <div className="flex justify-between items-center">
                    <h2 className="leading-[1] tracking-[-0.04em] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px]">Реальные отзывы клиентов</h2>
                    <div className="flex gap-[10px]">


                        <div
                            ref={setWrapperRef}
                            className="tariff-wrap w-[100px]">
                            <button
                                ref={setButtonRef}
                                aria-label="previous slide" data-slider="button-prev"
                                className="tariff hover:bg-[#34446D] group h-[50px] rounded-[4px] border-[#34446D] border border-solid flex items-center justify-center">

                                <svg className='group-hover:*:*:fill-[#FFF] *:*:transition-all *:*:duration-300' xmlns="http://www.w3.org/2000/svg" width="46" height="38" viewBox="0 0 46 38" fill="none">
                                    <path d="M24.4482 34.9009H28.7887" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                    <path d="M24.4482 3.02588L28.7887 3.02588" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                    <g filter="url(#filter0_d_1459_613)">
                                        <path d="M30.1421 2H23.8391L10.1421 18.962L23.8391 35.9239H30.1421L16.4451 18.962L30.1421 2Z" fill="#34446D" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_1459_613" x="7" y="0" width="27" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 5 0" result="hardAlpha" />
                                            <feOffset dx="1" dy="0" />
                                            <feGaussianBlur stdDeviation="0.723404" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1459_613" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1459_613" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                        <div
                            ref={setWrapperRef}
                            className="tariff-wrap w-[100px]">
                            <button
                                ref={setButtonRef}
                                aria-label="previous slide" data-slider="button-next"
                                className=" tariff group hover:bg-[#34446D] h-[50px] rounded-[4px] border-[#34446D] border border-solid flex items-center justify-center">

                                <svg className='rotate-[180deg] group-hover:*:*:fill-[#FFF] *:*:transition-all *:*:duration-300' xmlns="http://www.w3.org/2000/svg" width="46" height="38" viewBox="0 0 46 38" fill="none">
                                    <path d="M24.4482 34.9009H28.7887" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                    <path d="M24.4482 3.02588L28.7887 3.02588" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                    <g filter="url(#filter0_d_1459_613)">
                                        <path d="M30.1421 2H23.8391L10.1421 18.962L23.8391 35.9239H30.1421L16.4451 18.962L30.1421 2Z" fill="#34446D" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_1459_613" x="7" y="0" width="27" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 5 0" result="hardAlpha" />
                                            <feOffset dx="1" dy="0" />
                                            <feGaussianBlur stdDeviation="0.723404" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1459_613" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1459_613" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative h-[820px] flex flex-col gap-[10px] overflow-hidden">
                    <div className="slide-blur left-0">
                        <span className="line" style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '8px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '6px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '3px', '--lightness': '100%' } as React.CSSProperties}></span>
                    </div>

                    <div className="flex gap-[10px]">
                        {[...Array(5)].map((_, index) =>
                            <div key={index} className="border-[#CCCCCC] border border-solid overflow-hidden rounded-[4px]">
                                <Image src={'/feedback/1.webp'} alt='feedback' width={250} height={356} />
                            </div>)}
                    </div>

                    <div className="flex gap-[10px] h-[356px]">
                        {[...Array(6)].map((_, index) =>
                            <div key={index} className="border-[#CCCCCC] border border-solid overflow-hidden rounded-[4px]">
                                <Image src={'/feedback/1.webp'} alt='feedback' width={250} height={356} />
                            </div>)}
                    </div>


                    <div className="slide-blur right-0 !translate-x-[0]">
                        <span className="line" style={{ '--blur': '3px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '6px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '8px', '--lightness': '100%' } as React.CSSProperties}></span>
                        <span className="line" style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppMainFeedback;