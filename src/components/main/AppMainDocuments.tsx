import MainDocumentItem from "./elements/MainDocumentItem";
import { documents } from "./utils";
import { useState } from "react";
import '@/assets/styles/sections/main/animation/documents.scss'
import '@/assets/styles/sections/main/main-documents.scss'
import { PhotoProvider } from '@/assets/lib/react-photo-view';
import { useTranslation } from "react-i18next";
import { ContentItem, Content1Item } from "@/types/documents";

const AppMainDocuments = () => {
    const [activeIndex, setActive] = useState<number | null>(null);
    const { t } = useTranslation();

    const handlePhotoClick = (item: typeof documents[0], index: number) => {
        setTimeout(() => {
            const box = document.querySelector('.PhotoView-Slider__BannerWrap') as HTMLDivElement;
            if (!box) return;
            box.dataset.before = t(`MainDocuments.${item.key}.title`);

            const photos = document.querySelectorAll<HTMLDivElement>('.PhotoView__Photo__attr');
            photos.forEach((photo) => {
                photo.dataset.price = t(`MainDocuments.${item.key}.price`);
                photo.dataset.duration = t(`MainDocuments.${item.key}.duration`);
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
                    {documents.map((item, index) => (
                        <MainDocumentItem
                            key={index}
                            index={index}
                            setPhoto={() => handlePhotoClick(item, index)}
                            setActive={(value: boolean) => setActive(value ? index : null)}
                            active={index === activeIndex}
                            content={t(`MainDocuments.${item.key}.content`, { returnObjects: true }) as ContentItem}
                            content1={t(`MainDocuments.${item.key}.content1`, { returnObjects: true }) as Content1Item[]}
                            duration={t(`MainDocuments.${item.key}.duration`)}
                            img={item.img}
                            price={t(`MainDocuments.${item.key}.price`)}
                            title={t(`MainDocuments.${item.key}.title`)}
                        />
                    ))}
                </div>
            </PhotoProvider>
        </section>
    );
};

export default AppMainDocuments;
