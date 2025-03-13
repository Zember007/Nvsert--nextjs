import MainDocumentItem from "./elements/MainDocumentItem";
import { documents } from "./utils";
import { useState } from "react";
import '@/assets/styles/sections/main/animation/documents.scss'





const AppMainDocuments = () => {

    const [activeIndex, setActive] = useState<number | null>(null)
    const [hoverIndex, setHover] = useState<number | null>(null)
    return (
        <section className="py-[75px] flex flex-col gap-[50px]">
            <div className="wrapper">

                <h2 className="leading-[1] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px] text-[#000000] tracking-[-0.04em]">Мы оформляем следующие документы</h2>

            </div>
            <div className="flex flex-col">
                {
                    documents.map((item, index) =>

                        <MainDocumentItem
                            bordert={(index - 1 !== hoverIndex && index - 1 !== activeIndex)}
                            borderb={index + 1 !== hoverIndex || activeIndex===hoverIndex}
                            setHover={(value) => { setHover(value ? index : null) }} setActive={(value) => setActive(value ? index : null)} active={index === activeIndex} key={index} {...item} />

                    )
                }

            </div>
        </section>
    );
};

export default AppMainDocuments;