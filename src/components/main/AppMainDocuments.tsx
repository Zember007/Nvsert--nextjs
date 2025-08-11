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


    const handlePhotoClick = (item: typeof navigation[0]) => {
        setTimeout(() => {
            const box = document.querySelector('.PhotoView-Slider__BannerWrap') as HTMLDivElement;
            if (!box) return;
            box.dataset.before = item.title;

            const photos = document.querySelectorAll<HTMLDivElement>('.PhotoView__Photo__attr');
            photos.forEach((photo) => {
                photo.dataset.price = item.price;
                photo.dataset.duration = item.duration;
            });

        }, 100);

    };



    return (
        <section className="section wrapper">

            <div id="documents" className="absolute top-[-50px] pointer-events-none" ></div>

            <h2 className="section__title">
                {t('docs.heading')}
            </h2>

            <PhotoProvider
                maskOpacity={0.4}
                maskClassName="blurred-mask"
                speed={() => 0}
                onIndexChange={(index) => {
                    setActive(index);
                    const item = documents[index];
                    const box = document.querySelector('.PhotoView-Slider__BannerWrap') as HTMLDivElement;
                    if (!box) return;
                    box.dataset.before = t(`MainDocuments.${item.key}.title`);

                    const photos = document.querySelectorAll<HTMLDivElement>('.PhotoView__Photo__attr');
                    photos.forEach((photo) => {
                        photo.dataset.price = t(`MainDocuments.${item.key}.price`);
                        photo.dataset.duration = t(`MainDocuments.${item.key}.duration`);
                    });
                }}
                maskClosable={false}
            >
                <div className="documents-container">
                    {navigation.map((item, index) => (
                        <MainDocumentItem
                            key={index}                       
                            /* setPhoto={() => handlePhotoClick(item, index)} */
                            setPhoto={() => { }}
                            setActive={(value: boolean) => setActive(value ? index : null)}
                            active={index === activeIndex}
                            content={item.description}
                            documentsList={item.documents}
                            duration={item.duration}
                            img={item.img}
                            price={item.price}
                            title={item.title}
                        />
                    ))}
                </div>
            </PhotoProvider>
        </section>
    );
};

export default AppMainDocuments;
