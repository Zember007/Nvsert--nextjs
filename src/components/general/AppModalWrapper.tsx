import { useHeaderContext } from '@/components/contexts/HeaderContext'
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';
import AppIntroForm from '@/components/forms/AppIntroForm'
import Draggable from 'react-draggable';
import AppMainForm from '../forms/AppMainForm';
import { useAnimation, motion } from "framer-motion";

const AppKnowCostForm = dynamic(() => import('@/components/forms/AppKnowCostForm'), {
    loading: () => <p>Loading...</p>,
});



const AppSuccessMessage = dynamic(() => import('@/components/modals/AppSuccessMessage'), {
    loading: () => <p>Loading...</p>,
});

interface AppModalWrapperProps {
    setDefaultModalActive: (active: boolean) => void;
    defaultModalActive: boolean;
    defaultModalName: string;
}



const AppModalWrapper: React.FC<AppModalWrapperProps> = ({ setDefaultModalActive, defaultModalActive, defaultModalName }) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const defaultSettings = {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        times: [0, 0.2, 0.5, 0.8, 1],
        openY: [-100, 10, 0, 0],
    };

    const animation = () => {
        controls.start({
            y: defaultSettings.openY, // Используем openY для отскока
            transition: {
                duration: defaultSettings.duration,
                ease: defaultSettings.ease,
                times: defaultSettings.times,
                delay: 0.2
            }
        });
    }

    useEffect(() => {
        if (defaultModalActive) {
            animation()
        } else {
            resetDrag()
        }
    }, [defaultModalActive])

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleDrag = (e: any, data: any) => {
        setPosition({ x: data.x, y: data.y });
    };

    const resetDrag = () => {
        setPosition({ x: 0, y: 0 });
    };
    return (
        <>
            <div className={`modal__wrapper select-none ${defaultModalActive && 'active'}`}>
                <Draggable
                    position={position} onDrag={handleDrag}
                    bounds="parent" handle=".modal__content" defaultPosition={{ x: 0, y: 0 }} nodeRef={nodeRef as React.RefObject<HTMLDivElement>}>
                    <div ref={nodeRef}>
                        <motion.div
                            animate={controls}
                            className={`modal__box modal ${defaultModalActive && 'active'}`} onClick={(e) => { e.stopPropagation() }}>
                            <div id='modal-default' className=" modal__content main-form">
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

                                        <AppIntroForm
                                            close={() => { setDefaultModalActive(false) }}
                                        />

                                    </>
                                }

                                {
                                    defaultModalName === 'orderForm' &&
                                    <>

                                        <AppMainForm
                                            close={() => { setDefaultModalActive(false) }}
                                            active={defaultModalActive}
                                            bg={false} btnText='Оформить заявку' />

                                    </>
                                }

                                {
                                    defaultModalName === 'knowCost' &&

                                    <AppKnowCostForm />

                                }
                            </div>
                        </motion.div>
                    </div>
                </Draggable>
            </div>
        </>
    );
};

export default AppModalWrapper;