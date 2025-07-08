
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { skills } from './utils';
import AppSkillBlock from './elements/AppSkillBlock';
import '@/assets/styles/sections/main/animation/skills.scss'
import { useTranslation } from 'react-i18next';
import useWindowWidth from '@/hook/useWindowWidth';
import { horizontalLoop } from '@/scripts/slider';
import Link from 'next/link';
import Image from 'next/image';
import { filterPrepositions } from '@/hook/filter';
import ArrowImg from '@/assets/images/svg/arrow-small.svg'
import { useIntersectionObserver } from '@/hook/useIntersectionObserver';
import { useButton } from '@/hook/useButton';

gsap.registerPlugin(Draggable);

const AppMainSkills = () => {

    const { t } = useTranslation()
    const widthWindow = useWindowWidth()
    const [isVisible, setIsVisible] = useState(false);
    const { ref, isVisible: isVisibleSection } = useIntersectionObserver();
    const skillsData = (widthWindow && widthWindow < 1240) ? skills.filter(item => !item.empty) : skills;

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (entry.isIntersecting && ref.current) observer.unobserve(ref.current); timeLine.current?.next({ ease: "power3", duration: 0.725 });
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }




        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }

        };
    }, []);

    const timeLine = useRef<any>(null)
    const [activeIndex, setActive] = useState<number>(0)


    useEffect(() => {
        if (widthWindow && widthWindow < 1240 && isVisibleSection) {
            const slides = gsap.utils.toArray('[data-slider="slide-skill"]');
            const gap = (widthWindow - 320) / 2
            timeLine.current = horizontalLoop(slides, {
                paused: true,
                center: true,
                draggable: true,
                gap: gap,
                snap: true,
                onChange: (index: number) => {
                    setActive(index)
                }
            });




        }
        return () => {
            if (timeLine.current) {
                timeLine.current.kill();
            }
        }

    }, [widthWindow, isVisibleSection])

    const { setButtonRef, setWrapperRef } = useButton()

    return (

        <section
            ref={ref}
            className="section wrapper">
            <h2 className="section__title">Наши основные преимущества</h2>
            <div className="skills__wrapper">
                <div className="flex flex-col gap-[20px]">
                    <div className="skills__box"
                        style={{ ...(widthWindow && widthWindow < 1240 && { gap: (widthWindow - 320) / 2 }) }}
                    >

                        {
                            skillsData.map((skill, index) => {
                                if (skill.empty) return <div key={index}></div>;

                                return (
                                    <div
                                        key={index}
                                        data-slider="slide-skill"
                                    >
                                        <AppSkillBlock
                                            img={skill.img} title={t(`MainSkills.${skill.key}.title`)} isVisible={isVisible} text={t(`MainSkills.${skill.key}.text`, { returnObjects: true }) as string[]} bg={skill.bg} folder={skill.folder} />

                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="slide-dots-box">
                        {skillsData.map((_, i) => (
                            <div
                                onClick={() => {
                                    timeLine.current.toIndex(i, { ease: "power3", duration: 0.725 })
                                }}
                                key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
                        ))}
                    </div>

                </div>

                <h3 className='skills__wrapper-desc arial'>
                    {filterPrepositions('Наша компания признана одной из ведущих на рынке сертификации в Российской Федерации и стран Евразийского Экономического Союза. Специалисты NVSERT предоставляют широкий спектр услуг, направленный на оформление обязательной и добровольной сертификации, декларирования, соответствия требованиям технических регламентов и других документов, подтверждающих качество выпускаемой продукции.')}
                </h3>

                <div className="tariff-wrap xl:w-[252px] w-[280px] m:mx-0 mx-auto mt-[20px] " ref={setWrapperRef}>
                    <button
                        ref={setButtonRef} className=' slider__button group btnIconAn doc-btn tariff'>
                        <span className="sendIconLeft">
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 8.5V6.5H0V8.5H3ZM8.96767 0.5L7.52908 1.93076L12.1092 6.48713H6V8.51185H12.1092L7.52908 13.0682L8.96767 14.5L16 7.5L15.2822 6.78462L14.5634 6.06823L8.96767 0.5Z" fill="#34446D" />
                            </svg>
                        </span>
                        <span
                            className="sendText"
                        >Подробнее о компании</span>
                    </button>
                </div>
            </div>
        </section >
    );
};

export default AppMainSkills;