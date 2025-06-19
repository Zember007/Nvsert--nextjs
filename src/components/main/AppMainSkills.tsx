
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
                if (entry.isIntersecting && ref.current) observer.unobserve(ref.current);  timeLine.current?.next({ ease: "power3", duration: 0.725 });
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
            timeLine.current = horizontalLoop(slides, {
                paused: true,
                center: true,
                draggable: true,
                gap: 20,
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







    return (

        <section
            ref={ref}
            className="section wrapper">
            <h2 className="section__title">Наши основные преимущества</h2>
            <div className="skills__wrapper">
                <div className="flex flex-col gap-[20px]">
                    <div className="skills__box">

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
                            <div key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
                        ))}
                    </div>

                </div>

                <h3 className='skills__wrapper-desc'>
                    {filterPrepositions('Наша компания признана одной из ведущих на рынке сертификации в Российской Федерации и стран Евразийского Экономического Союза. Специалисты NVSERT предоставляют широкий спектр услуг, направленный на оформление обязательной и добровольной сертификации, декларирования, соответствия требованиям технических регламентов и других документов, подтверждающих качество выпускаемой продукции.')}
                </h3>
                <Link
                    href={'/about'}
                    className='skills__wrapper-move'
                >
                    <span>Подробнее о компании</span>
                    <Image src={ArrowImg} alt='arrow' width={24} height={24} />
                </Link>
            </div>
        </section >
    );
};

export default AppMainSkills;