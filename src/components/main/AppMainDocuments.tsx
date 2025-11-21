'use client'
import MainDocumentItem from "./elements/MainDocumentItem";
import { useCallback, useMemo, useState } from "react";
import '@/assets/styles/sections/main/animation/documents.scss'
import '@/assets/styles/sections/main/main-documents.scss'
import { PhotoProvider } from '@/assets/lib/react-photo-view';
import { useTranslation } from "react-i18next";
import { useHeaderContext } from "../contexts/HeaderContext";

const AppMainDocuments = () => {
    const [activeIndex, setActive] = useState<number | null>(null);
    const { t } = useTranslation();
    const { initialNavigation: navigation } = useHeaderContext();

    const setActiveHandlers = (index: number, value: boolean) => {
        setActive(value ? index : null)
    }

    return (
        <section className="section wrapper !overflow-visible">

            <div id="documents" className="absolute top-[-50px] pointer-events-none" ></div>

            <h2 className="section__title header-h-2">
                {t('docs.heading')}
            </h2>

            <PhotoProvider
                maskOpacity={0.4}
                maskClassName="blurred-mask"
                speed={() => 0}
                onIndexChange={(index) => { setActive(index); }}
                maskClosable={false}
            >
                <div className="documents-container">
                    {navigation.map((item, index) => (
                        <MainDocumentItem
                            link={item.slug}
                            key={item.slug || index}
                            setActive={(value: boolean) => setActiveHandlers(index, value)}
                            active={index === activeIndex}
                            content={item.description}
                            documentsList={item.documents}
                            navigationList={item.content?.map((list) => ({ id: list.id, title: list.heading })) || []}
                            duration={item.duration}
                            img={item.img}
                            price={item.price}
                            title={item.title}
                            totalItems={navigation.length || 0}
                            index={index + 1}
                        />
                    ))}
                </div>
            </PhotoProvider>
        </section>
    );
};

export default AppMainDocuments;
