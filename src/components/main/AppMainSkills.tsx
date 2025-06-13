
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { skills } from './utils';
import AppSkillBlock from './elements/AppSkillBlock';
import '@/assets/styles/sections/main/animation/skills.scss'
import { useTranslation } from 'react-i18next';
import useWindowWidth from '@/hook/useWindowWidth';
import { horizontalLoop } from '@/scripts/slider';


gsap.registerPlugin(Draggable);

const AppMainSkills = () => {

    const { t } = useTranslation()
    const widthWindow = useWindowWidth()
    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);
    const skillsData = widthWindow >= 1240 ? skills : skills.filter(item => !item.empty);

    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (entry.isIntersecting && divRef.current) observer.unobserve(divRef.current);
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

    const timeLine = useRef<any>(null)
    const [activeIndex, setActive] = useState<number>(0)

    useEffect(() => {
        if (widthWindow < 1240) {
            const slides = gsap.utils.toArray('[data-slider="slide-skill"]');
            timeLine.current = horizontalLoop(slides, {
                paused: true,
                draggable: true,                                
                snap: true,                
                onChange: (index:number) => {
                    setActive(index)
                }
            });
        }
    }, [widthWindow])







    return (

        <>
            <div className="flex flex-col gap-[20px]">
                <div className="flex xl:grid grid-cols-4 gap-[10px] xl:gap-[20px]">

                    {
                        skillsData.map((skill, index) => {
                            if (skill.empty) return <div key={index}></div>;

                            return (
                                <div
                                    key={index}
                                    data-slider="slide-skill"
                                >
                                    <AppSkillBlock img={skill.img} title={t(`MainSkills.${skill.key}.title`)} isVisible={isVisible} text={t(`MainSkills.${skill.key}.text`, { returnObjects: true }) as string[]} bg={skill.bg} folder={skill.folder} />

                                </div>
                            );
                        })
                    }
                </div>
                <div className="flex xl:hidden mx-auto">
                    {skillsData.map((_, i) => (
                        <div key={i} className={`${activeIndex === i ? 'bg-[#34446D]' : ""} w-[10px] h-[10px] border border-solid border-[#34446D] rounded-full`}></div>
                    ))}
                </div>

            </div>



            <div ref={divRef} className='top-0 bottom-0 left-0 right-0 absolute pointer-events-none'></div>

        </>
    );
};

export default AppMainSkills;