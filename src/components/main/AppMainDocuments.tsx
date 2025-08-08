import MainDocumentItem from "./elements/MainDocumentItem";
import { documents } from "./utils";
import { useState } from "react";
import '@/assets/styles/sections/main/animation/documents.scss'
import '@/assets/styles/sections/main/main-documents.scss'
import { PhotoProvider } from '@/assets/lib/react-photo-view';
import { useTranslation } from "react-i18next";
import { ContentItem, Content1Item, NavigationDocumentItem } from "@/types/documents";
import { useSelector } from "react-redux";
import { RootState } from "@/config/store";

const AppMainDocuments = () => {
    const [activeIndex, setActive] = useState<number | null>(null);
    const { t } = useTranslation();
    const { navigation } = useSelector((state: RootState) => state.navigation);

    // Создаем заглушки для content и content1
    const createDefaultContent = (): ContentItem => ({
        text: "Описание услуги будет добавлено позже."
    });

    const createDefaultContent1 = (): Content1Item[] => ([
        {
            title: "Документы для оформления",
            subtitle: "Список необходимых документов",
            list: ["Документы будут добавлены позже"]
        }
    ]);

    // Функция для создания объекта изображения из URL
    const createImageObject = (imgUrl: string, width: number, height: number) => ({
        src: imgUrl,
        width: width,
        height: height,
        blurDataURL: '',
        blurWidth: 0,
        blurHeight: 0
    });

    const handlePhotoClick = (item: NavigationDocumentItem, index: number) => {
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

    // Если данных нет, показываем пустой контейнер
    if (navigation.length === 0) {
        return (
            <section className="section wrapper">
                <div id="documents" className="absolute top-[-50px] pointer-events-none" ></div>
                <h2 className="section__title">
                    {t('docs.heading')}
                </h2>
                <div className="documents-container">
                    {/* Пустой контейнер для загрузки */}
                </div>
            </section>
        );
    }

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
                    const item = navigation[index];
                    const box = document.querySelector('.PhotoView-Slider__BannerWrap') as HTMLDivElement;
                    if (!box) return;
                    box.dataset.before = item.title;

                    const photos = document.querySelectorAll<HTMLDivElement>('.PhotoView__Photo__attr');
                    photos.forEach((photo) => {
                        photo.dataset.price = item.price;
                        photo.dataset.duration = item.duration;
                    });
                }}
                maskClosable={false}
            >
                <div className="documents-container">
                    {navigation.map((item, index) => (
                        <MainDocumentItem
                            key={item.id}
                            index={index}
                            setPhoto={() => handlePhotoClick(item, index)}
                            setActive={(value: boolean) => setActive(value ? index : null)}
                            active={index === activeIndex}
                            content={createDefaultContent()}
                            content1={createDefaultContent1()}
                            duration={item.duration}
                            img={createImageObject(item.img.url, item.img.width, item.img.height)}
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
