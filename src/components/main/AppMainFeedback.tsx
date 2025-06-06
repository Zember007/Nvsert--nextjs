
import { PhotoProvider, PhotoView } from '@/assets/lib/react-photo-view';
import { useEffect } from 'react';
import { horizontalLoop } from '@/scripts/slider';
import { useButton } from '@/hook/useButton';
import Image from 'next/image';
import gsap from 'gsap';
import Draggable from "gsap/dist/Draggable";
import InertiaPlugin from "@/scripts/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);



const AppMainFeedback = () => {

    const { setButtonRef, setWrapperRef } = useButton()

    useEffect(() => {
        const slides = gsap.utils.toArray('[data-slider="slide-feedback"]');
        const slides1 = gsap.utils.toArray('[data-slider="slide-feedback1"]');
        const loop: any = horizontalLoop(slides, {
            paused: false,
            draggable: true,
            speed: 0.5,
            offsetLeft: 0,
            repeat: -1,
            gap: 20,
            opacity: false
        });

        const loop1: any = horizontalLoop(slides1, {
            paused: false,
            draggable: true,
            speed: 0.5,
            offsetLeft: 0,
            repeat: -1,
            gap: 20,
            reversed: true,
            opacity: false
        });



        return () => {
            loop.kill();
            loop1.kill();
        }
    }, [])

    const readyPhoto = () => {
        setTimeout(() => {


            const portal = document.querySelector('.PhotoView-Portal') as HTMLDivElement;
            const arrowLeft = document.querySelector('.PhotoView-Slider__ArrowLeft') as HTMLDivElement;
            const arrowRight = document.querySelector('.PhotoView-Slider__ArrowRight') as HTMLDivElement;
            const closeBtn = document.querySelector('.PhotoView-Slider__BannerRight') as HTMLDivElement;


            if (!portal || !arrowLeft || !arrowRight) {
                console.error('Один из необходимых элементов не найден');
                return;
            }

            // Отслеживание движения курсора
            portal.addEventListener('mousemove', (e: any) => {
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
            portal.addEventListener('click', (e: any) => {
                const target = e.target as Element;
                if (target?.closest('.PhotoView-Slider__BannerRight') || target?.closest('.PhotoView-Slider__ArrowLeft') || target?.closest('.PhotoView-Slider__ArrowRight')) return

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
    }


    return (
     
                <PhotoProvider maskOpacity={0.4} maskClassName="blurred-mask"
                    speed={() => 0}

                    maskClosable={false}

                >
                    <div className="relative h-[554px] flex flex-col gap-[10px] overflow-hidden feedback-slider-box">

                        <div className="slide-blur left-0">
                            <span className="line" style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                            <span className="line" style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}></span>
                            <span className="line" style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}></span>
                        </div>

                        <div className="slide-main">
                            <div className="slider-wrap !pt-0 ">


                                <div className="flex gap-[20px] feedback-slider-container translate-x-[-95px]">
                                    {[...Array(19)].map((_, index) =>
                                        <div
                                            onClick={readyPhoto}
                                            data-slider="slide-feedback" key={index} className="border-[#CCCCCC] border border-solid overflow-hidden w-[190px] h-[267px] rounded-[4px]">
                                            <PhotoView src={`/feedbacks/big/${index + 1}.png`}
                                            >
                                                <Image
                                                    className='min-h-full'
                                                    src={`/feedbacks/small/${index + 1}.png`} alt='feedback' width={190} height={267} />
                                            </PhotoView>
                                        </div>)}
                                </div>



                            </div>

                        </div>

                        <div className="slide-main bottom-0">
                            <div className="slider-wrap !pt-0">


                                <div className="flex gap-[20px] translate-x-[-95px] feedback-slider-container">
                                    {[...Array(19)].map((_, index) =>
                                        <div
                                            onClick={readyPhoto}

                                            data-slider="slide-feedback1" key={index} className="border-[#CCCCCC] border border-solid overflow-hidden w-[190px] h-[267px] rounded-[4px]">
                                            <PhotoView src={`/feedbacks/big/${20 + index}.png`}>
                                                <Image
                                                    className='min-h-full'
                                                    src={`/feedbacks/small/${20 + index}.png`} alt='feedback' width={190} height={267} />
                                            </PhotoView>
                                        </div>)}
                                </div>



                            </div>

                        </div>



                        <div className="slide-blur right-0 !translate-x-[0]">
                            <span className="line" style={{ '--blur': '2px', '--lightness': '100%' } as React.CSSProperties}></span>
                            <span className="line" style={{ '--blur': '5px', '--lightness': '100%' } as React.CSSProperties}></span>
                            <span className="line" style={{ '--blur': '10px', '--lightness': '100%' } as React.CSSProperties}></span>
                        </div>

                    </div>
                </PhotoProvider>
          
    );
};

export default AppMainFeedback;