import React from 'react';
import AppValidationObserver from './AppValidationObserver';
import AppInput from './elements/AppInput';

const AppCalcFormSecond = () => {
    const methods = useForm({ mode: "onTouched" });

    const onSubmit = (e) => {

    }
    return (
        <div>
            <AppValidationObserver methods={methods} onSubmit={onSubmit}>
                {({ register, errors }) => (
                    <>
                        <h5 className="form-subtitle">{t('calculation.form.text.step_2')}</h5>

                        <AppInput inputName="product"
                            title={t('calculation.form.placeholder.product_name')}
                            required={true}
                        />

                        <h5 className="form-subtitle">
                            {t('calculation.form.subtext.step_2')}
                        </h5>

                        {/* <AppSelect title={t('calculation.form.placeholder.choose_doc')}
                        name="doc_1"
                        options={documents}
                        required={true}
                    />
                    <AppSelect title={t('calculation.form.placeholder.choose_doc')}
                        name="doc_2"
                        options={documents}
                    />
                    <AppSelect title={t('calculation.form.placeholder.choose_doc')}
                        name='doc_3'
                        options={documents}
                    /> */}

                        <div className="form-bottom">
                            <button className="btn btn--primary btn--l" type="submit">
                                {t('calculation.form.btn.next')}
                            </button>
                            <button
                                className="btn btn-modal-open"
                                type="button"
                                onClick={(e) => { e.preventDefault(); openIntroModal() }}
                            >
                                {t('calculation.form.btn.modal')}
                            </button>
                        </div>
                    </ >
                )}
            </AppValidationObserver >
        </div >
    );
};

export default AppCalcFormSecond;