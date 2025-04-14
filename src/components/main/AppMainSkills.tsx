
import ArrowImg from '@/assets/images/svg/arrow-small.svg'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Link from 'next/link';
import { skills } from './utils';
import AppSkillBlock from './elements/AppSkillBlock';
import '@/assets/styles/sections/main/animation/skills.scss'
import { filterPrepositions } from '@/hook/filter';


gsap.registerPlugin(Draggable);

const AppMainSkills = () => {

    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);
    const skillsData = skills;

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
                <div className="flex flex-col">
                    <div  className="flex xl:grid grid-cols-4 l:gap-[20px]">
                        {
                            skillsData.map((skill, index) => (
                                <div key={index}>
                                    {(skill.empty) ? (
                                        <div></div>
                                    )
                                        :

                                        <AppSkillBlock index={index} {...skill} isVisible={isVisible} />
                                    }
                                </div>
                            ))
                        }
                    </div>



                    <p className='text-[18px] leading-[1.5] mt-[40px]'>
                        {filterPrepositions('Наша компания признана одной из ведущих на рынке сертификации в Российской Федерации и стран Евразийского Экономического Союза. Специалисты NVSERT предоставляют широкий спектр услуг, направленный на оформление обязательной и добровольной сертификации, декларирования, соответствия требованиям технических регламентов и других документов, подтверждающих качество выпускаемой продукции.')}
                    </p>
                    <Link
                        href={'/about'}
                        className='flex items-center gap-[8px] mt-[28px]'
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