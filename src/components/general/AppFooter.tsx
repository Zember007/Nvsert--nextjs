import { useMemo } from "react";
import { useSelector } from "react-redux";
import AppNavigation from './AppNavigation';
import AppLogo from './AppLogo';
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { filterEmail, filterPhone } from "@/hook/filter";
import Image from "next/image";
import AudioLogo from '@/assets/images/svg/audio-selector.svg';
import { RootState } from "@/config/store";

interface Config {
  key: string;
  value: string;
}

const AppFooter = () => {
  const { t } = useTranslation();

  const { configs } = useSelector((state: RootState) => state.config);

  const RussiaPhone = configs?.find((item) => item.key === 'PHONE_RUSSIA');
  const moscowPhone = configs?.find((item) => item.key === 'PHONE_MOSCOW');
  const spbPhone = configs?.find((item) => item.key === 'PHONE_SPB');
  const email = configs?.find((item) => item.key === 'email');

  const companyRequsites = useMemo(() => {
    return [
      {
        name: configs?.find((item) => item?.key === 'company1')?.value ?? '',
        inn: configs?.find((item) => item?.key === 'inn1')?.value ?? '',
        attestation: configs?.find((item) => item?.key === 'attestation1')?.value ?? '',
      },
      {
        name: configs?.find((item) => item?.key === 'company2')?.value ?? '',
        inn: configs?.find((item) => item?.key === 'inn2')?.value ?? '',
        attestation: configs?.find((item) => item?.key === 'attestation2')?.value ?? '',
      },
    ];
  }, [configs]);

  return (
    <footer className="footer">
      <div className="wrapper footer__wrapper">
        <div className="footer-top rounded-[8px] py-[30px] px-[18px]">
          <div className="footer-top__col footer-top__col--info">
            <AppLogo className="!w-[192px] !h-[40px] !text-[#FFF]" />

            {companyRequsites && companyRequsites.length > 0 && (
              <>
                {companyRequsites.map((company) => (
                  <div className="footer-company" key={company.name}>
                    {company.name && <h6 className="footer-company__title">{company.name}</h6>}
                    {company.inn && <div className="footer-company__requisite">{company.inn}</div>}
                    {company.attestation && <div className="footer-company__requisite">{company.attestation}</div>}
                  </div>
                ))}
              </>
            )}
          </div>
          <nav className="footer-top__col footer-top__col--nav footer-top__nav">
            <ul className="footer-top__nav-list">
              <li className="footer-top__nav-item">
                <Link href="/class/okp/" className="footer-top__nav-link">{t('navigation.okp')}</Link>
              </li>
              <li className="footer-top__nav-item">
                <Link href="/class/tnved/" className="footer-top__nav-link">{t('navigation.tnved')}</Link>
              </li>
              <li className="footer-top__nav-item">
                <Link href="/contacts/" className="footer-top__nav-link">{t('navigation.contacts')}</Link>
              </li>
            </ul>
          </nav>
          <div className="footer-top__col footer-top__col--contacts">
            <div className="footer-contacts">
              <ul className="flex flex-col gap-[15px]">
                {email && (
                  <li className="footer-contacts__item">
                    <a href={filterEmail(email.value)} className="footer-contacts__link">
                      {email.value}
                    </a>
                  </li>
                )}
                {moscowPhone && (
                  <li className="footer-contacts__item">
                    <a href={filterPhone(moscowPhone.value)} className="footer-contacts__link">
                      {moscowPhone.value} (МСК)
                    </a>
                  </li>
                )}
                {spbPhone && (
                  <li className="footer-contacts__item">
                    <a href={filterPhone(spbPhone.value)} className="footer-contacts__link">
                      {spbPhone.value} (СПБ)
                    </a>
                  </li>
                )}
                {RussiaPhone && (
                  <li className="footer-contacts__item">
                    <a href={filterPhone(RussiaPhone.value)} className="footer-contacts__link">
                      {RussiaPhone.value}
                    </a>
                  </li>
                )}

              </ul>
            </div>
          </div>
        </div>
        <nav className="footer-nav rounded-[8px] mt-[4px] py-[30px] px-[18px]">
          <AppNavigation />
          <div className="w-full relative mt-[60px] ">
            <div className=" flex flex-col gap-[40px] max-w-[290px]">
              <p className="text-[14px] text-[#FFF]">{t('privacy.description')}</p>
              <Link href="/soglashenie/polzovatelskoe-soglashenie/" className="text-[14px] text-[#FFF]">
                {t('privacy.policy')}
              </Link>
            </div>

            <div className="py-[20px] px-[25px] bg-[#00000033] rounded-[4px] border border-solid border-[#A4A4A4] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex items-center gap-[10px]">
              <Image src={AudioLogo} alt='logo' width={100} height={38} />
              <hr className="h-[62px] w-[1px] bg-[#FFFFFF] !m-[0]" />
              <p className="text-[#FFF]">Помогаем бизнесу <br /> переводить аудио в текст</p>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default AppFooter;