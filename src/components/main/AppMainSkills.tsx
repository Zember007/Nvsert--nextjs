import FolderImg from '@/assets/images/folder.webp'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { horizontalLoop } from '@/scripts/slider';
import Link from 'next/link';

gsap.registerPlugin(Draggable);

const AppMainSkills = () => {

    const data = [
        {
            title: 'Гибкие условия оплаты',
            text: 'Возможность оплаты по факту оказания услуг, рассрочка и индивидуальный подход к каждому клиенту.',
            btn: 'Оформить заявку',
            action: '',
            bg: 'secondary',
            empty: false,
            folder: false
        },
        {
            title: 'Индивидуальные условия работы',
            text: 'Предлагаем персональное сопровождение на всех этапах — от консультации до доставки готовых документов.',
            btn: 'Оставить заявку',
            action: '',
            bg: 'primary',
            empty: false,
            folder: false
        },
        {
            empty: true,
            folder: false
        },
        {
            empty: false,
            folder: true
        },
        {
            empty: true,
            folder: false
        },
        {
            title: 'Работаем по договору',
            text: 'Предлагаем прозрачные условия сотрудничества. Минимальный пакет документов, необходимый для старта сертификации, чтобы максимально ускорить процесс получения необходимых разрешений.',
            btn: 'Заказать обратный звонок',
            action: '',
            bg: 'primary',
            empty: false,
            folder: false
        },
        {
            title: 'Широкая область аккредитации',
            text: 'Охватываем производственные, медицинские, строительные, технологические, пищевые и многие другие отрасли.',
            btn: 'Все услуги по отраслям',
            action: '',
            bg: 'primary',
            empty: false,
            folder: false
        },
        {
            empty: true,
            folder: false
        },
        {
            empty: false,
            folder: true
        },

        {
            title: 'Оперативность',
            text: 'Получение документов в кратчайшие сроки, без задержек. Многие документы оформляются уже в течение 1–3 дней.',
            btn: 'Перейти к услугам',
            action: '',
            bg: 'primary',
            empty: false,
            folder: false
        },
        {
            empty: true,
            folder: false
        },
        {
            title: 'Более 15 лет опыта',
            text: 'Имеем безупречную репутацию Оформили более 1 млн документов',
            btn: 'Подробнее о компании',
            action: '',
            bg: 'secondary',
            empty: false,
            folder: false
        },
    ]



    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const skills = !isMobile ? data : data.filter((item) => !item.empty);

    useEffect(() => {
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


    }, [isMobile, skills.length]);

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
                            skills.map((skill, index) => (
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
                                            <div className={`l:mr-0 mr-[20px] rounded-[4px] flex  group flex-col gap-[20px] justify-between p-[20px] text-[${skill.bg !== 'secondary' ? '#000' : '#FFF'}] bg-[${skill.bg === 'secondary' ? '#00000099' : '#FFF'}] h-[250px] min-w-[300px] w-full`}>
                                                <span className={`font-bold text-[20px]`}>
                                                    {skill.title}
                                                </span>
                                                <div className='grow'>
                                                    <p className={` ${!isVisible && 'translate-y-[10px] opacity-0'}  transition-all duration-500`}>
                                                        {skill.text}
                                                    </p>
                                                </div>
                                                <button className="rebound-box group/item w-full flex items-center text-left">
                                                    <span className="text-[18px] group-hover/item:w-full overflow-hidden whitespace-nowrap  w-0 transition-all duration-300">{skill.btn}</span>
                                                    <svg className="rebound" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 12H21" stroke={`${skill.bg !== 'secondary' ? '#000' : '#FFF'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16 7L21 12L16 17" stroke={`${skill.bg !== 'secondary' ? '#000' : '#FFF'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                </button>
                                            </div >
                                    }
                                </div>
                            ))
                        }
                    </div>

                    {isMobile &&
                        <li className='flex gap-[2px] mt-[20px] mx-[20px]'>
                            {skills.map((_, index) =>
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

                    </Link>
                </div>
            </div>
            <div ref={divRef} className='top-0 bottom-0 left-0 right-0 absolute pointer-events-none'></div>
        </section >
    );
};

export default AppMainSkills;