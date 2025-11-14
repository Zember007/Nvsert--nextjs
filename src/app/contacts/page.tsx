'use client';

import AppSpoilerItem from '../../components/general/AppSpoilerItem';
import AppDefaultForm from '../../components/forms/AppDefaultForm';
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import { useTranslation } from 'react-i18next';
import "react-lazy-load-image-component/src/effects/blur.css";


const Page = () => {


    const { t } = useTranslation()




    return (
        <div className="article contacts">
            <div className="wrapper">

                <AppBreadcrumbs root='/contacts/' title={t('contacts.title')} />

                <div className="mtp">
                    <h1>{t('contacts.title')}</h1>
                    <div className="flex-wrapper">

{/*                         {contacts && contacts.length > 0 &&
                            <>
                                <div
                                    className="mtp__spoiler js-spoiler"
                                >
                                    {contacts.map((item, index) => <AppSpoilerItem
                                        key={index}
                                        title={item.name}
                                        preopened={true}
                                    >
                                        {item.image && <div className="mtp__spoiler-image">
                                            <picture>
                                                <source srcSet={item.image_webp} type="image/webp" />
                                                <LazyLoadImage src={item.image} alt={item.name} />
                                            </picture>
                                        </div>}

                                        {item.address && <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={'https://yandex.ru/maps/?text=' + item.address}
                                        >
                                            {t('contacts.address')}: {item.address}
                                        </a>}
                                        {item.phones && item.phones.length > 0 && <>
                                            {item.phones.map((phone, index) => <a
                                                href={filterPhone(phone)}
                                                key={index}
                                            >
                                                {t('contacts.phone')}: {phone}
                                            </a>)}
                                        </>}
                                        {item.time &&
                                            <p>
                                                {t('contacts.time')}: {item.time}
                                            </p>
                                        }
                                        {item.emails && item.emails.length > 0 &&
                                            <>
                                                {item.emails.map((email, index) => <a
                                                    href={filterEmail(email)}
                                                    key={index}
                                                >
                                                    E-mail: {email}
                                                </a>)}
                                            </>
                                        }
                                        {item.description &&
                                            <p>{item.time}</p>
                                        }
                                    </AppSpoilerItem>)}
                                </div>



                                <div className="form">
                                    <div className="form__wrapper">
                                        <h2 className="form-title">{t('form.contacts.title')}</h2>
                                        <p className="form-subtitle">{t('form.contacts.text')}</p>

                                        <AppDefaultForm btnText={t('form.contacts.btn')} />
                                    </div>
                                </div>
                            </>
                        } */}
                    </div >
                </div >
            </div >
        </div >
    );
};

export default Page;