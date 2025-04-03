import MainDocumentItem from "./elements/MainDocumentItem";
import { documents } from "./utils";
import { useEffect, useMemo, useRef, useState } from "react";
import '@/assets/styles/sections/main/animation/documents.scss'
import '@/assets/styles/sections/main/animation/skills.scss'
import { PhotoProvider } from "react-photo-view";




const AppMainDocuments = () => {

    const [activeIndex, setActive] = useState<number | null>(null)
    const [activePhoto, setActivePhoto] = useState<number | null>(null)
    const [hoverIndex, setHover] = useState<number | null>(null)


    const settings = {
        timeout: 0,
        duration: 300,
        length: 20
    }

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
        <section className="py-[75px] flex flex-col gap-[40px]">
            <div className="wrapper ">

                <h2 className=" leading-[1] text-center   text-[24px] xs:text-[40px] l:text-[56px] text-[#000000] tracking-[-0.04em]">Мы оформляем следующие документы</h2>

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
                                    }, 1000)
                                }}

                                activePhoto={activePhoto === index}
                                settings={settings}
                                bordert={(index - 1 !== hoverIndex && index - 1 !== activeIndex)}
                                borderb={index + 1 !== hoverIndex && activeIndex !== index + 1}
                                setHover={(value) => { setHover(value ? index : null) }} 
                                setActive={(value) => {                                    
                                    
                                    
                                    setActive(value ? index : null)

                                }} active={index === activeIndex} key={index} {...item} />

                        )
                    }

                </div>
            </PhotoProvider>
        </section>
    );
};

export default AppMainDocuments;