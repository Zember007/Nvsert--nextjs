import '@/assets/styles/blocks/modals/modals.scss';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';
import AppIntroForm from '@/components/forms/AppIntroForm'
import Draggable from 'react-draggable';
import AppMainForm from '../forms/AppMainForm';
import { useAnimation, motion } from "framer-motion";

const AppKnowCostForm = dynamic(() => import('@/components/forms/AppKnowCostForm'), {
});



const AppSuccessMessage = dynamic(() => import('@/components/modals/AppSuccessMessage'), {
});

interface AppModalWrapperProps {
    setDefaultModalActive: (active: boolean) => void;
    defaultModalActive: boolean;
    defaultModalName: string;
    reset: () => void;
    countTrigger: number
}



const AppModalWrapper: React.FC<AppModalWrapperProps> = ({ reset, countTrigger, setDefaultModalActive, defaultModalActive, defaultModalName }) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const defaultSettings = {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
        times: [0, 0.2, 0.5, 0.8, 1],
        openY: [-100, 10, 0, 0],
    };

    const animation = () => {
        controls.start({
            y: defaultSettings.openY, // Используем openY для отскока
            transition: {
                duration: defaultSettings.duration,
                ease: [0.34, 1.56, 0.64, 1] as const,
                times: defaultSettings.times
            }
        });
    }

    useEffect(() => {
        if (defaultModalActive) {
            animation()
        } else {
            reset()
            resetDrag()
        }
    }, [defaultModalActive, countTrigger])

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleDrag = (e: any, data: any) => {
        setPosition({ x: data.x, y: data.y });
    };

    const resetDrag = () => {
        setPosition({ x: 0, y: 0 });
    };
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
                                <div id='modal-default' className=" modal__content main-form">
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
                                                bg={false} btnText='Оформить заявку' />

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