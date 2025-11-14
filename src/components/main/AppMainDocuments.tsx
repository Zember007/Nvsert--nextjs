'use client'
import MainDocumentItem from "./elements/MainDocumentItem";
import { useCallback, useMemo, useState } from "react";
import '@/assets/styles/sections/main/animation/documents.scss'
import '@/assets/styles/sections/main/main-documents.scss'
import { PhotoProvider } from '@/assets/lib/react-photo-view';
import { useTranslation } from "react-i18next";
import { useNavigationContext } from "../contexts/NavigationContext";

const AppMainDocuments = () => {
    const [activeIndex, setActive] = useState<number | null>(null);
    const { t } = useTranslation();
    const { initialNavigation: navigation } = useNavigationContext();

    const noop = useCallback(() => { }, []);
    const setActiveHandlers = useMemo(
        () => navigation.map((_, idx) => (value: boolean) => setActive(value ? idx : null)),
        [navigation]
    );

    return (
        <section className="section wrapper !overflow-visible">

            <div id="documents" className="absolute top-[-50px] pointer-events-none" ></div>

            <h2 className="section__title">
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
                            setPhoto={noop}
                            setActive={setActiveHandlers[index]}
                            active={index === activeIndex}
                            content={item.description}
                            documentsList={item.documents}
                            duration={item.duration}
                            img={item.img}
                            price={item.price}
                            title={item.title}
                            totalItems={navigation.length}
                            index={index + 1}
                        />
                    ))}
                </div>
            </PhotoProvider>
        </section>
    );
};

export default AppMainDocuments;
