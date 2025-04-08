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
        length: 30
    }






    return (
        <section className="py-[75px] flex flex-col gap-[40px]">
            <div className="wrapper ">

                <h2 className=" leading-[1] text-center   text-[24px] xs:text-[40px] l:text-[56px] text-[#000000] tracking-[-0.04em]">Мы оформляем следующие документы</h2>

            </div>
            <PhotoProvider maskOpacity={0.4} maskClassName="blurred-mask"
                onIndexChange={(index) => {

                    setActive(index);
                    setActivePhoto(index);

                    const box = document.querySelector('.PhotoView-Slider__BannerWrap') as HTMLImageElement;
                    if (!box) return
                    box.dataset.before = documents[index].title;
                }}

            >

                <div className="flex flex-col">
                    {
                        documents.map((item, index) =>

                            <MainDocumentItem
                                setPhoto={() => {
                                    setActivePhoto(index);
                                    setTimeout(() => {
                                        const box = document.querySelector('.PhotoView-Slider__BannerWrap') as HTMLImageElement;
                                        if (!box) return
                                        box.dataset.before = item.title;
                                    }, 100)
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