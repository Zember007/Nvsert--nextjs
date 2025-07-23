
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { skills } from './utils';
import AppSkillBlock from './elements/AppSkillBlock';
import '@/assets/styles/sections/main/animation/skills.scss'
import { useTranslation } from 'react-i18next';
import useWindowWidth from '@/hook/useWindowWidth';
import { horizontalLoop } from '@/scripts/slider';
import { filterPrepositions } from '@/hook/filter';
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
                if (entry.isIntersecting && ref.current) {
                    observer.unobserve(ref.current);
                    if (timeLine.current) {
                        timeLine.current.next({ ease: "power3", duration: 0.725 });
                    }
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
        };
    }, []);

    const timeLine = useRef<any>(null)
    const [activeIndex, setActive] = useState<number>(0)
    const lastWidth = useRef<number | null>(null);

    // Функция для полной очистки таймлайна
    const cleanupTimeline = useCallback(() => {
        if (timeLine.current) {
            // Используем новый метод destroy из horizontalLoop
            if (timeLine.current.destroy) {
                timeLine.current.destroy();
            } else {
                // Fallback для старой версии
                if (timeLine.current.pause) {
                    timeLine.current.pause();
                }
                
                if (timeLine.current.kill) {
                    timeLine.current.kill();
                }
                
                // Очищаем все GSAP свойства со слайдов
                const slides = gsap.utils.toArray('[data-slider="slide-skill"]');
                slides.forEach((item: any) => {
                    gsap.set(item, { clearProps: "all" });
                    // Убедимся что Draggable тоже очищен
                    if (item._gsap) {
                        gsap.killTweensOf(item);
                    }
                });
            }
            
            timeLine.current = null;
        }
    }, []);

    useEffect(() => {
        // Проверяем, действительно ли нужно пересоздать таймлайн
        const isMobile = widthWindow && widthWindow < 1240;
        const wasLastMobile = lastWidth.current && lastWidth.current < 1240;
        
        // Если статус мобильной версии не изменился и секция не видна, не пересоздаем
        if (!isVisibleSection || (isMobile === wasLastMobile && lastWidth.current !== null)) {
            return;
        }

        lastWidth.current = widthWindow;

        // Полная очистка перед созданием нового таймлайна
        cleanupTimeline();

        if (isMobile) {
            const slides = gsap.utils.toArray('[data-slider="slide-skill"]');
            
            if (slides.length > 0) {
                const gap = (widthWindow - 320) / 2;
                
                timeLine.current = horizontalLoop(slides, {
                    paused: true,
                    center: true,
                    draggable: true,
                    gap: gap,
                    snap: true,
                    onChange: (index: number) => {
                        setActive(index);
                    }
                });
            }
        } else {
            // Сбрасываем активный индекс для десктопа
            setActive(0);
        }

        // Cleanup function для useEffect
        return () => {
            cleanupTimeline();
        };
    }, [widthWindow, isVisibleSection, cleanupTimeline])

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
                                    if (timeLine.current && timeLine.current.toIndex) {
                                        timeLine.current.toIndex(i, { ease: "power3", duration: 0.725 });
                                    }
                                }}
                                key={i} className={`${activeIndex === i ? 'active' : ""} slide-dots`}></div>
                        ))}
                    </div>

                </div>

                <h3 className='skills__wrapper-desc arial'>
                    {filterPrepositions('Наша компания признана одной из ведущих на рынке сертификации в Российской Федерации и стран Евразийского Экономического Союза. Специалисты NVSERT предоставляют широкий спектр услуг, направленный на оформление обязательной и добровольной сертификации, декларирования, соответствия требованиям технических регламентов и других документов, подтверждающих качество выпускаемой продукции.')}
                </h3>

                <div className="tariff-wrap xl:w-[250px] w-[280px] m:mx-0 mx-auto mt-[20px] " ref={setWrapperRef}>
                    <button
                        ref={setButtonRef} className=' slider__button group btnIconAn doc-btn tariff'>

                        <span
                            className="sendText"
                        >Подробнее</span>

                        <span className="sendIconLeft">
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
                            </svg>
                        </span>

                    </button>
                </div>


            </div>
        </section >
    );
};

export default AppMainSkills;