import { useHeaderContext } from '@/components/contexts/HeaderContext'
import dynamic from 'next/dynamic';
import { Suspense, useRef } from 'react';
import AppIntroForm from '@/components/forms/AppIntroForm'
import Draggable from 'react-draggable';

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
    return (
        <>
            <div className={`modal__wrapper ${defaultModalActive && 'active'}`}
                onClick={() => {
                    setDefaultModalActive(false)
                }}
            >
                <Draggable defaultPosition={{ x: 0, y: 0 }} nodeRef={nodeRef as React.RefObject<HTMLElement>}>
                    <div
                        ref={nodeRef}
                        className={`modal__box modal ${defaultModalActive && 'active'}`} onClick={(e) => { e.stopPropagation() }}>
                        <div id='modal-default' className="modal__content main-form">
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
                                defaultModalName === 'knowCost' &&

                                <AppKnowCostForm />

                            }
                        </div>
                    </div>
                </Draggable>
            </div>
        </>
    );
};

export default AppModalWrapper;