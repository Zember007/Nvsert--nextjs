import Image from 'next/image';
import { useEffect, useRef, useState, memo } from 'react';
import { filterPrepositions } from '@/hook/filter';
import { PhotoView } from '@/assets/lib/react-photo-view';
import { useButton } from '@/hook/useButton';
import { useAnimation, motion } from "framer-motion";
import { useHeaderContext } from '@/components/contexts/HeaderContext';
import { MainDocumentItemProps } from '@/types/documents';
import SendIcon from '@/components/svg/SendIcon';
import ServiceMoveIcon from '../svg/ServiceMoveIcon';
import useWindowWidth from '@/hook/useWindowWidth';
import '@/assets/styles/sections/main/document-item.scss';
import { useRouter } from 'next/navigation';

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

interface ActionButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
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
type ImageRef = HTMLImageElement | null;

// Компонент кнопки
const ActionButton = memo(({ onClick, icon, text, className, setRef }: ActionButtonProps) => (
    <button ref={setRef} onClick={onClick} className={`document__button ${className}`}>
        <span className="sendText ">{text}</span>
        <span className="sendIconLeft">
            {icon}
        </span>
    </button>
));

ActionButton.displayName = 'ActionButton';


// Компонент списка документов
const DocumentList = memo(({ documentsList, listHidden, setListHidden, hiddenList }: DocumentListProps) => (
    <div className="document__list">
        <div className='document__list-item'>
            <p className={`text-1`}>
                Необходимые документы для оформления
            </p>
            <ul className='document__list-item-ul text-2'>
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
                    className='document-list-show-button  line-after__box btnIconAn !gap-[5px]'
                    onClick={() => setListHidden(!listHidden)}
                >
                    <span className=' line-after !leading-[1.2] whitespace-nowrap'>{listHidden ? 'Показать полный список документов' : 'Скрыть'}</span>

                    <svg
                        className={`sendIconLeft document-list-arrow ${!listHidden ? 'rotate-[180deg]' : ''}`}
                        width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_4632_2058)">
                            <path d="M7 3.5H9V0.5H7L7 3.5ZM15 9.46767L13.5692 8.02908L9.01287 12.6092V6.5H6.98815V12.6092L2.43177 8.02908L1 9.46767L8 16.5L8.71538 15.7822L9.43177 15.0634L15 9.46767Z" fill="#34446D" />
                        </g>
                        <defs>
                            <clipPath id="clip0_4632_2058">
                                <rect width="16" height="16" fill="white" transform="matrix(0 1 -1 0 16 0.5)" />
                            </clipPath>
                        </defs>
                    </svg>

                </button>
            )}
        </div>

    </div>
));

DocumentList.displayName = 'DocumentList';

const MainDocumentItem = memo(({
    setPhoto,
    img,
    title,
    content,
    documentsList,
    price,
    link,
    duration,
    active,
    setActive,
    totalItems = 0,
    index = 0
}: MainDocumentItemProps) => {
    const windowWidth = useWindowWidth()
    const controls = useAnimation();
    const [listHidden, setListHidden] = useState(true);
    const [photoWidth, setPhotoWidth] = useState(0);

    const { setButtonRef, setWrapperRef } = useButton();
    const { openDefaultModal } = useHeaderContext();

    const wrapperRef = useRef<DivRef>(null);
    const photoRef = useRef<DivRef>(null);
    const containerPhotoRef = useRef<DivRef>(null);
    const LinkServiceRef = useRef<DivRef>(null);
    const smallPhotoRef = useRef<ImageRef>(null);

    // Вычисление ширины фото
    useEffect(() => {
        const container = containerPhotoRef.current;
        if (!container) return;

        const width = img ? container.offsetHeight / img.height * img.width : 0;
        setPhotoWidth(width >= 190 ? width : 190);
    }, [containerPhotoRef.current, img?.height, img?.width]);

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

    const scrollToElement = (el: HTMLElement | null) => {

        if (!el) return;

        const scrollOptions: ScrollIntoViewOptions = {
            behavior: 'smooth',
            block: totalItems / 2 > index ? 'start' : 'end'
        };

        // if (index === 0) {
        //     documents_box.scrollIntoView({ ...scrollOptions, block: 'start' });
        // } else if (index === 17) {
        //     documents_box.scrollIntoView({ ...scrollOptions, block: 'start' });
        // } else {
        //     el.scrollIntoView(scrollOptions);
        // }

        el.scrollIntoView(scrollOptions);

    };

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
        }, 150);

        const el = wrapperRef.current;
        let timerScroll: NodeJS.Timeout | null = null;
        if (el && !isInViewport(el)) {
            timerScroll = setTimeout(() => scrollToElement(el), 400);
        }

        return () => {
            if (timer) clearTimeout(timer);
            if (timerScroll) clearTimeout(timerScroll);
        };
    }, [active, controls]);

    const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (photoRef.current?.contains(target)) return;
        if (LinkServiceRef.current?.contains(target) && active) return;
        setActive(!active);
    };

    const commonButtonClasses = 'group btnIconAn doc-btn tariff ';

    const hiddenList = windowWidth && windowWidth < 1240 ? 1 : 2;

    const router = useRouter();


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
                            ref={smallPhotoRef}
                            alt='document'
                            src={'https://test11.audiosector.ru/cp' + img?.url}
                            width="41"
                            height="58"
                        />
                    </div>


                    <div
                        className={`document__navigation-bg document__navigation-wrap container-scale transition-scale backface-hidden ${active ? 'active' : 'text-[#000]'} group-active/window:text-[#FFF]   `}
                    >

                        <h6 className="document__title">
                            {filterPrepositions(title)}
                        </h6>
                        <div className="document__desc-wrap">
                            <h6 className="document__desc">{duration}</h6>
                            <h6 className="document__desc">{price}</h6>


                            
                            <svg
                            className={`${!active ? '' : '*:stroke-[#FFF] rotate-[180deg]'}  hidden xl:block transition-all duration-200`}
                            width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.0459 1.0459L3.16722 3.16722M15.753 15.753L5.28854 5.28854" stroke="black" stroke-width="2" />
                                <path d="M15.7529 7.75293V14.4707L14.4717 15.7529H7.75293" stroke="black" stroke-width="2" />
                            </svg>


                        </div>
                    </div>
                </div>

                <div className={`document__hidden ${active && 'active bg-[#FFFFFF26]'}`}>
                    <div className="document__item  ">
                        <div className="document__list-photo">
                            {windowWidth && windowWidth < 900 &&
                                <>

                                    <div className="document-content-wrapper">
                                        <motion.div
                                            animate={controls}
                                            initial={{ y: 20 }}
                                            className="tariff-wrap w-[280px] l:mx-0 mx-auto l:w-[250px] " ref={setWrapperRef}>
                                            <ActionButton
                                                setRef={setButtonRef}
                                                onClick={() => openDefaultModal('orderForm')}
                                                icon={
                                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
                                                    </svg>

                                                }
                                                text="Оформить заявку"
                                                className={commonButtonClasses}
                                            />
                                        </motion.div>
                                        <motion.div
                                            animate={controls}
                                            initial={{ y: 20 }}
                                            className="tariff-wrap w-[280px] l:mx-0 mx-auto l:w-[250px] " ref={setWrapperRef}>
                                            <ActionButton
                                                setRef={setButtonRef}
                                                onClick={() => router.push('/services/' + link)}
                                                icon={
                                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
                                                    </svg>

                                                }
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
                                    src={'https://test11.audiosector.ru/cp' + img?.url}
                                    width={475}
                                    height={667}
                                >

                                    <motion.div
                                        ref={photoRef}
                                        onClick={() => setPhoto()}
                                        initial={{ y: 20 }}
                                        animate={controls}
                                        className="document__big-img ">
                                        <Image
                                            alt='document' src={'https://test11.audiosector.ru/cp' + img?.url}
                                            width={photoWidth || 190}
                                            height={photoWidth / img?.width * img?.height || 267} />
                                    </motion.div>

                                </PhotoView>
                            </div>

                            <div ref={containerPhotoRef} className="document-photo-wrapper">
                                <div className="document-content-column">
                                    <div className="document-text-content">
                                        <p className='document-description whitespace-pre-line '>
                                            {content}
                                        </p>

                                    </div>



                                    {windowWidth && windowWidth >= 900 &&
                                        <motion.div
                                            animate={controls}
                                            initial={{ y: 20 }}
                                            className="tariff-wrap w-[280px]  l:w-[250px]" ref={setWrapperRef}>
                                            <ActionButton
                                                setRef={setButtonRef}
                                                onClick={() => openDefaultModal('orderForm')}
                                                icon={
                                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
                                                    </svg>
                                                }
                                                text="Оформить заявку"
                                                className={commonButtonClasses}
                                            />
                                        </motion.div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="document__list-wrap">
                            <DocumentList
                                hiddenList={hiddenList}
                                documentsList={documentsList}
                                listHidden={listHidden}
                                setListHidden={setListHidden}
                            />
                            {windowWidth && windowWidth >= 900 &&
                                <motion.div
                                    animate={controls}
                                    initial={{ y: 20 }}
                                    className="tariff-wrap w-[280px]  l:w-[250px] " ref={setWrapperRef}>
                                    <ActionButton
                                        setRef={setButtonRef}
                                        onClick={() => router.push('/services/' + link)}
                                        icon={
                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
                                            </svg>
                                        }
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
