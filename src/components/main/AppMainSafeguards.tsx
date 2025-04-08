
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";

import SafeguardBlock from './elements/AppSafeguardBlock';
import '@/assets/styles/sections/main/animation/skills.scss'




const AppMainSafeguards = () => {

    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);





    useEffect(() => {
        if (typeof window === "undefined") return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (divRef.current) {
            observer.observe(divRef.current);
        }




        return () => {
            if (divRef.current) {
                observer.unobserve(divRef.current);
            }

        };
    }, []);






    return (
        <section
            className="py-[75px] relative">
            <div className="wrapper flex flex-col gap-[40px]">
                <h2 className="leading-[1] tracking-[-0.04em] text-center  text-[24px] xs:text-[40px] l:text-[56px]">Наши основные преимущества</h2>
                <div className="flex gap-[20px]">
                    <SafeguardBlock />
                </div>
            </div>
            <div ref={divRef} className='top-0 bottom-0 left-0 right-0 absolute pointer-events-none'></div>
        </section >
    );
};

export default AppMainSafeguards;