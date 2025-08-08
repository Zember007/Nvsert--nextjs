
import Image from "next/image";
import Link from "next/link";
import { useAnimation, motion, AnimationControls } from "framer-motion";
import { useEffect } from "react";
import { navigationImg } from './utils'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useHeaderContext } from "../contexts/HeaderContext";
import { filterPrepositions } from "@/hook/filter";
import { useButton } from "@/hook/useButton";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "@/config/store";
import { useDispatch, useSelector } from "react-redux";
import { updateActionNavigation } from "@/store/navigation";

interface NavigationItem {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    duration: string;
    price: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    documents: Array<{
        id: number;
        value: string;
    }>;
    img: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
            thumbnail: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            medium: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            small: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: string | null;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
    category: {
        id: number;
        documentId: string;
        name: string;
        title: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

const AppNavigation = ({ active }: { active: boolean }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { navigation } = useSelector((state: RootState) => state.navigation);
    const { darkHeader } = useHeaderContext();

    useEffect(() => {
        if (navigation.length === 0) {
            dispatch(updateActionNavigation());
        }
    }, [dispatch, navigation]);

    const { t } = useTranslation()

    const controls = useAnimation();

    const defaultSettings = {
        duration: 0.6,
        bounce: 5,
        delay: 0,
        ease: [0.34, 1.56, 0.64, 1], // Кастомная cubic-bezier кривая
        times: [0, 0.2, 0.5, 0.8, 1], // Временные точки
        openY: [0, 26, 0, 0, 0], // Эффект отскока при открытии
        closeY: [60, -6, 0, 0, 0], // Эффект отскока при закрытии
        opacity: [0, 1, 1, 1, 1],
    };

    useEffect(() => {
        if (active) {
            controls.start({
                y: defaultSettings.openY, // Используем openY для отскока
                opacity: defaultSettings.opacity,
                transition: {
                    duration: defaultSettings.duration,
                    ease: defaultSettings.ease,
                    times: defaultSettings.times,
                    delay: 0.1
                }
            });
        }
    }, [active]);

    // Группируем данные по категориям
    const groupedByCategory = navigation.reduce((acc, item) => {
        const categorySlug = item.category.slug;
        if (!acc[categorySlug]) {
            acc[categorySlug] = {
                category: item.category,
                items: []
            };
        }
        acc[categorySlug].items.push(item);
        return acc;
    }, {} as Record<string, { category: any; items: NavigationItem[] }>);

    // Если данных нет, показываем пустой контейнер
    if (navigation.length === 0) {
        return (
            <div className="grid grid-cols-6 w-full xxxl:gap-[30px] gap-[8px]">
                {/* Пустой контейнер для загрузки */}
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-6 w-full xxxl:gap-[30px] gap-[8px]">
                {
                    Object.values(groupedByCategory).map((categoryData, categoryIndex) => (
                        <div key={categoryIndex} className="flex flex-col gap-[20px]">
                            {/* Заголовок категории */}
                            <div className="mb-2">
                                <h3 className={`${darkHeader ? 'text-[#000]' : 'text-[#FFF]'} text-lg font-semibold`}>
                                    {categoryData.category.title}
                                </h3>
                            </div>
                            {/* Элементы категории */}
                            {categoryData.items.map((item, itemIndex) => (
                                <WrapperItem 
                                    key={item.id} 
                                    link={`/services/${item.slug}`} 
                                    title={item.title} 
                                    img={item.img.url} 
                                    controls={controls} 
                                />
                            ))}
                        </div>
                    ))
                }
            </div>
        </>
    );
};

const WrapperItem = ({ img, title, controls, link }: { link: string; img: string, title: string, controls: AnimationControls }) => {
    const { darkHeader } = useHeaderContext();
    const { setButtonRef, setWrapperRef } = useButton()

    // Проверяем, что URL изображения корректный
    const imageUrl = img && img.startsWith('http') ? img : `https://your-domain.com${img}`;

    return (
        <>
            <div ref={setWrapperRef} className="tariff-wrap">
                <Link ref={setButtonRef} href={link} className={`tariff overflow-hidden not-backdrop flex xxxl:gap-[10px] gap-[5px] group  rounded-[4px] items-center hover:bg-[#34446d33] border-solid hover:border-[#fff] border border-[transparent]`}>
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        className=" overflow-hidden group-hover:rounded-[0px] rounded-[4px] min-w-[43px]"
                        animate={controls}>
                        <Image 
                            src={imageUrl} 
                            className="w-[43px] h-[60px]" 
                            width={43} 
                            height={60} 
                            alt="document"
                            onError={(e) => {
                                // Fallback изображение при ошибке загрузки
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-document.png'; // Замените на путь к вашему fallback изображению
                            }}
                        />
                    </motion.div>
                    <p className={`${darkHeader ? 'text-[#000] group-hover:text-[#FFF]' : 'text-[#FFF]'} max-w-full xxxl:pr-[12px] xxl:text-[16px] text-[14px]`}>{filterPrepositions(title)}</p>
                </Link>
            </div>
        </>
    )
}

export default AppNavigation;