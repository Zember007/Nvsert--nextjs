
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { skills } from './utils';
import AppSkillBlock from './elements/AppSkillBlock';
import '@/assets/styles/sections/main/animation/skills.scss'
import { useTranslation } from 'react-i18next';


gsap.registerPlugin(Draggable);

const AppMainSkills = () => {

    const { t } = useTranslation()
    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);
    const skillsData = skills;

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







    return (

        <>
            <div className="flex xl:grid grid-cols-4 l:gap-[20px]">
                {
                    skillsData.map((skill, index) => {
                        if (skill.empty) return <div key={index}></div>;

                        return <AppSkillBlock key={index} img={skill.img} title={t(`MainSkills.${skill.key}.title`)} isVisible={isVisible} text={t(`MainSkills.${skill.key}.text`, { returnObjects: true }) as string[]} bg={skill.bg} folder={skill.folder} />;
                    })
                }
            </div>



            <div ref={divRef} className='top-0 bottom-0 left-0 right-0 absolute pointer-events-none'></div>

        </>
    );
};

export default AppMainSkills;