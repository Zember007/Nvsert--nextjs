import '@/assets/styles/blocks/modals/modals.scss';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import AppIntroForm from 'widgets/forms/AppIntroForm'
import Draggable from 'react-draggable';
import AppMainForm from '../forms/AppMainForm';
import { useAnimation, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import formStyles from '@/assets/styles/base/base.module.scss';
import '@/assets/styles/blocks/close-btn.scss'

const AppKnowCostForm = dynamic(() => import('widgets/forms/AppKnowCostForm'), {});



const AppSuccessMessage = dynamic(() => import('widgets/modals/AppSuccessMessage'), {});

interface AppModalWrapperProps {
    setDefaultModalActive: (active: boolean) => void;
    defaultModalActive: boolean;
    defaultModalName: string;
    reset: () => void;
    countTrigger: number
}

const DEFAULT_MODAL_ANIMATION_SETTINGS: {
    duration: number;
    ease: number[];
    times: number[];
    openY: number[];
} = {
    duration: 0.3,
    ease: [0.34, 1.56, 0.64, 1],
    times: [0, 0.2, 0.5, 0.8, 1],
    openY: [-100, 10, 0, 0],
};



const AppModalWrapper: React.FC<AppModalWrapperProps> = ({ reset, countTrigger, setDefaultModalActive, defaultModalActive, defaultModalName }) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const { t } = useTranslation();

    const animation = useCallback(() => {
        controls.start({
            y: DEFAULT_MODAL_ANIMATION_SETTINGS.openY, // Используем openY для отскока
            transition: {
                duration: DEFAULT_MODAL_ANIMATION_SETTINGS.duration,
                ease: DEFAULT_MODAL_ANIMATION_SETTINGS.ease,
                times: DEFAULT_MODAL_ANIMATION_SETTINGS.times
            }
        });
    }, [controls])

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleDrag = (e: any, data: any) => {
        setPosition({ x: data.x, y: data.y });
    };

    const resetDrag = useCallback(() => {
        setPosition((prev) => (prev.x === 0 && prev.y === 0 ? prev : { x: 0, y: 0 }));
    }, []);

    const resetRef = useRef(reset);
    useEffect(() => {
        resetRef.current = reset;
    }, [reset]);

    useEffect(() => {
        if (defaultModalActive) {
            animation();
        } else {
            resetRef.current();
            resetDrag();
        }
    }, [defaultModalActive, countTrigger, animation, resetDrag]);
    return (
        <>
            <div className={`modal__wrapper ${defaultModalActive && 'active'}`}>
                <Draggable
                    position={position} onDrag={handleDrag}
                    bounds="parent" cancel=".no-drag" defaultPosition={{ x: 0, y: 0 }} nodeRef={nodeRef as React.RefObject<HTMLDivElement>}>
                    <div ref={nodeRef}>
                        <motion.div
                            animate={controls}
                            className={`modal__box  modal ${defaultModalActive && 'active'}`} onClick={(e) => { e.stopPropagation() }}>
                            {defaultModalActive &&
                                <div id='modal-default' className={`modal__content ${formStyles['main-form']}`}>
                                    <button
                                        onClick={() => { setDefaultModalActive(false) }}
                                        className={`no-drag absolute s:top-[20px] s:right-[20px] top-[5px] right-[5px] s:p-[5px] p-[6px] z-[3000]`}>
                                        <div className="close">
                                            <div className="in">
                                                <div className="close-button-block "></div>
                                                <div className="close-button-block "></div>
                                            </div>
                                            <div className="out">
                                                <div className="close-button-block "></div>
                                                <div className="close-button-block "></div>
                                            </div>
                                        </div>
                                    </button>
                                    {
                                        defaultModalName === 'successMessage' &&
                                        <>
                                            <Suspense fallback={<p></p>}>
                                                <AppSuccessMessage />
                                            </Suspense>
                                        </>
                                    }
                                    {
                                        defaultModalName === 'introForm' &&
                                        <>

                                            <AppIntroForm />

                                        </>
                                    }

                                    {
                                        defaultModalName === 'orderForm' &&
                                        <>

                                            <AppMainForm
                                                active={defaultModalActive}
                                                bg={false} btnText={t('form.buttons.submitApplication')} />

                                        </>
                                    }

                                    {
                                        defaultModalName === 'knowCost' &&

                                        <AppKnowCostForm />

                                    }
                                </div>
                            }
                        </motion.div>
                    </div>
                </Draggable>
            </div>
        </>
    );
};

export default AppModalWrapper;