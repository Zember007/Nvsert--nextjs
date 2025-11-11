import MainDocumentItem from "./elements/MainDocumentItem";
import { documents } from "./utils";
import { useState } from "react";
import '@/assets/styles/sections/main/animation/documents.scss'
import '@/assets/styles/sections/main/main-documents.scss'
import { PhotoProvider } from '@/assets/lib/react-photo-view';
import { useTranslation } from "react-i18next";
import { RootState } from "@/config/store";
import { useSelector } from "react-redux";

const AppMainDocuments = () => {
    const [activeIndex, setActive] = useState<number | null>(null);
    const { t } = useTranslation();
    const { navigation } = useSelector((state: RootState) => state.navigation);

    console.log(navigation);
    





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
                onIndexChange={(index) => {setActive(index);}}
                maskClosable={false}
            >
                <div className="documents-container">
                    {navigation.map((item, index) => (
                        <MainDocumentItem
                            link={item.slug}
                            key={index}                       
                            setPhoto={() => {}}
                            setActive={(value: boolean) => setActive(value ? index : null)}
                            active={index === activeIndex}
                            content={item.description}
                            documentsList={item.documents}
                            duration={item.duration}
                            img={item.img}
                            price={item.price}
                            title={item.title}
                            totalItems={navigation.length }
                            index={index + 1}
                        />
                    ))}
                </div>
            </PhotoProvider>
        </section>
    );
};

export default AppMainDocuments;
