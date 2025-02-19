import React from 'react';
import AppInput from './elements/AppInput';
import AppValidationObserver from './AppValidationObserver';
import { useHeaderContext } from '../contexts/HeaderContext';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const AppKnowCostForm = () => {

    const { t } = useTranslation()
    const { openDefaultModal } = useHeaderContext()

    const onSubmit = (e) => {
        const formData = new FormData();
        for (const key in e) {
            if (e.hasOwnProperty(key)) {
                formData.append(key, e[key]);
            }
        }

        try {

            const response = axios.post('/api/feedback', formData);

            if (response.status == 200 || 201) {
                reset()
                openDefaultModal('successMessage')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const methods = useForm({ mode: "onTouched" });
    const { reset } = methods

    return (
        <AppValidationObserver methods={methods} onSubmit={onSubmit}>
            {({ register, errors }) => (
                <>
                    <h3 class="modal__title">{t('form.knowCost.title')}</h3>
                    <p class="modal__subtitle">{t('form.knowCost.text')}</p>

                    <AppInput
                        title={t('form.input.titles.phone')}
                        inputName='phone'
                        type='phone'
                        mask='phone'
                        required={true}
                    />

                    <button type="submit" class="btn btn--primary btn--l">
                        {t('form.knowCost.btn')}
                    </button>

                    <div class="policy">
                        Нажимая на кнопку «Связаться» вы соглашаетесь с
                        <Link href="/soglashenie/polzovatelskoe-soglashenie/" target="_blank">политикой конфиденциальности</Link>
                    </div>
                </>
            )}
        </AppValidationObserver >
    );
};

export default AppKnowCostForm;