import { useRef, useState, memo, useMemo, useCallback } from 'react';
import { useButton, useWindowSize } from 'shared/hooks';
import { motion } from 'framer-motion';
import { useHeaderContext } from 'shared/contexts';
import { MainDocumentItemProps } from '@/types/documents';
import { useRouter } from 'next/navigation';
import { useRichTextRenderer } from 'shared/lib';
import stylesBtn from '@/assets/styles/base/base.module.scss';
import { useOpenAnimation } from './components/useOpenAnimation';
import { DocumentMobileInfo } from './components/DocumentMobileInfo';
import { DocumentHeader } from './components/DocumentHeader';
import dynamic from 'next/dynamic';
import mainDocumentsStyles from '@/assets/styles/sections/main/main-documents.module.scss';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, withLocalePrefix } from 'shared/i18n/client-locale';

/** Только вертикаль курсора внутри карточки, симметрично вверх/вниз (как Skills, без rotateY) */
const DOCUMENT_TILT_MIN_WIDTH = 1407;
const HOVER_ROTATE_X_MAX = 10;

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
    index = 0,
    isVirtualized = false
}: MainDocumentItemProps) => {
    const { t } = useTranslation();
    const { processContent } = useRichTextRenderer();
    const { width: windowWidth } = useWindowSize();
    const [listHidden, setListHidden] = useState(true);

    const { setButtonRef, setWrapperRef } = useButton();
    const { openDefaultModal } = useHeaderContext();
    const router = useRouter();
    const pathname = usePathname();
    const locale = getLocaleFromPathname(pathname);

    const wrapperRef = useRef<DivRef>(null);
    const [tiltRotateXdeg, setTiltRotateXdeg] = useState<number | null>(null);

    // Мемоизация вычисляемых значений
    const hiddenList = useMemo(() => {
        return windowWidth && windowWidth < 1280 ? 1 : 2;
    }, [windowWidth]);

    const isMobile = useMemo(() => {
        return windowWidth && windowWidth < 960;
    }, [windowWidth]);

    const isTiltInteractionEnabled = useMemo(
        () => Boolean(windowWidth && windowWidth >= DOCUMENT_TILT_MIN_WIDTH),
        [windowWidth],
    );

    const updateDocumentTilt = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!isTiltInteractionEnabled) return;
            const el = wrapperRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const halfH = rect.height / 2;
            const mouseY = e.clientY - rect.top - halfH;
            const mousePY = halfH > 0 ? mouseY / halfH : 0;
            const clampedPY = Math.max(-1, Math.min(1, mousePY));
            // Верх карточки (−1) и низ (+1) дают противоположные знаки, одинаковая величина
            const rotateX = clampedPY * -HOVER_ROTATE_X_MAX;

            setTiltRotateXdeg(rotateX);
        },
        [isTiltInteractionEnabled],
    );

    const clearDocumentTilt = useCallback(() => {
        setTiltRotateXdeg(null);
    }, []);

    const commonButtonClasses = ``;

    // Мемоизация обработанного контента
    const processedContent = useMemo(() => {
        return processContent(content, true);
    }, [content, processContent]);

    // Мемоизация URL изображений
    const imageUrls = useMemo(() => ({
        thumbnail: '' + img?.formats?.thumbnail?.url,
        full: '' + img?.url
    }), [img]);

    // Мемоизация обработчиков
    const handleItemClick = useCallback(() => {
        setActive(!active);
    }, [active, setActive]);

    const handleOrderClick = useCallback(() => {
        openDefaultModal('orderForm');
    }, [openDefaultModal]);

    const handleServiceClick = useCallback(() => {
        router.push(withLocalePrefix(`/services/${link}`, locale));
    }, [router, link, locale]);

    const handleNavigationClick = useCallback((item: any, event: React.MouseEvent) => {
        event.preventDefault();
        router.push(withLocalePrefix(`/services/${link}#block-${item.id}`, locale));
    }, [router, link, locale]);

    const controls = useOpenAnimation(
        active,
        totalItems || 0,
        index || 0,
        wrapperRef as React.RefObject<HTMLDivElement>,
    );


    return (
        <div
            className={` ${mainDocumentsStyles['document-wrapper-border']} ${active ? mainDocumentsStyles['document-wrapper-border-active'] : ''} group/main`}
        >

           

            <div
                ref={wrapperRef}
                onMouseMove={isTiltInteractionEnabled ? updateDocumentTilt : undefined}
                onMouseLeave={isTiltInteractionEnabled ? clearDocumentTilt : undefined}
                style={
                    tiltRotateXdeg !== null && isTiltInteractionEnabled
                        ? { transform: `rotateX(${tiltRotateXdeg}deg)` }
                        : undefined
                }
                className={` ${mainDocumentsStyles['document__box']} ${active ? mainDocumentsStyles.active : ''}`}>

                <DocumentHeader
                    index={index || 0}
                    title={title}
                    duration={duration}
                    price={price}
                    imageUrls={imageUrls}
                    active={active}
                    onClick={handleItemClick}
                />

                <div className={`${mainDocumentsStyles['document__hidden']} ${active ? mainDocumentsStyles.active : ''}`}>
                    <div className={`${mainDocumentsStyles['document__item']}  `}>
                        <div className={`${mainDocumentsStyles['document__list-photo']} `}>
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
                            <div className={`${mainDocumentsStyles['document-photo-container']} `}>
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

                            <div className={`${mainDocumentsStyles['document-photo-wrapper']} `}>
                                <div className={`${mainDocumentsStyles['document-content-column']} `}>
                                    <div className={`${mainDocumentsStyles['document-text-content']} `}>
                                        <div className={`${mainDocumentsStyles['document-description']} `}>
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

                        <div className={`${mainDocumentsStyles['document__list-wrap']} `}>
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
                                        text={t('documents.goToService')}
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
