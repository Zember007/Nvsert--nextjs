import { useRef, useState, memo, useMemo, useCallback } from 'react';

import { useButton } from '@/hook/useButton';
import { motion } from 'framer-motion';
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { MainDocumentItemProps } from '@/types/documents';
import useWindowSize from '@/hook/useWindowSize';
import '@/assets/styles/sections/main/document-item.scss';
import { useRouter } from 'next/navigation';
import { useRichTextRenderer } from '@/hook/useRichTextRenderer';
import stylesBtn from '@/assets/styles/main.module.scss';
import { useOpenAnimation } from './components/useOpenAnimation';
import { DocumentMobileInfo } from './components/DocumentMobileInfo';
import { DocumentHeader } from './components/DocumentHeader';
import dynamic from 'next/dynamic';

const DocumentList = dynamic(
    () => import('./components/DocumentList').then((mod) => mod.DocumentList),
    { ssr: false },
);

const DocumentImage = dynamic(
    () => import('./components/DocumentImage').then((mod) => mod.DocumentImage),
    { ssr: false },
);

const ActionButton = dynamic(
    () => import('./components/ActionButton').then((mod) => mod.ActionButton),
    { ssr: false },
);

const DocumentNavigationList = dynamic(
    () => import('./components/DocumentNavigationList').then((mod) => mod.DocumentNavigationList),
    { ssr: false },
);

const DocumentActions = dynamic(
    () => import('./components/DocumentActions').then((mod) => mod.DocumentActions),
    { ssr: false },
);



// Типы для рефов
type DivRef = HTMLDivElement | null;

const MainDocumentItem = memo(({
    img,
    title,
    content,
    documentsList,
    navigationList,
    price,
    link,
    duration,
    active,
    setActive,
    totalItems = 0,
    index = 0
}: MainDocumentItemProps) => {
    const { processContent } = useRichTextRenderer();
    const { width: windowWidth } = useWindowSize();
    const [listHidden, setListHidden] = useState(true);

    const { setButtonRef, setWrapperRef } = useButton();
    const { openDefaultModal } = useHeaderContext();
    const router = useRouter();

    const wrapperRef = useRef<DivRef>(null);

    // Мемоизация вычисляемых значений
    const hiddenList = useMemo(() => {
        return windowWidth && windowWidth < 1280 ? 1 : 2;
    }, [windowWidth]);

    const isMobile = useMemo(() => {
        return windowWidth && windowWidth < 960;
    }, [windowWidth]);

    const commonButtonClasses = `group  ${stylesBtn.tariff} ${stylesBtn.btnIconAn}`;

    // Мемоизация обработанного контента
    const processedContent = useMemo(() => {
        return processContent(content, true);
    }, [content, processContent]);

    // Мемоизация URL изображений
    const imageUrls = useMemo(() => ({
        thumbnail: 'https://test11.audiosector.ru/cp' + img?.formats?.thumbnail?.url,
        full: 'https://test11.audiosector.ru/cp' + img?.url
    }), [img]);

    // Мемоизация обработчиков
    const handleItemClick = useCallback(() => {
        setActive(!active);
    }, [active, setActive]);

    const handleOrderClick = useCallback(() => {
        openDefaultModal('orderForm');
    }, [openDefaultModal]);

    const handleServiceClick = useCallback(() => {
        router.push('/services/' + link);
    }, [router, link]);

    const handleNavigationClick = useCallback((item: any, event: React.MouseEvent) => {
        event.preventDefault();
        router.push('/services/' + link + '#block-' + item.id);
    }, [router, link]);

    const controls = useOpenAnimation(
        active,
        totalItems || 0,
        index || 0,
        wrapperRef as React.RefObject<HTMLDivElement>,
    );


    return (
        <div
            className={`document-wrapper-border group/main`}
        >

            <div
                className={`document__border ${!active ? 'group-active/main:!border-[transparent] group-hover/main:!border-[transparent]' : 'active'}`}
            />

            <div
                ref={wrapperRef}
                className={` document__box   ${!active ? 'active' : ''}`}>

                <div className={`pointer-events-none absolute top-0 bottom-0 right-0 left-0 z-[1] rounded-[6px]  ${!active ? 'group-hover/main:border-[#34446D]' : '!border-[#34446D]'} border-[transparent]  border-solid border`}></div>

                <DocumentHeader
                    index={index || 0}
                    title={title}
                    duration={duration}
                    price={price}
                    imageUrls={imageUrls}
                    active={active}
                    onClick={handleItemClick}
                />

                <div className={`document__hidden ${active && 'active bg-[#FFFFFF26]'}`}>
                    <div className="document__item  ">
                        <div className="document__list-photo">
                            {isMobile && (
                                <>
                                    <DocumentActions
                                        controls={controls}
                                        commonButtonClasses={commonButtonClasses}
                                        setWrapperRef={setWrapperRef}
                                        setButtonRef={setButtonRef}
                                        handleOrderClick={handleOrderClick}
                                        handleServiceClick={handleServiceClick}
                                        isMobile={true}
                                    />
                                    <DocumentMobileInfo duration={duration} price={price} />
                                </>
                            )}
                            <div className='document-photo-container'>
                                <DocumentImage
                                    title={title}
                                    duration={duration}
                                    price={price}
                                    imageUrls={imageUrls}
                                    index={index || 0}
                                    controls={controls}
                                    isPriority={(index || 0) <= 2}
                                />
                            </div>

                            <div className="document-photo-wrapper">
                                <div className="document-content-column">
                                    <div className="document-text-content">
                                        <div className='document-description'>
                                            {processedContent}
                                        </div>
                                        <DocumentList
                                            hiddenList={hiddenList}
                                            documentsList={documentsList}
                                            listHidden={listHidden}
                                            setListHidden={setListHidden}
                                        />
                                    </div>



                                    {!isMobile && (
                                        <DocumentActions
                                            controls={controls}
                                            commonButtonClasses={commonButtonClasses}
                                            setWrapperRef={setWrapperRef}
                                            setButtonRef={setButtonRef}
                                            handleOrderClick={handleOrderClick}
                                            handleServiceClick={handleServiceClick}
                                            isMobile={false}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="document__list-wrap">
                            <div className="flex flex-col gap-[20px]">
                                <DocumentNavigationList
                                    navigationList={navigationList}
                                    onNavigationClick={handleNavigationClick}
                                />
                            </div>

                            {!isMobile && (
                                <motion.div
                                    animate={controls}
                                    initial={{ y: 20 }}
                                    className={`${stylesBtn.tariffWrap} max-w-full w-[280px]  l:w-[250px] `}
                                >
                                    <ActionButton
                                        setRef={setButtonRef}
                                        onClick={handleServiceClick}
                                        text="Перейти в услугу"
                                        className={commonButtonClasses}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

MainDocumentItem.displayName = 'MainDocumentItem';

export default MainDocumentItem;
