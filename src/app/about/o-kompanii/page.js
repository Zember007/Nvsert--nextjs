'use client';

import '@/assets/styles/about.scss';
import Image from 'next/image';
import RobotImg from '@/assets/images/robot-4.mp4'
import Adv1Img from '@/assets/images/svg/adv-1.svg'
import Adv2Img from '@/assets/images/svg/adv-2.svg'
import Adv3Img from '@/assets/images/svg/adv-3.svg'
import Adv4Img from '@/assets/images/svg/adv-4.svg'
import Adv5Img from '@/assets/images/svg/adv-5.svg'
import Adv6Img from '@/assets/images/svg/adv-6.svg'
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs.js';
import AppSidebar from '@/components/general/AppSidebar.js';
import { useDispatch, useSelector } from 'react-redux';
import { resetPages } from '@/store/pages'
import { useEffect, useMemo, useState } from 'react';
import { setMetadata } from '@/store/metadata';
import { generateMetadata } from '@/hook/useHead'
import AppDefaultForm from '@/components/forms/AppDefaultForm';
import { useTranslation } from 'react-i18next';

const AboutCompany = () => {

    const dispatch = useDispatch();

    const {t} = useTranslation()


    useEffect(() => {
        dispatch(resetPages())

    }, [])

    const { configs: configsPure } = useSelector((state) => state.config);




    const configs = useMemo(() => {

        let parsedConf = {};
        configsPure?.forEach((item) => {
            let key = item.key;
            let value = item.value;
            parsedConf[key] = value;
        });

        return parsedConf;
    }, [configsPure])


    const SEO = {
        title: 'О компании - NVSERT - Сертификация продукции и оборудования',
        og_description: 'сертификация, сертификаты, декларации, техническая документация, технические условия, свидетельства, регистрация, ИСО, экспертное заключение, СЕ',
        seo_description: 'В Российской Федерации, странах Евразийского Экономического Союза, странах Евросоюза и в любой другой стране,наличие документов, подтверждающих качество продукции, является неотъемлемым условием веден',
        seo_h1: 'О компании - NVSERT - Сертификация продукции и оборудования',
        seo_keywords: 'сертификация, сертификаты, декларации, техническая документация, технические условия, свидетельства, регистрация, ИСО, экспертное заключение, СЕ',
        seo_title: 'О компании - NVSERT - Сертификация продукции и оборудования',
    }

    useEffect(() => {


        dispatch(setMetadata(generateMetadata(configs, SEO)))

    }, [configs])

    return (
        <div className="article">
            <div className="wrapper">
                <AppBreadcrumbs root="/"
                    breadcrumbs={[{ full_slug: "about", id: 2, seo_h1: "О компании", title: "О компании" }]} />

                <div className="article__wrapper">

                    <button
                        onClick={() => { toogleMobileSidebar() }}
                        className="cat-menu__btn js-cat-menu-btn btn btn--l btn--primary">
                        <span className="btn-text">Категории</span>
                    </button>
                    <div className="cat-menu js-cat-menu">
                        <AppSidebar />
                    </div>

                    <div className="mtp">
                        <div className="about">
                            <h1 className="about__title">О компании</h1>

                            <div className="about__text">
                                <h3 className="about__text-title">«Центр стандартизации»</h3>
                                <p>Более чем 12 лет мы занимается предоставлением услуг в сфере сертификации. За длительный
                                    период
                                    деятельность NVSERT по достоинству оценили тысячи промышленных предприятий Российской
                                    Федерации, Евразийского Экономического Союза и зарубежных стран, выбрав нас надежным
                                    партнером и заключив
                                    долгосрочные партнерские соглашения о сотрудничестве.</p>
                                <p>Мы предоставляем обширный спектр услуг, направленный на оформление и создание различного рода
                                    документов:
                                    обязательной и добровольной сертификации, декларирования, оформление соответствия требований
                                    технических
                                    регламентов и других видов услуг в сфере оформления разрешительных документов. Помимо этого,
                                    наша компания
                                    занимается предоставлением профессиональных консультаций по индивидуальному созданию и
                                    оформлению пакетов
                                    разрешительной документации. </p>
                                <p>Благодаря высокоразвитой базе нашего центра, состоящей из аккредитованных органов
                                    сертификации, ведущих
                                    испытательных лабораторий  и штата квалифицированных экспертов, мы имеем возможность
                                    проводить сертификацию
                                    абсолютно любых видов продукции. Мы ценим время и требовательность наших клиентов, поэтому
                                    каждая работа
                                    будет проделана в сжатые сроки с соблюдением качества и пожеланий наших клиентов. Для
                                    постоянных клиентов
                                    создана гибкая схема оплаты за предоставляемые услуги. </p>
                                <p>Кроме того, доставка пакета документов по всей территории РФ осуществляется за счет нашей
                                    организации.</p>
                            </div>

                            <div className="about__adv">
                                <div className="about__adv-item">
                                    <Image src={Adv1Img} alt='adv' width="80" height="80" />
                                    <span className="about__adv-desc">12 лет работы</span>
                                </div>
                                <div className="about__adv-item">
                                    <Image src={Adv2Img} alt='adv' width="80" height="80" />

                                    <span className="about__adv-desc">Представлены во всех регионах ТС ЕАЭС</span>
                                </div>
                                <div className="about__adv-item">
                                    <Image src={Adv3Img} alt='adv' width="80" height="80" />

                                    <span className="about__adv-desc">Собственные лаборатории</span>
                                </div>
                                <div className="about__adv-item">
                                    <Image src={Adv4Img} alt='adv' width="80" height="80" />

                                    <span className="about__adv-desc">Более 100000 сделанных документов</span>
                                </div>
                                <div className="about__adv-item">
                                    <Image src={Adv5Img} alt='adv' width="80" height="80" />

                                    <span className="about__adv-desc">75 сотрудников</span>
                                </div>
                                <div className="about__adv-item">
                                    <Image src={Adv6Img} alt='adv' width="80" height="80" />

                                    <span className="about__adv-desc">Возможна постоплата или рассрочка</span>
                                </div>
                            </div>

                            <h3 className="about__subtitle">Реквизиты </h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan="2">ООО «Центр стандартизации»</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Директор</th>
                                        <td>Владимиров Владимир Михайлович (действует на основании Устава)</td>
                                    </tr>
                                    <tr>
                                        <th>Юридический адрес</th>
                                        <td>180007, Россия, Псковская обл., город Псков г.о., Псков г., Рижский пр-кт, д. 16, помещение 1001, кабинет 9</td>
                                    </tr>
                                    <tr>
                                        <th>Почтовый адрес</th>
                                        <td>180007, г. Псков, а/я 933</td>
                                    </tr>
                                    <tr>
                                        <th>ИНН</th>
                                        <td> 6027189146</td>
                                    </tr>
                                    <tr>
                                        <th>КПП</th>
                                        <td>602701001</td>
                                    </tr>
                                    <tr>
                                        <th>E-mail</th>
                                        <td>info@nvsert.ru</td>
                                    </tr>
                                    <tr>
                                        <th>Коды по ОКВЭД</th>
                                        <td>71.20;
                                            41.10 ; 42.21; 42.22; 46.12; 46.13; 46.14; 46.15; 46.18; 46.19; 46.46; 46.61; 46.62;
                                            46.63;
                                            46.64; 46.66; 46.69; 46.72; 46.73; 46.75; 58.29; 61.10; 61.20; 80.20;
                                            58.11 ; 59.11 ; 64.92 ; 68.10 ; 68.10.1 ; 68.20 ; 68.32 ; 70.22 ; 73.11 ; 73.20 ;
                                            96.09 ;
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan="2">Банковские реквизиты Альфа-Банк</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>р/с</th>
                                        <td>40702810232380003475</td>
                                    </tr>
                                    <tr>
                                        <th>кор.сч.</th>
                                        <td>30101810600000000786</td>
                                    </tr>
                                    <tr>
                                        <th>Банк</th>
                                        <td>Филиал «САНКТ-ПЕТЕРБУРГСКИЙ» АО «АЛЬФА-БАНК»</td>
                                    </tr>
                                    <tr>
                                        <th>Бик</th>
                                        <td>044030786</td>
                                    </tr>
                                    <tr>
                                        <th>ОГРН</th>
                                        <td>1186027004217</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="form">
                                <div className="form__img">
                                    <video
                                        src={RobotImg}
                                        className="logo"
                                        autoPlay
                                        loop
                                        muted                                      
                                        style={{ maxWidth: '100%', height: '416px', width: '546px' }}
                                    />
                                </div>
                                <div className="form__wrapper">
                                    <h2 className="form-title">Остались вопросы?</h2>
                                    <p className="form-subtitle">Оставь свои контактные данные, мы подготовимся и на все ответим</p>
                                    <AppDefaultForm btnText={t('form.help.btn')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AboutCompany;