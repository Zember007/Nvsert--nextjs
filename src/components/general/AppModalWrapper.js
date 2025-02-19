import { useHeaderContext } from '@/components/contexts/HeaderContext'
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AppKnowCostForm = dynamic(() => import('@/components/forms/AppKnowCostForm'), {
    suspense: true,
});

const AppIntroForm = dynamic(() => import('@/components/forms/AppIntroForm'), {
    suspense: true,
});

const AppSuccessMessage = dynamic(() => import('@/components/modals/AppSuccessMessage'), {
    suspense: true,
}); 

const AppModalWrapper = () => {
    const { setDefaultModalActive, defaultModalActive, defaultModalName } = useHeaderContext()

    return (

        <>
            <div className={`modal__wrapper ${defaultModalActive && 'active'}`}
                onClick={() => {
                    setDefaultModalActive(false)
                }}
            >
                <div className={`modal__box modal ${defaultModalActive && 'active'}`} onClick={(e) => { e.stopPropagation() }}>
                    <div className="modal__close--wrapper">
                        <button className="btn modal__close"
                            onClick={() => {
                                setDefaultModalActive(false)
                            }}
                        >
                            <i className="icon icon--close"></i>
                        </button>
                    </div>
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
                                <Suspense fallback={<p></p>}>
                                    <AppIntroForm />
                                </Suspense>
                            </>
                        }

                        {
                            defaultModalName === 'knowCost' &&
                            <>
                                <Suspense fallback={<p></p>}>
                                    <AppKnowCostForm />
                                </Suspense>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppModalWrapper;