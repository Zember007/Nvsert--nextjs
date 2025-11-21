'use client'
import { useEffect, useRef, useState } from 'react';
import { skills } from './utils';
import AppSkillBlock from './elements/AppSkillBlock';
import '@/assets/styles/sections/main/animation/skills.scss'
import '@/assets/styles/sections/main/main-skills-component.scss'
import { useTranslation } from 'react-i18next';
import useWindowSize from '@/hook/useWindowSize';
import { filterPrepositions } from '@/hook/filter';
import { useIntersectionObserver } from '@/hook/useIntersectionObserver';
import Button from '@/components/ui/Button';

const AppMainSkills = () => {

    const { t } = useTranslation()
    const { width: widthWindow } = useWindowSize()
    const { ref, isVisible: isVisibleSection } = useIntersectionObserver({}, true);
    const skillsData = (widthWindow && widthWindow < 1407) ? skills.filter(item => !item.empty) : skills;

    useEffect(() => {
        let alignInterval: NodeJS.Timeout | null = null;

        const observer = new IntersectionObserver(
            async ([entry]) => {
              
                if (entry.isIntersecting && ref.current) {
                    if (widthWindow && widthWindow < 1407) {

                        const [gsapModule, sliderModule] = await Promise.all([
                            import('gsap'),
                            import('@/scripts/slider')
                        ]);
                        const gsap = gsapModule.default || gsapModule;
                        const { horizontalLoop } = sliderModule;

                        const slides = gsap.utils.toArray('[data-slider="slide-skill"]');
                        const gap = widthWindow < 960 ? (widthWindow - (250)) / 2 : 20;

                        timeLine.current = horizontalLoop(slides, {
                            paused: true,
                            center: widthWindow >= 960 ? false : true,
                            draggable: true,
                            mobile: true,
                            gap: Math.round(gap),
                            snap: true,
                            onChange: (index: number) => {
                                setActive(index);
                                // Принудительное выравнивание после изменения активного слайда
                                if (timeLine.current && timeLine.current.alignPositions) {
                                    setTimeout(() => timeLine.current?.alignPositions(), 50);
                                }
                            }
                        });

                        // Принудительное выравнивание через короткий интервал
                        alignInterval = setInterval(() => {
                            if (timeLine.current && timeLine.current.alignPositions) {
                                timeLine.current.alignPositions();
                            }
                        }, 100);
                    }
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                    timeLine.current?.next({ ease: "power3", duration: 0.725 });
                }
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

            if (alignInterval) {
                clearInterval(alignInterval);
            }

            if (timeLine.current) {
                timeLine.current.destroy();
                timeLine.current = null;
            }
        };
    }, [widthWindow]);

    const timeLine = useRef<any>(null)
    const [activeIndex, setActive] = useState<number>(0)



    return (

        <section
            ref={ref}
            className="section ">
            <div id="skills" className="absolute top-[-50px] pointer-events-none" ></div>

            <h2 className="section__title header-h-2">Наши основные преимущества</h2>
            <div className="skills__wrapper">
                <div className="skills-content-container">
                    <div className="skills__box"
                        style={{ ...(widthWindow && widthWindow < 960 && { gap: Math.round((widthWindow - (250)) / 2) }) }}
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
                                            img={skill.img} title={t(`MainSkills.${skill.key}.title`)} isVisible={isVisibleSection} text={t(`MainSkills.${skill.key}.text`, { returnObjects: true }) as string[]} bg={skill.bg} folder={skill.folder} />

                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="slide-dots-box-container">
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

                </div>

                <div className="wrapper flex flex-col">
                    <h3 className='skills__wrapper-desc '>
                        {filterPrepositions('Наша компания признана одной из ведущих на рынке сертификации в Российской Федерации и стран Евразийского Экономического Союза. Специалисты NVSERT предоставляют широкий спектр услуг, направленный на оформление обязательной и добровольной сертификации, декларирования, соответствия требованиям технических регламентов и др. документов, подтверждающих качество выпускаемой продукции.')}
                    </h3>

                    <Button wrapperClassName='mt-[20px]' />
                </div>


            </div>
        </section >
    );
};

export default AppMainSkills;