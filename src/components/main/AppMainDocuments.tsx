import MainDocumentItem from "./elements/MainDocumentItem";
import { documents } from "./utils";
import { useEffect, useMemo, useRef, useState } from "react";
import '@/assets/styles/sections/main/animation/documents.scss'
import '@/assets/styles/sections/main/animation/skills.scss'
import { PhotoProvider } from "react-photo-view";
import GUI from "lil-gui";
import { BounceEffect } from "@/hook/useBounce";




const AppMainDocuments = () => {

    const [activeIndex, setActive] = useState<number | null>(null)
    const [activePhoto, setActivePhoto] = useState<number | null>(null)
    const [hoverIndex, setHover] = useState<number | null>(null)


    const [settings, setSettings] = useState({
        timeout: 0,
        duration: 300,
        length: 20
    })
    const guiRef = useRef<GUI | null>(null)


    useEffect(() => {
        // Создаем экземпляр GUI
        const gui = new GUI();

        // Добавляем контроллеры для каждого параметра
        gui.add(settings, 'timeout', 0, 1000, 10) // Мин: 0, Макс: 1000, Шаг: 10
            .name('Задержка анимации')                  // Название в интерфейсе
            .onChange((value: any) => {                 // Обработчик изменения               
                setSettings({
                    ...settings,
                    timeout: value
                })

            });

        gui.add(settings, 'duration', 100, 1000, 50) // Мин: 100, Макс: 1000, Шаг: 50
            .name('Длина анимации')
            .onChange((value: any) => {
                setSettings({
                    ...settings,
                    duration: value
                })
            });

        gui.add(settings, 'length', 10, 100, 1) // Мин: 10, Макс: 100, Шаг: 1
            .name('Длина отскока')
            .onChange((value: any) => {
                setSettings({
                    ...settings,
                    length: value
                })
                console.log(123123, value, settings);

                // Здесь можно обновить размер или длину
            });

        guiRef.current = gui

        // Очистка при размонтировании компонента
        return () => {
            if (!guiRef.current) return
            guiRef.current.destroy(); // Удаляем GUI, чтобы избежать утечек памяти
        };
    }, [])

    const bouncePhoto = () => {
        setTimeout(() => {
            const photos = document.querySelectorAll('.PhotoView__PhotoWrap')

            photos.forEach(el => {

                el.classList.remove('animate')
                el.classList.add('animate')


            })
        }, 140)
    }

    const [functionPhoto, setFunctionPhoto] = useState<string>('none')

    return (
        <section className="py-[75px] flex flex-col gap-[50px]">
            <div className="wrapper ">

                <h2 className=" leading-[1] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px] text-[#000000] tracking-[-0.04em]">Мы оформляем следующие документы</h2>

            </div>
            <PhotoProvider easing={() => functionPhoto} maskOpacity={0.4} maskClassName="blurred-mask"
                onIndexChange={(index) => {

                    setActive(index);
                    setActivePhoto(index);
                }}
                maskClosable={false}
                photoClosable={false}
                pullClosable={false}
            >

                <div className="flex flex-col">
                    {
                        documents.map((item, index) =>

                            <MainDocumentItem
                                setPhoto={() => {
                                    setActivePhoto(index); bouncePhoto();
                                    setFunctionPhoto('none')
                                    setTimeout(() => {
                                        document.querySelector('.PhotoView-Slider__toolbarIcon')?.addEventListener('click', () => {
                                            setActivePhoto(null)
                                            document.querySelector('.PhotoView-Slider__toolbarIcon')?.removeEventListener('click', () => { })
                                        })
                                        
                                    }, 100)

                                    setTimeout(() => {
                                        setFunctionPhoto('cubic-bezier(0.25, 0.8, 0.25, 1)')
                                    },1000)
                                }}

                                activePhoto={activePhoto === index}
                                settings={settings}
                                bordert={(index - 1 !== hoverIndex && index - 1 !== activeIndex)}
                                borderb={index + 1 !== hoverIndex && activeIndex !== index + 1}
                                setHover={(value) => { setHover(value ? index : null) }} setActive={(value) => setActive(value ? index : null)} active={index === activeIndex} key={index} {...item} />

                        )
                    }

                </div>
            </PhotoProvider>
        </section>
    );
};

export default AppMainDocuments;