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
import AppMenuItem from "./AppMenuItem";
import PromtModal from "../modals/PromtModal";

const AppFooter = () => {

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const { configs } = useSelector((state: RootState) => state.config);

  const RussiaPhone = configs?.find((item) => item.key === 'PHONE_RUSSIA');
  const moscowPhone = configs?.find((item) => item.key === 'PHONE_MOSCOW');
  const spbPhone = configs?.find((item) => item.key === 'PHONE_SPB');
  const email = configs?.find((item) => item.key === 'email');

  const menuItems = [
    { label: "FAQ", href: "#" },
    { label: "Блог", href: "#" },
    { label: "Отзывы", href: "#" },
    { label: t('navigation.tnved'), href: "/class/tnved/" }
  ]

  const langs = [
    { lable: 'Россия', code: 'ru' },
    { lable: 'English', code: 'en' },
  ]

  return (
    <footer className="h-[168px]  flex justify-between p-[30px] bg-[#3C4049] text-[#FFFFFF99] text-[18px]">
      <div className="flex gap-[120px]">
        <div className="flex flex-col justify-between">
          <p className="text-[16px]">© 2025 NVSERT</p>

          <div className="flex flex-col gap-[20px] text-[#FFF] *:leading-[1]">
            <span>ИНН 6027189146</span>
            <span>ООО «ЦЕНТР СТАНДАРТИЗАЦИИ»</span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start">
          <div className="flex gap-[10px]">
            {menuItems.map((item, i) => (
              <AppMenuItem key={i} item={item} isActive={false} />
            ))}

          </div>

          <div>
            <AppMenuItem item={{ href: '/soglashenie/polzovatelskoe-soglashenie/', label: 'Политика конфиденциальности' }} isActive={false} />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex justify-between ">
          <div className="flex gap-[8px]">
            {email &&
              <PromtModal
                content={<div className="flex gap-[4px] items-center h-[14px]">
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2439 0.185578C17.5556 0.458339 17.5872 0.932161 17.3144 1.24389L6.81443 13.2439C6.67774 13.4001 6.48242 13.4927 6.27496 13.4996C6.0675 13.5065 5.86645 13.4271 5.71967 13.2803L1.21967 8.78034C0.926777 8.48745 0.926777 8.01257 1.21967 7.71968C1.51256 7.42679 1.98744 7.42679 2.28033 7.71968L6.21347 11.6528L16.1856 0.256132C16.4583 -0.0555957 16.9322 -0.0871838 17.2439 0.185578Z" fill="white" />
                  </svg>
                  <span className="text-[#FFF] text-[18px]">Скопировано</span>
                </div>}
                timer={3000}
              >
                <AppMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(email.value)
                  }}
                  className="!px-[30px]"
                  item={{ href: '#', label: email.value }} isActive={false} />
              </PromtModal>
            }
            <PromtModal
              content={<div className="flex gap-[4px] items-center h-[14px]">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2439 0.185578C17.5556 0.458339 17.5872 0.932161 17.3144 1.24389L6.81443 13.2439C6.67774 13.4001 6.48242 13.4927 6.27496 13.4996C6.0675 13.5065 5.86645 13.4271 5.71967 13.2803L1.21967 8.78034C0.926777 8.48745 0.926777 8.01257 1.21967 7.71968C1.51256 7.42679 1.98744 7.42679 2.28033 7.71968L6.21347 11.6528L16.1856 0.256132C16.4583 -0.0555957 16.9322 -0.0871838 17.2439 0.185578Z" fill="white" />
                </svg>
                <span className="text-[#FFF] text-[18px]">Скопировано</span>
              </div>}
              timer={3000}
            >
              <AppMenuItem
                className="!px-[30px]"
                item={{ href: '#', label: 'Telegram' }} isActive={false} />
            </PromtModal>
            <PromtModal
              content={<div className="flex gap-[4px] items-center h-[14px]">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2439 0.185578C17.5556 0.458339 17.5872 0.932161 17.3144 1.24389L6.81443 13.2439C6.67774 13.4001 6.48242 13.4927 6.27496 13.4996C6.0675 13.5065 5.86645 13.4271 5.71967 13.2803L1.21967 8.78034C0.926777 8.48745 0.926777 8.01257 1.21967 7.71968C1.51256 7.42679 1.98744 7.42679 2.28033 7.71968L6.21347 11.6528L16.1856 0.256132C16.4583 -0.0555957 16.9322 -0.0871838 17.2439 0.185578Z" fill="white" />
                </svg>
                <span className="text-[#FFF] text-[18px]">Скопировано</span>
              </div>}
              timer={3000}
            >
              <AppMenuItem
                className="!px-[30px]"
                item={{ href: '#', label: 'WhatsApp' }} isActive={false} />
            </PromtModal>
            <PromtModal
              className='!py-[20px]'
              content={
                <div className="flex flex-col gap-[20px]">
                  {/* i18n.language */}
                  {langs.map((lang, i) => (
                    <button
                      onClick={() => {
                        changeLanguage(lang.code)
                      }}
                      key={i} className="h-[10px] flex items-center gap-[4px]">
                      <div className="w-[10px] h-[10px] flex items-center justify-center">
                        <div className="relative w-[6px] h-[6px]">
                          <div className={`transition-all duration-300 ease ${i18n.language === lang.code && 'bg-[#69D771]'} absolute inset-0 rounded-full blur-sm opacity-70`} />
                          <div className={`transition-all duration-300 ease ${i18n.language === lang.code ? 'bg-[#69D771]' : 'bg-[#00000080]'} absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 inset-[4px] rounded-full  w-[4px] h-[4px]`} />
                        </div>
                      </div>
                      <span className={`transition-all duration-300 ease text-[18px] ${i18n.language === lang.code ? 'text-[#69D771]' : 'text-[#00000080]'}`}>{lang.lable}</span>
                    </button>
                  ))}

                </div>
              }
            >
              <AppMenuItem
                item={{
                  href: '#', label: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.2676 18.8833C15.9735 17.9416 18.7776 14.7408 19.1293 10.8333H14.9785C14.8235 13.7891 13.8485 16.5391 12.2676 18.8833ZM19.1293 9.16664C18.7776 5.25831 15.971 2.05664 12.2643 1.11497C13.846 3.45997 14.8226 6.20997 14.9785 9.16664H19.1293ZM7.73678 1.11497C4.02845 2.05664 1.22345 5.25831 0.870117 9.16664H5.02178C5.17762 6.20997 6.15428 3.45997 7.73678 1.11497ZM0.87095 10.8333C1.04402 12.7192 1.79645 14.5054 3.02497 15.9466C4.2535 17.3879 5.89793 18.4137 7.73262 18.8833C6.15178 16.5391 5.17678 13.7891 5.02178 10.8333H0.87095ZM10.0001 19.135C8.07762 16.8141 6.87345 13.9508 6.69178 10.8333H13.3093C13.126 13.95 11.9226 16.8141 10.001 19.135M10.0001 0.869141C11.9226 3.18914 13.1251 6.05164 13.3085 9.16664H6.69178C6.87512 6.05164 8.07845 3.18914 10.0001 0.869141Z" fill="white" fill-opacity="0.6" />
                  </svg>
                }} isActive={false} />
            </PromtModal>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default AppFooter;