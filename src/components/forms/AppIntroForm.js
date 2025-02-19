import React from 'react';
import AppDefaultForm from './AppDefaultForm';
import { useTranslation } from 'react-i18next';

const AppIntroForm = () => {
    const { t } = useTranslation()
    return (
        <>
            <h3 className="modal__title">{t('form.help.title')}</h3 >
            <p className="modal__subtitle">{t('form.help.text')}</p>

            <AppDefaultForm btnText={t('form.help.btn')} />
        </>
    );
};

export default AppIntroForm;