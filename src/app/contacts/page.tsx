'use client';

import { AppBreadcrumbs, AppSpoilerItem } from 'widgets/layout';
import AppDefaultForm from 'widgets/forms/AppDefaultForm';
import { useTranslation } from 'react-i18next';

const Page = () => {
  const { t } = useTranslation();

  return (
    <main className="article contacts">
      <div className="wrapper">
        <AppBreadcrumbs root="/contacts/" title={t('contacts.title')} />

        <section className="mtp">
          <h1>{t('contacts.title')}</h1>
          <div className="flex-wrapper">
            {/* Контент контактов временно закомментирован */}
            <section aria-label={t('form.contacts.title')} className="form">
              <div className="form__wrapper">
                <h2 className="form-title">{t('form.contacts.title')}</h2>
                <p className="form-subtitle">{t('form.contacts.text')}</p>
                <AppDefaultForm btnText={t('form.contacts.btn')} />
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
