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

// Выносим анимационные настройки
const ANIMATION_SETTINGS = {
    duration: 0.6,
    bounce: 5,
    delay: 0,
    ease: [0.34, 1.56, 0.64, 1],
    times: [0, 0.2, 0.5, 0.8, 1],
    openY: [0, 26, 0, 0, 0],
    closeY: [60, -6, 0, 0, 0],
    opacity: [0, 1, 1, 1, 1],
};

interface ActionButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    text: string;
    className: string;
    setRef: (el: HTMLButtonElement) => void
}

interface DocumentListProps {
    content1: MainDocumentItemProps['content1'];
    listHidden: boolean;
    setListHidden: (value: boolean) => void;
}

// Типы для рефов
type DivRef = HTMLDivElement | null;
type ImageRef = HTMLImageElement | null;

// Компонент кнопки
const ActionButton = memo(({ onClick, icon, text, className, setRef }: ActionButtonProps) => (
    <button ref={setRef} onClick={onClick} className={`document__button ${className}`}>
        <span className="sendIconLeft">
            {icon}
        </span>
        <span className="sendText">{text}</span>
    </button>
));

ActionButton.displayName = 'ActionButton';

// Компонент списка документов
const DocumentList = memo(({ content1, listHidden, setListHidden }: DocumentListProps) => (
    <div className="document__list">
        {content1.map((cont, contIndex) => (
            <div key={contIndex} className='document__list-item'>
                <p className={`${contIndex === 0 ? 'm:text-[19px]' : ''} text-[16px] font-bold`}>
                    {filterPrepositions(cont.title)}
                </p>
                {cont.subtitle && <span>{cont.subtitle}</span>}
                <ul className='document__list-item-ul '>
                    {cont.list.map((list, index) => (
                        <li
                            className={`${listHidden && (index > 2 || contIndex > 0) && 'hidden'}`}
                            key={index}
                        >
                            {filterPrepositions(list)}
                        </li>
                    ))}
                </ul>
                {cont.list.length > 3 && (
                    <button
                        className='text-[#34446D] font-bold text-[16px] text-left inline-flex gap-[5px]'
                        onClick={() => setListHidden(!listHidden)}
                    >
                        {listHidden ? 'Показать полный список документов' : 'Скрыть'}

                        <svg
                            className={`${listHidden ? 'rotate-[180deg]' : ''}`}
                            width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_4632_2058)">
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
        ))}
    </div>
));

DocumentList.displayName = 'DocumentList';

const MainDocumentItem = memo(({
    setPhoto,
    img,
    index,
    title,
    content,
    content1,
    price,
    duration,
    active,
    setActive
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

        const width = container.offsetHeight / img.height * img.width;
        setPhotoWidth(width >= 190 ? width : 190);
    }, [containerPhotoRef.current, img.height, img.width]);

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
        const documents_box = document.getElementById('documents_box');
        if (!documents_box || !el) return;

        const scrollOptions: ScrollIntoViewOptions = {
            behavior: 'smooth',
            block: 'start'
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

        controls.start({
            y: ANIMATION_SETTINGS.openY,
            opacity: ANIMATION_SETTINGS.opacity,
            transition: {
                duration: ANIMATION_SETTINGS.duration,
                ease: ANIMATION_SETTINGS.ease,
                times: ANIMATION_SETTINGS.times
            }
        });

        const el = wrapperRef.current;
        if (el && !isInViewport(el)) {
            setTimeout(() => scrollToElement(el), 200);
        }
    }, [active, controls]);

    const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (photoRef.current?.contains(target)) return;
        if (LinkServiceRef.current?.contains(target) && active) return;
        setActive(!active);
    };

    const commonButtonClasses = 'group btnIconAn doc-btn tariff ';

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
                            alt='document' src={img}
                            width="41"
                            height="58"
                        />
                    </div>


                    <div
                        className={`document__navigation-bg document__navigation-wrap container-scale transition-scale backface-hidden ${active ? 'active' : 'text-[#000]'} group-active/window:text-[#FFF]   `}
                    >

                        <h3 className="document__title">
                            {title}
                        </h3>
                        <div className="document__desc-wrap">
                            <p className="document__desc">{duration}</p>
                            <p className="document__desc">{price}</p>


                            <svg
                                className={`${!active ? '' : '*:stroke-[#FFF] rotate-[180deg]'}  hidden m:block transition-all duration-200`}
                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 5L19 19" stroke="#93969D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19 11L19 19L11 19" stroke="#93969D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </div>
                    </div>
                </div>

                <div className={`document__hidden arial ${active && 'active bg-[#FFFFFF26]'}`}>
                    <div className="document__item  ">
                        <div className="document__list-photo">
                            {windowWidth && windowWidth < 768 &&
                                <>

                                    <div className="flex flex-col gap-[10px] w-full">
                                        <motion.div
                                            animate={controls}
                                            initial={{ y: 20 }}
                                            className="tariff-wrap w-[280px] m:mx-0 mx-auto m:w-[250px]" ref={setWrapperRef}>
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
                                            className="tariff-wrap w-[280px] m:mx-0 mx-auto m:w-[250px] " ref={setWrapperRef}>
                                            <ActionButton
                                                setRef={setButtonRef}
                                                onClick={() => openDefaultModal('orderForm')}
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

                                    <div className="flex gap-[10px]">
                                        <div className="flex flex-col gap-[5px] items-center">
                                            <span className='text-[14px] text-[#00000080]'>Срок оформления</span>
                                            <span className='text-[18px] font-bold'>{duration}</span>
                                        </div>
                                        <div className="flex flex-col gap-[5px] items-center">
                                            <span className='text-[14px] text-[#00000080]'>Стоимость</span>
                                            <span className='text-[18px] font-bold'>{price}</span>
                                        </div>
                                    </div>
                                </>
                            }
                            <div className='m:m-0 m-auto'>
                                <PhotoView
                                    src={img.src}
                                    width={475}
                                    height={667}
                                >

                                    <motion.div
                                        ref={photoRef}
                                        onClick={() => setPhoto()}
                                        initial={{ y: 20 }}
                                        animate={controls}
                                        className="document__big-img">
                                        <Image
                                            alt='document' src={img}
                                            width={photoWidth || 190}
                                            height={photoWidth / img.width * img.height || 267} />
                                    </motion.div>

                                </PhotoView>
                            </div>

                            <div ref={containerPhotoRef} className="grow flex justify-center">
                                <div className=" flex flex-col justify-between  items-start">
                                    <div className="flex flex-col gap-[40px]">
                                        <p className='text-[16px] text-[#000000] m:max-w-[360px]'>
                                            {filterPrepositions(content.text)}
                                        </p>
                                        <p className='hidden m:block text-[16px] text-[#000000] m:max-w-[300px]'>
                                            {content.text1 && filterPrepositions(content.text1)}
                                        </p>
                                    </div>

                                    {windowWidth && windowWidth >= 768 &&
                                        <motion.div
                                            animate={controls}
                                            initial={{ y: 20 }}
                                            className="tariff-wrap w-[280px] m:mx-0 mx-auto m:w-[250px] " ref={setWrapperRef}>
                                            <ActionButton
                                                setRef={setButtonRef}
                                                onClick={() => openDefaultModal('orderForm')}
                                                icon={
                                                    <ServiceMoveIcon className='group-hover:*:fill-[#FFF]' />
                                                }
                                                text="Перейти в услугу"
                                                className={commonButtonClasses}
                                            />
                                        </motion.div>}
                                </div>
                            </div>
                        </div>

                        <div className="document__list-wrap">
                            <DocumentList
                                content1={content1}
                                listHidden={listHidden}
                                setListHidden={setListHidden}
                            />
                            {windowWidth && windowWidth >= 768 &&
                                <motion.div
                                    animate={controls}
                                    initial={{ y: 20 }}
                                    className="tariff-wrap w-[280px] m:mx-0 mx-auto m:w-[250px]" ref={setWrapperRef}>
                                    <ActionButton
                                        setRef={setButtonRef}
                                        onClick={() => openDefaultModal('orderForm')}
                                        icon={
                                            <SendIcon className='group-hover:*:fill-[#FFF]' />
                                        }
                                        text="Оформить заявку"
                                        className={commonButtonClasses}
                                    />
                                </motion.div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

MainDocumentItem.displayName = 'MainDocumentItem';

export default MainDocumentItem;
