
import { PhotoProvider } from 'react-photo-view';
import Feedback from './elements/Feedback';
import 'react-photo-view/dist/react-photo-view.css';
import { useEffect, useRef, useState } from 'react';
import { horizontalLoop } from '@/scripts/slider';

const feedback = [
    {
        title: 'ООО «Кредо»',
        text: `Мы неоднократно обращались в Вашу организацию, надеемся на дальнейшее плодотворное сотрудничество`,
        img: '/feedback/1.webp'
    },
    {
        title: 'ООО «Центр стандартизации»',
        text: `По результатам взаимодействия стоит отметить:

отличную организацию работ, связанных с сертификацией;

грамотные и оперативные предложения по решению поставленных задач`,
        img: '/feedback/2.webp'
    },
    {
        title: 'ООО «Текстиль-эксперт»',
        text: `Порадовала ваша оперативность, клиентоориентированность и, конечно, высокий профессионализм.`,
        img: '/feedback/3.webp'
    },
    {
        title: 'ИП Топоров',
        text: `Была получена полная и подробная информация на все вопросы, получен сертификат соответствия.

Работой остались довольны, даём контактные данные знакомым, рекомендуем обращаться.`,
        img: '/feedback/4.webp'
    }
]



const AppMainFeedback = () => {

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {

        if (typeof window === "undefined") return

        const handleResize = () => {
            setIsMobile(window.innerWidth < 1240);
        };

        window.addEventListener("resize", handleResize);
        handleResize()

        return () => {
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


    }, [isMobile, feedback.length]);

    return (
        <section className="py-[75px]">
            <div className="wrapper flex flex-col gap-[40px]">
                <h2 className="leading-[1] tracking-[-0.04em] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px]">Реальные отзывы клиентов</h2>
                <PhotoProvider maskOpacity={0.4}>
                    <div className="flex flex-col gap-[20px] items-center">
                        <div ref={sliderRef} className="flex gap-[20px]">
                            {feedback.map((item, index) => (
                                <Feedback key={index} {...item} />
                            ))}
                        </div>

                        {isMobile &&
                        <li className='flex gap-[2px] mt-[20px] mx-[20px]'>
                            {feedback.map((_,index) => 
                                <ul key={index} 
                                className={`${index === currentIndex && 'bg-[#34446D]'} h-[10px] w-[10px] rounded-[50%] border border-solid border-[#34446D]`}></ul>
                            )}
                        </li>}
                    </div>
                </PhotoProvider>
            </div>
        </section>
    );
};

export default AppMainFeedback;