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

const AppFooter = () => {
  const { t } = useTranslation();

  const { configs } = useSelector((state: RootState) => state.config);

  const RussiaPhone = configs?.find((item) => item.key === 'PHONE_RUSSIA');
  const moscowPhone = configs?.find((item) => item.key === 'PHONE_MOSCOW');
  const spbPhone = configs?.find((item) => item.key === 'PHONE_SPB');
  const email = configs?.find((item) => item.key === 'email');

  return (
    <footer className="h-[190px] flex justify-between p-[30px] bg-[#3C4049] text-[#FFFFFF99] text-[18px]">
      <div className="flex gap-[120px]">
        <div className="flex flex-col justify-between">
          <AppLogo className="!w-[192px] !h-[40px] !text-[#FFF]" />
          <div className="flex flex-col gap-[20px]">
            <span>ООО «ЦЕНТР СТАНДАРТИЗАЦИИ»</span>
            <span>ИНН 6027189146</span>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-[10px]">
            <ul className="flex gap-[50px] py-[10px] *:*:!no-underline list-none">
              <li>
                <Link href={'#'}>Блог</Link>
              </li>
              <li>
                <Link href={'#'}>FAQ</Link>
              </li>
              <li>
                <Link href={'#'}>Отзывы</Link>
              </li>
              <li>
                <Link href="/class/tnved/">{t('navigation.tnved')}</Link>
              </li>
            </ul>
            {email && RussiaPhone && moscowPhone && spbPhone &&
              <ul className="flex gap-[50px] py-[10px] *:*:!no-underline list-none">
                <li>
                  <a href={filterPhone(email.value)}>
                    {email.value}
                  </a>
                </li>
                <li>
                  <a href={filterPhone(RussiaPhone.value)}>
                    {RussiaPhone.value}
                  </a>
                </li>
                <li>
                  <a href={filterPhone(moscowPhone.value)}>
                    {moscowPhone.value}
                  </a>
                </li>
                <li>
                  <a href={filterPhone(spbPhone.value)}>
                    {spbPhone.value}
                  </a>
                </li>
              </ul>
            }
          </div>
          <Link href="/soglashenie/polzovatelskoe-soglashenie/" className="!no-underline">
            Политика конфиденциальности
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex justify-between w-[400px]">
          <a href="#">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2676 18.8833C15.9735 17.9416 18.7776 14.7408 19.1293 10.8333H14.9785C14.8235 13.7891 13.8485 16.5391 12.2676 18.8833ZM19.1293 9.16664C18.7776 5.25831 15.971 2.05664 12.2643 1.11497C13.846 3.45997 14.8226 6.20997 14.9785 9.16664H19.1293ZM7.73678 1.11497C4.02845 2.05664 1.22345 5.25831 0.870117 9.16664H5.02178C5.17762 6.20997 6.15428 3.45997 7.73678 1.11497ZM0.87095 10.8333C1.04402 12.7192 1.79645 14.5054 3.02497 15.9466C4.2535 17.3879 5.89793 18.4137 7.73262 18.8833C6.15178 16.5391 5.17678 13.7891 5.02178 10.8333H0.87095ZM10.0001 19.135C8.07762 16.8141 6.87345 13.9508 6.69178 10.8333H13.3093C13.126 13.95 11.9226 16.8141 10.001 19.135M10.0001 0.869141C11.9226 3.18914 13.1251 6.05164 13.3085 9.16664H6.69178C6.87512 6.05164 8.07845 3.18914 10.0001 0.869141Z" fill="white" fill-opacity="0.6" />
            </svg>
          </a>

          <p className="text-[16px]">© 2025 NVSERT</p>
        </div>
      </div>

    </footer>
  );
};

export default AppFooter;