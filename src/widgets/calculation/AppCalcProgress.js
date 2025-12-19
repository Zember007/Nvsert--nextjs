import { useMemo } from "react"
import { useTranslation } from "react-i18next";


const AppCalcProgress = ({ currentDiscount, currentStep }) => {

    const { t } = useTranslation()

    const printedDiscount = useMemo(() => {
        return currentDiscount + '%';
    }, [currentDiscount])

    function stageStatus(step) {
        switch (true) {
            case step == currentStep:
                return 'in-progress';
            case step < currentStep:
                return 'done';
        }
    }

    return (
        <div className="cost-calc__stages">
            <h3 className="cost-calc__title">{t('calculation.progress.title')}</h3>
            <p className="cost-calc__subtitle">{t('calculation.progress.subtitle')}</p>

            <div className="cost-calc__list">
                <div className={`stage ${stageStatus(1)}`}>
                    <div className="stage__icon">
                        <i className="icon icon--dots"></i>
                        <i className="icon icon--done"></i>
                    </div>
                    <div className="stage__name">{t('calculation.progress.name_1')}</div>
                </div>
                <div className={`stage ${stageStatus(2)}`}>
                    <div className="stage__icon">
                        <i className="icon icon--dots"></i>
                        <i className="icon icon--done"></i>
                    </div>
                    <div className="stage__name">{t('calculation.progress.name_2')}</div>
                </div>
                <div className={`stage ${stageStatus(3)}`}>
                    <div className="stage__icon">
                        <i className="icon icon--dots"></i>
                        <i className="icon icon--done"></i>
                    </div>
                    <div className="stage__name">
                        {t('calculation.progress.name_3')}
                        <div className="stage__discount">
                            {t('calculation.progress.discount')}:
                            <span className="stage__discount-value">{printedDiscount}</span>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default AppCalcProgress;