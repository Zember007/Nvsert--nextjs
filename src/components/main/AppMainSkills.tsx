import FolderImg from '@/assets/images/folder.webp'
import ArrowImg from '@/assets/images/svg/arrow-small.svg'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { horizontalLoop } from '@/scripts/slider';
import Link from 'next/link';
import { skills } from './utils';
import AppSkillBlock from './elements/AppSkillBlock';
import '@/assets/styles/sections/main/animation/skills.scss'


gsap.registerPlugin(Draggable);

const AppMainSkills = () => {

   



    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const skillsData = !isMobile ? skills : skills.filter((item) => !item.empty);

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

        const handleResize = () => {
            setIsMobile(window.innerWidth < 1240);
        };

        window.addEventListener("resize", handleResize);
        handleResize()

        return () => {
            if (divRef.current) {
                observer.unobserve(divRef.current);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, []);




    useEffect(() => {
        if (!isMobile || !sliderRef.current) return;

        const slider = sliderRef.current;
        horizontalLoop(slider.children, {
            paused: true,
            draggable: true,
            snap: true,
            onChange: (el: any, index: number) => setCurrentIndex(index),
        });


    }, [isMobile, skillsData.length]);

    // const goToSlide = (index:number) => {
    //     if (!isMobile || !sliderRef.current) return;
    //     gsap.to(sliderRef.current, {
    //         x: -index * sliderRef.current.clientWidth,
    //         duration: 0.5,
    //         ease: "power2.out",
    //         onComplete: () => setCurrentIndex(index),
    //     });
    // };
    return (
        <section
            className="py-[75px] relative">
            <div className="wrapper flex flex-col gap-[50px]">
                <h2 className="leading-[1] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px]">Наши основные преимущества</h2>
                <div className="flex flex-col">
                    <div ref={sliderRef} className="flex xl:grid grid-cols-4 l:gap-[20px]">
                        {
                            skillsData.map((skill, index) => (
                                <div key={index}>
                                    {(skill.empty) ? (
                                        <div></div>
                                    )
                                        : skill.folder ? (
                                            <div className={`l:mr-0 mr-[20px] relative rounded-[4px] overflow-hidden bg-[#FFF] w-full min-w-[300px] h-[250px]`}>
                                                <Image alt='folder' src={FolderImg} height={280} />
                                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#34446D] mix-blend-hue"></div>
                                            </div>
                                        )
                                            :
                                         <AppSkillBlock {...skill} isVisible={isVisible} />
                                    }
                                </div>
                            ))
                        }
                    </div>

                    {isMobile &&
                        <li className='flex gap-[2px] mt-[20px] mx-[20px]'>
                            {skillsData.map((_, index) =>
                                <ul key={index}
                                    className={`${index === currentIndex && 'bg-[#34446D]'} h-[10px] w-[10px] rounded-[50%] border border-solid border-[#34446D]`}></ul>
                            )}
                        </li>}

                    <p className='text-[20px] leading-[1.5] mt-[30px]'>
                        Наша компания признана одной из ведущих на рынке сертификации в Российской Федерации и стран Евразийского Экономического Союза. Специалисты NVSERT предоставляют широкий спектр услуг, направленный на оформление обязательной и добровольной сертификации, декларирования, соответствия требованиям технических регламентов, регистрационных удостоверений, европейских сертификатов и других документов, подтверждающих качество выпускаемой продукции.
                    </p>
                    <Link
                        href={'/about'}
                        className='flex items-center gap-[8px] mt-[32px]'
                    >
                        <span className='text-[20px] font-bold'>Подробнее о компании</span>                        
                            <Image src={ArrowImg} alt='arrow' width={24} height={24} />
                    </Link>
                </div>
            </div>
            <div ref={divRef} className='top-0 bottom-0 left-0 right-0 absolute pointer-events-none'></div>
        </section >
    );
};

export default AppMainSkills;