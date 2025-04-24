import { useHeaderContext } from '@/components/contexts/HeaderContext'
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import AppIntroForm from '@/components/forms/AppIntroForm'

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
    return (
        <>
            <div className={`modal__wrapper ${defaultModalActive && 'active'}`}
                onClick={() => {
                    setDefaultModalActive(false)
                }}
            >
                <div className={`modal__box modal ${defaultModalActive && 'active'}`} onClick={(e) => { e.stopPropagation() }}>
                    <div className="modal__content">
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
            </div>
        </>
    );
};

export default AppModalWrapper;