import Image from 'next/image';
import { useEffect, useRef, useState, memo, useId, useMemo, useCallback } from 'react';
import { filterPrepositions } from '@/hook/filter';
import '@/assets/lib/react-photo-view/dist/react-photo-view.css';

import { PhotoView } from '@/assets/lib/react-photo-view';
import { useButton } from '@/hook/useButton';
import { useAnimation, motion } from "framer-motion";
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { MainDocumentItemProps } from '@/types/documents';
import useWindowSize from '@/hook/useWindowSize';
import '@/assets/styles/sections/main/document-item.scss';
import { useRouter } from 'next/navigation';
import { useRichTextRenderer } from '@/hook/useRichTextRenderer';
import { DotNavItem } from '@/components/general/DotNavList';
import stylesBtn from '@/assets/styles/base/_button.module.scss';
import textSize from '@/assets/styles/base/text-size.module.scss';

// Выносим анимационные настройки
const ANIMATION_SETTINGS = {
    duration: 0.6,
    bounce: 5,
    delay: 0,
    ease: [0.34, 1.56, 0.64, 1],
    times: [0, 0.2, 0.5, 0.8, 1],
    openY: [0, 26, 0, 0, 0],
    closeY: [60, -6, 0, 0, 0],
};

// Выносим SVG иконки в константы
const ArrowRightIcon = memo(() => (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
    </svg>
));
ArrowRightIcon.displayName = 'ArrowRightIcon';

// Утилита для проверки видимости элемента
const isInViewport = (el: HTMLElement | null): boolean => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Утилита для скролла к элементу
const scrollToElement = (el: HTMLElement | null, totalItems: number, index: number) => {
    if (!el) return;
    const scrollOptions: ScrollIntoViewOptions = {
        behavior: 'smooth',
        block: totalItems / 2 > index ? 'start' : 'end'
    };
    el.scrollIntoView(scrollOptions);
};

interface ActionButtonProps {
    onClick: () => void;
    text: string;
    className: string;
    setRef: (el: HTMLButtonElement) => void
}

interface DocumentListProps {
    documentsList: MainDocumentItemProps['documentsList'];
    listHidden: boolean;
    setListHidden: (value: boolean) => void;
    hiddenList: number;
}

// Типы для рефов
type DivRef = HTMLDivElement | null;

// Компонент кнопки (убрали icon prop, используем ArrowRightIcon)
const ActionButton = memo(({ onClick, text, className, setRef }: ActionButtonProps) => (
    <button ref={setRef} onClick={onClick} className={`document__button ${className}`}>
        <span className="sendText ">{text}</span>
        <span className="sendIconLeft">
            <ArrowRightIcon />
        </span>
    </button>
));

ActionButton.displayName = 'ActionButton';



// Компонент списка документов
const DocumentList = memo(({ documentsList, listHidden, setListHidden, hiddenList }: DocumentListProps) => {
    const clip0_4632_2058 = useId();

    return (
        <div className="document__list">
            <div className='document__list-item'>
                <p className={`${textSize.text1}`}>
                    Необходимые документы для оформления
                </p>
                <ul className={`document__list-item-ul ${textSize.text2}`}>
                    {documentsList.map((list, index) => (

                        <li
                            className={` ${listHidden && (index >= hiddenList) ? 'hidden' : ''}`}
                            key={index}
                        >
                            {filterPrepositions(list.value)}
                        </li>
                    ))}
                </ul>
                {documentsList.length > hiddenList && (


                    <button
                        className={`document-list-show-button  ${stylesBtn.lineAfterBox}  !gap-[5px] ${stylesBtn.btnIconAn}`}
                        onClick={() => setListHidden(!listHidden)}
                    >
                        <span className={`${stylesBtn.lineAfter} !leading-[1.2] whitespace-nowrap`}>{listHidden ? 'Показать полный список документов' : 'Скрыть'}</span>

                        <svg
                            className={`${stylesBtn.sendIconLeft} document-list-arrow ${!listHidden ? 'rotate-[180deg]' : ''}`}
                            width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath={`url(#${clip0_4632_2058})`}>
                                <path d="M7 3.5H9V0.5H7L7 3.5ZM15 9.46767L13.5692 8.02908L9.01287 12.6092V6.5H6.98815V12.6092L2.43177 8.02908L1 9.46767L8 16.5L8.71538 15.7822L9.43177 15.0634L15 9.46767Z" fill="currentColor" />
                            </g>
                            <defs>
                                <clipPath id={clip0_4632_2058}>
                                    <rect width="16" height="16" fill="white" transform="matrix(0 1 -1 0 16 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </button>
                )}
            </div>

        </div>
    )
});

DocumentList.displayName = 'DocumentList';

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
    const controls = useAnimation();
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

    // Эффект для анимации и скролла
    useEffect(() => {
        if (!active) return;

        const timer = setTimeout(() => {
            controls.start({
                y: ANIMATION_SETTINGS.openY,
                transition: {
                    duration: ANIMATION_SETTINGS.duration,
                    ease: ANIMATION_SETTINGS.ease,
                    times: ANIMATION_SETTINGS.times
                }
            });
        }, 50);

        const el = wrapperRef.current;
        let timerScroll: NodeJS.Timeout | null = null;
        if (el && !isInViewport(el)) {
            timerScroll = setTimeout(() => scrollToElement(el, totalItems, index), 400);
        }

        return () => {
            clearTimeout(timer);
            if (timerScroll) clearTimeout(timerScroll);
        };
    }, [active, controls, totalItems, index]);


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

                <div
                    onClick={handleItemClick}
                    className={`document__navigation group/window ${!active ? '' : 'active'} `}>

                    <div
                        className={` ${active && 'active'} document__small-img `}
                    >
                        <Image
                            alt='document'
                            src={imageUrls.thumbnail}
                            width={41}
                            height={58}
                            loading="lazy"
                            sizes="41px"
                        />
                    </div>


                    <div
                        className={`document__navigation-bg document__navigation-wrap container-scale transition-scale backface-hidden ${active ? 'active' : 'text-[#000]'} group-active/window:text-[#FFF]   `}
                    >

                        <h3 className={`${textSize.headerH6} document__title`}>
                            {filterPrepositions(title)}
                        </h3>
                        <div className="document__desc-wrap">
                            <p className={`${textSize.headerH6} document__desc`}>{duration}</p>
                            <p className={`${textSize.headerH6} document__desc`}>{price}</p>



                            <svg
                                className={`${!active ? 'group-hover/window:*:stroke-black' : '*:stroke-[#FFF] rotate-[180deg]'}  hidden xl:block transition-all duration-200`}
                                width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.0459 1.0459L3.16722 3.16722M15.753 15.753L5.28854 5.28854" stroke="#93969D" strokeWidth="2" />
                                <path d="M15.7529 7.75293V14.4707L14.4717 15.7529H7.75293" stroke="#93969D" strokeWidth="2" />
                            </svg>


                        </div>
                    </div>
                </div>

                <div className={`document__hidden ${active && 'active bg-[#FFFFFF26]'}`}>
                    <div className="document__item  ">
                        <div className="document__list-photo">
                            {isMobile &&
                                <>

                                    <div className="document-content-wrapper">
                                        <motion.div
                                            animate={controls}
                                            initial={{ y: 20 }}
                                            className={`${stylesBtn.tariffWrap} w-[280px] l:mx-0 mx-auto l:w-[250px] `} ref={setWrapperRef}>
                                            <ActionButton
                                                setRef={setButtonRef}
                                                onClick={handleOrderClick}
                                                text="Оформить заявку"
                                                className={commonButtonClasses}
                                            />
                                        </motion.div>
                                        <motion.div
                                            animate={controls}
                                            initial={{ y: 20 }}
                                            className={`${stylesBtn.tariffWrap} w-[280px] l:mx-0 mx-auto l:w-[250px] `}>
                                            <ActionButton
                                                setRef={setButtonRef}
                                                onClick={handleServiceClick}
                                                text="Перейти в услугу"
                                                className={commonButtonClasses}
                                            />
                                        </motion.div>
                                    </div>

                                    <div className="document-mobile-info">
                                        <div className="document-info-item">
                                            <span className='document-info-label'>Срок оформления</span>
                                            <span className='document-info-value'>{duration}</span>
                                        </div>
                                        <div className="document-info-item">
                                            <span className='document-info-label'>Стоимость</span>
                                            <span className='document-info-value'>{price}</span>
                                        </div>
                                    </div>
                                </>
                            }
                            <div className='document-photo-container'>
                                <PhotoView
                                    title={title}
                                    description={
                                        <>
                                            <span>{duration}</span>
                                            <span>{price}</span>
                                        </>
                                    }
                                    src={imageUrls.full}
                                    width={475}
                                    height={667}
                                >

                                    <motion.div
                                        initial={{ y: 20 }}
                                        animate={controls}
                                        className="document__big-img ">
                                        <Image
                                            alt='document' src={imageUrls.full}
                                            width={250}
                                            height={349}
                                            loading={index === 1 ? 'eager' : 'lazy'}
                                            priority={index === 1}
                                            fetchPriority={index === 1 ? 'high' : 'auto'}
                                        />
                                    </motion.div>

                                </PhotoView>
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



                                    {!isMobile &&
                                        <motion.div
                                            animate={controls}
                                            initial={{ y: 20 }}
                                            className={`${stylesBtn.tariffWrap} max-w-full w-[280px]  l:w-[250px]`} ref={setWrapperRef}>
                                            <ActionButton
                                                setRef={setButtonRef}
                                                onClick={handleOrderClick}
                                                text="Оформить заявку"
                                                className={commonButtonClasses}
                                            />
                                        </motion.div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="document__list-wrap">
                            <div className="flex flex-col gap-[20px]">
                                {navigationList.map((item, index) => (
                                    <DotNavItem 
                                        key={index} 
                                        item={item} 
                                        index={index} 
                                        onClick={handleNavigationClick} 
                                        disabledPadding={true}
                                    />
                                ))}
                            </div>

                            {!isMobile &&
                                <motion.div
                                    animate={controls}
                                    initial={{ y: 20 }}
                                    className={`${stylesBtn.tariffWrap} max-w-full w-[280px]  l:w-[250px] `}>
                                    <ActionButton
                                        setRef={setButtonRef}
                                        onClick={handleServiceClick}
                                        text="Перейти в услугу"
                                        className={commonButtonClasses}
                                    />
                                </motion.div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

MainDocumentItem.displayName = 'MainDocumentItem';

export default MainDocumentItem;
