
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Feedback from './elements/Feedback';
import 'react-photo-view/dist/react-photo-view.css';
import { useEffect, useRef, useState } from 'react';
import { horizontalLoop } from '@/scripts/slider';
import { useButton } from '@/hook/useButton';
import Image from 'next/image';
import gsap from 'gsap';
import Draggable from "gsap/dist/Draggable";
import InertiaPlugin from "@/scripts/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);



const AppMainFeedback = () => {

    const { setButtonRef, setWrapperRef } = useButton()

    useEffect(() => {
        const slides = gsap.utils.toArray('[data-slider="slide-feedback"]');
        const slides1 = gsap.utils.toArray('[data-slider="slide-feedback1"]');
        const loop: any = horizontalLoop(slides, {
            paused: true,
            offsetLeft: 0,
            gap: 0            
        });

        const loop1: any = horizontalLoop(slides1, {
            paused: true,
            offsetLeft: 0,
            gap: 0
        });


        const nextButton = document.querySelector('[data-slider="feedback-next"]');
        const prevButton = document.querySelector('[data-slider="feedback-prev"]');
        loop.next({ ease: "power3", duration: 0.725 })
        loop1.next({ ease: "power3", duration: 0.725 })



        const wrappers = document.querySelectorAll('.feedback-slider-container');
        const wrapper = document.querySelector('.feedback-slider-box');

        if (wrappers.length && wrapper) {

            let bounds: any = [];
            let initialCursorX = 0;
            let initialSliderTime = [0, 0];
            wrappers.forEach((wrapper, index) => {

                bounds[index] = wrapper.getBoundingClientRect()

                wrapper.addEventListener("mouseenter", (e: any) => {
                    bounds[index] = wrapper.getBoundingClientRect();
                    initialCursorX = e.clientX -  bounds[index].left;
                    initialSliderTime[0] = loop.time();
                    initialSliderTime[1] = loop1.time();
                    loop.pause()
                    loop1.pause()
                })



                window.addEventListener("resize", () => {
                    bounds[index] = wrapper.getBoundingClientRect();
                });
            })

            wrapper.addEventListener("mousemove", (e: any) => {

                
                if ( !bounds[0] || !bounds[1] || !initialCursorX || !initialSliderTime[0] || !initialSliderTime[1]) return;
                const currentX = e.clientX - bounds[0].left;
                const currentX1 = e.clientX - bounds[1].left;

                const deltaX = currentX - initialCursorX;
                const ratioDelta = -deltaX / bounds[0].width;
                const deltaTime = ratioDelta * loop.duration();
                const deltaX1 = currentX1 - initialCursorX;
                const ratioDelta1 = -deltaX1 / bounds[1].width;
                const deltaTime1 = ratioDelta1 * loop1.duration();

                const time = initialSliderTime[0] + deltaTime;
                const time1 = initialSliderTime[1] + deltaTime1;


                gsap.to(loop1, {
                    time:time1,
                    duration: 1.2,
                    ease: "power4"
                });

                gsap.to(loop, {
                    time,
                    duration: 2,
                    ease: "power4"
                });
            });

        }



        if (nextButton) {
            nextButton.addEventListener("click", () => {
                loop.next({ ease: "power3", duration: 0.725 })
                loop1.next({ ease: "power3", duration: 0.725 })
            });
        }
        if (prevButton) {
            prevButton.addEventListener("click", () => {
                loop.previous({ ease: "power3", duration: 0.725 })
                loop1.previous({ ease: "power3", duration: 0.725 })
            });
        }

        return () => {
            loop.kill();
            loop1.kill();
            if (nextButton) nextButton.removeEventListener("click", loop.next);
            if (prevButton) prevButton.removeEventListener("click", loop.previous);
        }
    }, [])


    return (
        <section className="py-[75px]">
            <PhotoProvider maskOpacity={0.4} maskClassName="blurred-mask">
                <div className="wrapper flex flex-col gap-[40px]">
                    <div className="flex justify-between items-center">
                        <h2 className="leading-[1] tracking-[-0.04em] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px]">Реальные отзывы клиентов</h2>
                        <div className="flex gap-[10px]">


                            <div
                                ref={setWrapperRef}
                                className="tariff-wrap w-[100px]">
                                <button
                                    ref={setButtonRef}
                                    aria-label="previous slide" data-slider="feedback-prev"
                                    className="tariff hover:bg-[#34446D] group h-[50px] rounded-[4px] border-[#34446D] border border-solid flex items-center justify-center">

                                    <svg className='group-hover:*:*:fill-[#FFF] *:*:transition-all *:*:duration-300' xmlns="http://www.w3.org/2000/svg" width="46" height="38" viewBox="0 0 46 38" fill="none">
                                        <path d="M24.4482 34.9009H28.7887" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                        <path d="M24.4482 3.02588L28.7887 3.02588" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                        <g filter="url(#filter0_d_1459_6123)">
                                            <path d="M30.1421 2H23.8391L10.1421 18.962L23.8391 35.9239H30.1421L16.4451 18.962L30.1421 2Z" fill="#34446D" />
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_1459_6123" x="7" y="0" width="27" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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
                                    aria-label="previous slide" data-slider="feedback-next"
                                    className=" tariff group hover:bg-[#34446D] h-[50px] rounded-[4px] border-[#34446D] border border-solid flex items-center justify-center">

                                    <svg className='rotate-[180deg] group-hover:*:*:fill-[#FFF] *:*:transition-all *:*:duration-300' xmlns="http://www.w3.org/2000/svg" width="46" height="38" viewBox="0 0 46 38" fill="none">
                                        <path d="M24.4482 34.9009H28.7887" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                        <path d="M24.4482 3.02588L28.7887 3.02588" stroke="#424242" strokeWidth="0.600425" strokeLinecap="round" />
                                        <g filter="url(#filter0_d_1459_633)">
                                            <path d="M30.1421 2H23.8391L10.1421 18.962L23.8391 35.9239H30.1421L16.4451 18.962L30.1421 2Z" fill="#34446D" />
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_1459_633" x="7" y="0" width="27" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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

                    <div className="relative h-[554px] flex flex-col gap-[10px] overflow-hidden feedback-slider-box">

                        <div className="slide-blur left-0">
                            <span className="line" style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                            <span className="line" style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}></span>
                            <span className="line" style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}></span>
                        </div>

                        <div className="slide-main">
                            <div className="slider-wrap !pt-0 ">


                                <div className="flex gap-[20px] feedback-slider-container translate-x-[-95px]">
                                    {[...Array(10)].map((_, index) =>
                                        <div data-slider="slide-feedback" key={index} className="border-[#CCCCCC] border border-solid overflow-hidden w-[190px] h-[267px] rounded-[4px]">
                                            <PhotoView src={`/feedback/${index}.png`}>
                                                <Image src={`/feedback/${index}.png`} alt='feedback' width={190} height={267} />
                                            </PhotoView>
                                        </div>)}
                                </div>



                            </div>

                        </div>

                        <div className="slide-main bottom-0">
                            <div className="slider-wrap !pt-0">


                                <div className="flex gap-[20px] translate-x-[-95px] feedback-slider-container">
                                    {[...Array(10)].map((_, index) =>
                                        <div data-slider="slide-feedback1" key={index} className="border-[#CCCCCC] border border-solid overflow-hidden w-[190px] h-[267px] rounded-[4px]">
                                            <PhotoView src={`/feedback/${index}.png`}>
                                                <Image src={`/feedback/${index}.png`} alt='feedback' width={190} height={267} />
                                            </PhotoView>
                                        </div>)}
                                </div>



                            </div>

                        </div>



                        <div className="slide-blur right-0 !translate-x-[0]">
                            <span className="line" style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}></span>
                            <span className="line" style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}></span>
                            <span className="line" style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                        </div>

                    </div>
                </div>
            </PhotoProvider>
        </section>
    );
};

export default AppMainFeedback;