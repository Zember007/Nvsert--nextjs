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
        <span className="sendIconLeft transition-all ease-in m:block hidden">
            {icon}
        </span>
        <span className="transition-all ease-in sendText">{text}</span>
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
                        <svg className={`${!listHidden ? 'rounded-[180deg]' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="#34446D" version="1.1" id="Layer_1" width="18" height="18" viewBox="0 0 100 100" enable-background="new 0 0 100 100" >
                            <g>
                                <path d="M50.5,19.881c-1.104,0-2,0.896-2,2V72.17L33.193,56.609c-0.781-0.781-1.922-0.781-2.703,0   c-0.781,0.78-0.719,2.047,0.062,2.828l18.883,18.857c0.375,0.375,0.899,0.586,1.43,0.586s1.047-0.211,1.422-0.586l18.857-18.857   c0.781-0.781,0.783-2.048,0.002-2.828c-0.781-0.781-2.296-0.781-3.077,0L52.5,71.933V21.881C52.5,20.776,51.604,19.881,50.5,19.881   z" />
                            </g>
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

                <div className={`pointer-events-none absolute top-0 bottom-0 right-0 left-0 z-[-1] rounded-[6px]  ${!active ? 'group-hover/main:border-[#34446D]' : '!border-[#34446D]'} border-[transparent]  border-solid border`}></div>

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
                                className={`${!active ? 'rotate-[180deg]  ' : '*:stroke-[#FFF]'} *:transition-all *:duration-200   hidden m:block transition-all duration-200`}
                                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 19L5 5" stroke={`#93969D`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5 13L5 5L13 5" stroke={`#93969D`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className={`${active && 'bg-[#FFFFFF26] backdrop-blur-[1px]'}`}>
                    <div className={`document__hidden ${active && 'active'}`}>
                        <div className="document__item  ">
                            <div className="document__list-photo">
                                {windowWidth && windowWidth < 768 &&
                                    <>

                                        <div className="flex flex-col gap-[10px] w-full">
                                            <motion.div
                                                animate={controls}
                                                initial={{ y: 20 }}
                                                className="tariff-wrap w-full m:w-[250px]" ref={setWrapperRef}>
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
                                            <motion.div
                                                animate={controls}
                                                initial={{ y: 20 }}
                                                className="tariff-wrap w-full m:w-[250px] " ref={setWrapperRef}>
                                                <ActionButton
                                                    setRef={setButtonRef}
                                                    onClick={() => openDefaultModal('orderForm')}
                                                    icon={
                                                        <ServiceMoveIcon className='group-hover:*:fill-[#FFF]' />
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
                                                className="tariff-wrap w-full m:w-[250px] " ref={setWrapperRef}>
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
                                        className="tariff-wrap w-full m:w-[250px]" ref={setWrapperRef}>
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
        </div>
    );
});

MainDocumentItem.displayName = 'MainDocumentItem';

export default MainDocumentItem;
