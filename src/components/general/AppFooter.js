import { useMemo } from "react";
import { useSelector } from "react-redux";
import AppNavigation from './AppNavigation.js';
import AppLogo from './AppLogo.js';
import { useTranslation } from "react-i18next";
import Link from "next/link.js";
import { filterEmail, filterPhone } from "@/hook/filter.js";
import Image from "next/image.js";
import CoffeeLogo from '@/assets/images/cs-logo.svg'

const AppFooter = () => {

    const { t } = useTranslation();

    const { configs } = useSelector(state => state.config)

    const RussiaPhone = configs?.find((item) => item.key == 'PHONE_RUSSIA');
    const moscowPhone = configs?.find((item) => item.key == 'PHONE_MOSCOW');
    const spbPhone = configs?.find((item) => item.key == 'PHONE_SPB');
    const email = configs?.find((item) => item.key == 'email')

    const companyRequsites = useMemo(() => {

        return [
            // {
            //     name: configs?.find((item) => item?.key && (item?.key == 'company1')).value ?? '',
            //     inn: configs?.find((item) => item?.key && item?.key == 'inn1').value ?? '',
            //     attestation:
            //         configs?.find((item) => item?.key && item?.key == 'attestation1').value ?? '',
            // },
            // {
            //     name: configs?.find((item) => item?.key && item?.key === 'company2').value ?? '',
            //     inn: configs?.find((item) => item?.key && item?.key === 'inn2').value ?? '',
            //     attestation:
            //         configs?.find((item) => item?.key && item?.key === 'attestation2').value ?? '',
            // },
        ];

    }, [configs])
    return (
        <footer className="footer">
            <div className="wrapper footer__wrapper">
                <div className="footer-top">
                    <div className="footer-top__col footer-top__col--info">
                        <AppLogo inverted={true} />

                        {companyRequsites && companyRequsites.length > 0 &&
                            <>
                                {
                                    companyRequsites.map((company) => (
                                        <div
                                            className="footer-company"
                                            key={company.name}
                                        >
                                            {company.name && <h6 className="footer-company__title" >
                                                {company.name}
                                            </h6>}
                                            {company.inn && <div className="footer-company__requisite">
                                                {company.inn}
                                            </div>}
                                            {company.attestation && <div className="footer-company__requisite">
                                                {company.attestation}
                                            </div>}
                                        </div>
                                    ))
                                }
                            </>}
                    </div>
                    <nav className="footer-top__col footer-top__col--nav footer-top__nav">
                        <ul className="footer-top__nav-list">

                            <li className="footer-top__nav-item">
                                <Link href="/class/okp/" className="footer-top__nav-link">{
                                    t('navigation.okp')
                                }</Link>
                            </li>
                            <li className="footer-top__nav-item">
                                <Link href="/class/tnved/" className="footer-top__nav-link">{
                                    t('navigation.tnved')
                                }</Link>
                            </li>
                            <li className="footer-top__nav-item">
                                <Link href="/contacts/" className="footer-top__nav-link">{
                                    t('navigation.contacts')
                                }</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="footer-top__col footer-top__col--contacts">
                        <div className="footer-contacts">
                            <h6 className="footer-contacts__title">{t('contacts.title')}</h6>
                            <ul className="footer-contacts__list">
                                {moscowPhone &&
                                    <li className="footer-contacts__item">
                                        <a href={filterPhone(moscowPhone.value)}
                                            className="footer-contacts__link"
                                        >
                                            {moscowPhone.value} (МСК)
                                        </a>
                                    </li>}
                                {spbPhone && <li className="footer-contacts__item" >
                                    <a href={filterPhone(spbPhone.value)}
                                        className="footer-contacts__link">
                                        {spbPhone.value} (СПБ)
                                    </a>
                                </li>}
                                {RussiaPhone && <li className="footer-contacts__item" >
                                    <a href={filterPhone(RussiaPhone.value)}
                                        className="footer-contacts__link">
                                        {RussiaPhone.value}
                                    </a>
                                </li>}
                                {email && <li className="footer-contacts__item" >
                                    <a href={filterEmail(email.value)}
                                        className="footer-contacts__link"
                                    >{email.value}</a>
                                </li>}
                            </ul >
                        </div >
                    </div >
                </div >
                <nav className="footer-nav">
                    <AppNavigation />
                </nav>
                <div className="footer-bottom">
                    <div className="footer-bottom__message">
                        <Link
                            href="/soglashenie/polzovatelskoe-soglashenie/"
                            className="footer-bottom__policy"
                        >
                            {t('privacy.policy')}
                        </Link>
                        <div className="footer-bottom__rights">
                            {t('privacy.description')}
                        </div>
                    </div>
                    <div className="footer-bottom__developer">
                        <div className="title">{t('designed')}</div>
                        <a href="https://coffeestudio.ru/"
                            target="_blank"
                            rel="noopener"
                            className="logo"><Image src={CoffeeLogo} alt="Coffee Studio" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;