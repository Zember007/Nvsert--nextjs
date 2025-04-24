
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
            paused: false,
            draggable: true,
            offsetLeft: 0,
            repeat: -1,
            gap: 0
        });

        const loop1: any = horizontalLoop(slides1, {
            paused: false,
            draggable: true,
            offsetLeft: 0,
            repeat: -1,
            gap: 0,
            reversed: true
        });



      


//         const wrappers = document.querySelectorAll('.feedback-slider-container');
//         const wrapper = document.querySelector('.feedback-slider-box');

//         if (wrappers.length && wrapper) {

//             let bounds: any = [];
//             let initialCursorX = 0;
//             let initialSliderTime = [0, 0];
//             wrappers.forEach((wrapper, index) => {

//                 bounds[index] = wrapper.getBoundingClientRect()

//                 initialSliderTime[0] = loop.time();
//                 initialSliderTime[1] = loop1.time();

//                 wrapper.addEventListener("mouseenter", (e: any) => {
//                     bounds[index] = wrapper.getBoundingClientRect();
//                     initialCursorX = e.clientX - bounds[index].left;

//                     initialSliderTime[0] = loop.time();
//                     initialSliderTime[1] = loop1.time();

//                 })




//                 window.addEventListener("resize", () => {
//                     bounds[index] = wrapper.getBoundingClientRect();
//                 });
//             })
//             wrapper.addEventListener("mousemove", (e: any) => {


//                 if (!bounds[0] || !bounds[1] || !initialCursorX || !initialSliderTime[0] || !initialSliderTime[1]) return;
//                 const currentX = e.clientX - bounds[0].left;
//                 const currentX1 = e.clientX - bounds[1].left;

//                 const deltaX = currentX - initialCursorX;
//                 const ratioDelta = -deltaX / bounds[0].width;
//                 const deltaTime = ratioDelta * loop.duration();
//                 const deltaX1 = currentX1 - initialCursorX;
//                 const ratioDelta1 = -deltaX1 / bounds[1].width;
//                 const deltaTime1 = ratioDelta1 * loop1.duration();
// ;

//                 const totalDuration = loop.duration();
//                 const current = loop.totalTime();
//                 let target = initialSliderTime[0] + deltaTime;

//                 target = gsap.utils.wrap(0, totalDuration, target);

//                 let diff = target - (current % totalDuration);
//                 if (Math.abs(diff) > totalDuration / 2) {
//                     diff += (diff < 0 ? totalDuration : -totalDuration);
//                 }
//                 target = current + diff;

//                 gsap.to(loop, {
//                     totalTime: target,
//                     duration: 2,
//                     ease: "power4"
//                 });

//                 const totalDuration1 = loop1.duration();
//                 const current1 = loop1.totalTime();
//                 let target1 = initialSliderTime[1] + deltaTime1;

//                 target1 = gsap.utils.wrap(0, totalDuration1, target1);

//                 let diff1 = target1 - (current1 % totalDuration1);
//                 if (Math.abs(diff1) > totalDuration1 / 2) {
//                     diff1 += (diff1 < 0 ? totalDuration1 : -totalDuration1);
//                 }
//                 target1 = current1 + diff1;

//                 gsap.to(loop1, {
//                     totalTime: target1,
//                     duration: 1.2,
//                     ease: "power4"
//                 });
//             });

//         }



    

        return () => {
            loop.kill();
            loop1.kill();
        }
    }, [])


    return (
        <section className="py-[75px]">
            <PhotoProvider maskOpacity={0.4} maskClassName="blurred-mask">
                <div className="wrapper flex flex-col gap-[40px]">
                <h2 className="leading-[1] tracking-[-0.04em] text-center text-[24px] xs:text-[40px] l:text-[56px]">Реальные отзывы клиентов</h2>                    


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