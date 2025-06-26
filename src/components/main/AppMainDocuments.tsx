import MainDocumentItem from "./elements/MainDocumentItem";
import { documents } from "./utils";
import { useState } from "react";
import '@/assets/styles/sections/main/animation/documents.scss'
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

            const portal = document.querySelector('.PhotoView-Portal') as HTMLDivElement;
            const arrowLeft = document.querySelector('.PhotoView-Slider__ArrowLeft') as HTMLDivElement;
            const arrowRight = document.querySelector('.PhotoView-Slider__ArrowRight') as HTMLDivElement;
            const closeBtn = document.querySelector('.PhotoView-Slider__BannerRight') as HTMLDivElement;

            if (!portal || !arrowLeft || !arrowRight) {
                console.error('Один из необходимых элементов не найден');
                return;
            }

            const handleMouseMove = (e: MouseEvent) => {
                const rect = portal.getBoundingClientRect();
                const cursorX = e.clientX - rect.left;
                const halfWidth = rect.width / 2;

                portal.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');

                if (cursorX <= halfWidth) {
                    portal.classList.add('modal__nav-arrow--left');
                } else {
                    portal.classList.add('modal__nav-arrow--right');
                }
            };

            const handleMouseLeave = () => {
                portal.classList.remove('modal__nav-arrow--left', 'modal__nav-arrow--right');
            };

            const handleClick = (e: MouseEvent) => {
                const target = e.target as Element;
                if (target?.closest('.PhotoView-Slider__BannerRight') ||
                    target?.closest('.PhotoView-Slider__ArrowLeft') ||
                    target?.closest('.PhotoView-Slider__ArrowRight')) return;

                const rect = portal.getBoundingClientRect();
                const cursorX = e.clientX - rect.left;
                const halfWidth = rect.width / 2;

                if (cursorX <= halfWidth) {
                    arrowLeft.click();
                } else {
                    arrowRight.click();
                }
            };

            portal.addEventListener('mousemove', handleMouseMove);
            portal.addEventListener('mouseleave', handleMouseLeave);
            portal.addEventListener('click', handleClick);

            closeBtn.addEventListener('click', () => {
                portal.removeEventListener('mousemove', handleMouseMove);
                portal.removeEventListener('mouseleave', handleMouseLeave);
                portal.removeEventListener('click', handleClick);
            });
        }, 100);
    };

    return (
        <section id="documents_box" className="section wrapper">
            
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
                <div className="flex flex-col">
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
