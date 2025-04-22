import MainDocumentItem from "./elements/MainDocumentItem";
import { documents } from "./utils";
import { useEffect, useMemo, useRef, useState } from "react";
import '@/assets/styles/sections/main/animation/documents.scss'
import '@/assets/styles/sections/main/animation/skills.scss'
import { PhotoProvider } from '@/assets/lib/react-photo-view';



const AppMainDocuments = () => {

    const [activeIndex, setActive] = useState<number | null>(null)
    const [hoverIndex, setHover] = useState<number | null>(null)


    const settings = {
        timeout: 0,
        duration: 300,
        length: 30
    }






    return (
        <section className="py-[75px] flex flex-col gap-[40px]">
            <div className="wrapper ">

                <h2 className=" leading-[1] text-center   text-[24px] xs:text-[40px] l:text-[56px] text-[#000000] tracking-[-0.04em]">Мы оформляем следующие документы</h2>

            </div>
            <PhotoProvider maskOpacity={0.4} maskClassName="blurred-mask"
            speed={() => 300}
                onIndexChange={(index) => {

                    setActive(index)

                    const box = document.querySelector('.PhotoView-Slider__BannerWrap') as HTMLImageElement;
                    if (!box) return
                    box.dataset.before = documents[index].title;
                }}

                maskClosable={false}

            >

                <div className="flex flex-col">
                    {
                        documents.map((item, index) =>

                            <MainDocumentItem
                                index={index}
                                setPhoto={() => {
                                    setTimeout(() => {
                                        const box = document.querySelector('.PhotoView-Slider__BannerWrap') as HTMLImageElement;
                                        if (!box) return
                                        box.dataset.before = item.title;

                                        const portal = document.querySelector('.PhotoView-Portal') as HTMLDivElement;
                                        const arrowLeft = document.querySelector('.PhotoView-Slider__ArrowLeft') as HTMLDivElement;
                                        const arrowRight = document.querySelector('.PhotoView-Slider__ArrowRight') as HTMLDivElement;
                                        const closeBtn = document.querySelector('.PhotoView-Slider__BannerRight') as HTMLDivElement;


                                        if (!portal || !arrowLeft || !arrowRight) {
                                            console.error('Один из необходимых элементов не найден');
                                            return;
                                        }

                                        // Отслеживание движения курсора
                                        portal.addEventListener('mousemove', (e) => {
                                            const rect = portal.getBoundingClientRect(); // Получаем размеры и положение блока
                                            const cursorX = e.clientX - rect.left; // Позиция курсора относительно левого края блока
                                            const halfWidth = rect.width / 2; // Половина ширины блока

                                            // Удаляем оба класса перед добавлением нового
                                            portal.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');

                                            // Добавляем класс в зависимости от положения курсора
                                            if (cursorX <= halfWidth) {
                                                portal.classList.add('modal__nav-arrow--left');
                                            } else {
                                                portal.classList.add('modal__nav-arrow--right');
                                            }
                                        });

                                        // Удаление классов при выходе курсора из блока
                                        portal.addEventListener('mouseleave', () => {
                                            portal.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');
                                        });

                                        // Обработка клика
                                        portal.addEventListener('click', (e) => {
                                            const target = e.target as Element;
                                            if (target?.closest('.PhotoView-Slider__BannerRight') || target?.closest('.PhotoView__Photo') || target?.closest('.PhotoView-Slider__ArrowLeft') || target?.closest('.PhotoView-Slider__ArrowRight') ) return

                                            const rect = portal.getBoundingClientRect();
                                            const cursorX = e.clientX - rect.left;
                                            const halfWidth = rect.width / 2;

                                            // Симулируем клик на соответствующую стрелку
                                            if (cursorX <= halfWidth) {
                                                arrowLeft.click();                                            
                                            } else {
                                                arrowRight.click();                                        
                                                
                                            }
                                        });


                                        closeBtn.addEventListener('click', (e) => {
                                            portal.removeEventListener('click', () => { })
                                            portal.removeEventListener('mouseleave', () => { })
                                            portal.removeEventListener('mousemove', () => { })
                                            closeBtn.removeEventListener('click', () => { })
                                        });

                                    }, 100)
                                }}

                                bordert={(index - 1 !== hoverIndex && index - 1 !== activeIndex)}
                                borderb={index + 1 !== hoverIndex && activeIndex !== index + 1}
                                setHover={(value: any) => { setHover(value ? index : null) }}
                                setActive={(value: any) => {


                                    setActive(value ? index : null)

                                }} isOpen={index === activeIndex} key={index} {...item} />

                        )
                    }

                </div>
            </PhotoProvider>
        </section>
    );
};

export default AppMainDocuments;