import { useTranslation } from "react-i18next";
// import AppCalcFormFinal from "../forms/AppCalcFormFinal";
import AppCalcFormInitial from "../forms/AppCalcFormInitial";
// import AppCalcFormSecond from "../forms/AppCalcFormSecond";
import { useMemo } from "react";

const AppCalcFormWrapper = ({ currentStep, documents, discount }) => {
    const { t } = useTranslation()

    const formTitle = useMemo(() => {
        switch (currentStep) {
            case 1:
                return t('calculation.progress.name_1');
            case 2:
                return t('calculation.progress.name_2');
            case 3:
                return t('calculation.progress.name_3');
            default:
                return '';
        }
    },[currentStep, t])

    const formSubtitle = useMemo(() => {
        switch (currentStep) {
            case 1:
                return t('calculation.form.subtitle.step_1');
            case 2:
                return t('calculation.form.subtitle.step_2');
            case 3:
                return t('calculation.form.subtitle.step_3');
            default:
                return '';
        }
    },[currentStep, t])

    return (
        <div className="cost-calc__form">

            <h3 className="form-title" >{formTitle}</h3>


            <p className="form-text" >{formSubtitle}</p>


            {currentStep === 1 && discount.length && <AppCalcFormInitial discount={discount}/>}
            {/* {currentStep === 2 && <AppCalcFormSecond documents={documents} />} */}
            {/* {currentStep === 3 && <AppCalcFormFinal />} */}

        </div >
    );
};

export default AppCalcFormWrapper;