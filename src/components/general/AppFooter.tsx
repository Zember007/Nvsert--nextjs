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
import { useHeaderContext } from "../contexts/HeaderContext";

const AppFooter = () => {

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const { configs } = useSelector((state: RootState) => state.config);
  const email = configs?.find((item) => item.key === 'email');

  const menuItems = [
    { label: "FAQ", href: "#" },
    { label: t("navigation.blog"), href: "#" },
    { label: t("navigation.reviews"), href: "#" },
    { label: t('navigation.tnved'), href: "/class/tnved/" }
  ]

  const langs = [
    { lable: 'Россия', code: 'ru' },
    { lable: 'English', code: 'en' },
  ]

  const { openDefaultModal } = useHeaderContext();


  return (
    <footer className="rounded-t-[35px] xl:h-[234px] xl:flex-row gap-[35px] flex-col-reverse items-center xl:items-stretch relative flex justify-between p-[30px] bg-[#3C4049] text-[#FFFFFF99] text-[18px]">
      <div className="flex xl:gap-[120px] gap-[30px] xl:items-stretch items-center xl:flex-row flex-col-reverse text-[#FFF]">
        <div className="xl:py-[10px] flex xl:flex-col flex-col-reverse justify-between xl:items-start items-center xl:gap-0 gap-[16px]">
          <p className="">© 2025 NVSERT</p>

          <div className=" xl:text-[16px] xl:items-start items-center text-[14px] flex flex-col xl:gap-[18px]  gap-[16px] ">
            <span>{t("footer.inn")}</span>
            <span>{t("footer.company")}</span>
          </div>
        </div>
        <div className="flex flex-col xl:justify-between xl:items-start gap-[35px] items-center relative">
          <div className="grid grid-cols-2 xl:flex gap-[10px] xl:flex-row flex-col justify-items-center xl:justify-items-normal">
            {menuItems.map((item, i) => (
              <AppMenuItem key={i} item={item} isActive={false} />
            ))}

          </div>

          <div className="flex xl:gap-[8px] gap-[10px] flex-col">
            <AppMenuItem
            className="xl:!h-[35px] !h-auto"              

              item={{ href: '/soglashenie/polzovatelskoe-soglashenie/', label: t("footer.policy") }} isActive={false} />
            <AppMenuItem
            className="xl:!h-[35px] !h-auto"

              item={{ href: '/soglashenie/polzovatelskoe-soglashenie/', label: 'Обработка персональных данных' }} isActive={false} />
          </div>

        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex justify-between ">
          <div className="flex gap-[10px] xl:flex-row flex-col items-center">
            <button
              onClick={() => { openDefaultModal('introForm') }}
              className="xl:hidden  border border-solid text-[18px] flex items-center justify-between px-[15px] text-[#FFF]  border-[#93969D] h-[50px] w-[200px] rounded-[4px] bg-[#34446D]"
            >
              <span>Заказать звонок</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.03597 2C7.61151 2 9.91367 7.17986 9.91367 7.7554C9.91367 8.90648 8.18705 10.0576 7.61151 11.2086C7.03597 12.3597 8.18705 13.5108 9.33813 14.6619C9.78705 15.1108 11.6403 16.964 12.7914 16.3885C13.9424 15.813 15.0935 14.0863 16.2446 14.0863C16.8201 14.0863 22 16.3885 22 16.964C22 19.2662 20.2734 20.9928 18.5468 21.5683C16.8201 22.1439 15.6691 22.1439 13.3669 21.5683C11.0647 20.9928 9.33813 20.4173 6.46043 17.5396C3.58273 14.6619 3.00719 12.9353 2.43165 10.6331C1.85612 8.33094 1.85612 7.17986 2.43165 5.45324C3.00719 3.72662 4.73381 2 7.03597 2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 7C14.6689 7.31419 15.277 7.73986 15.7838 8.25676C16.2804 8.75338 16.6959 9.35135 17 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 2C16.7165 2.45043 18.2504 3.33913 19.4678 4.55652C20.673 5.77391 21.5617 7.29565 22 9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>


            </button>
            {email &&
              <PromtModal
                content={<div className="flex gap-[4px] items-center h-[14px]">
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.2439 0.185578C17.5556 0.458339 17.5872 0.932161 17.3144 1.24389L6.81443 13.2439C6.67774 13.4001 6.48242 13.4927 6.27496 13.4996C6.0675 13.5065 5.86645 13.4271 5.71967 13.2803L1.21967 8.78034C0.926777 8.48745 0.926777 8.01257 1.21967 7.71968C1.51256 7.42679 1.98744 7.42679 2.28033 7.71968L6.21347 11.6528L16.1856 0.256132C16.4583 -0.0555957 16.9322 -0.0871838 17.2439 0.185578Z" fill="white" />
                  </svg>
                  <span className="text-[#FFF] text-[18px]">{t("copied")}</span>
                </div>}
                timer={3000}
              >
                <AppMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(email.value)
                  }}
                  className="after:!content-none xl:after:!content-[''] xl:!px-[35px] xl:border-none border border-solid border-[#93969D] xl:!h-[35px] xl:w-auto !h-[50px] w-[200px] group"
                  item={{
                    href: '#', label:
                      <>
                        <span className="transition-all duration-200 ease block xl:group-hover:-translate-x-[16px]">{email.value}</span>
                        <svg
                          className="xl:absolute top-1/2 transition-all duration-200 ease right-[-1px] xl:translate-x-full  xl:-translate-y-1/2 translate-x-0 group-hover:translate-x-0 group-hover:right-[15px]"
                          width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.84615 8.15385C5.84615 7.54181 6.08929 6.95484 6.52206 6.52206C6.95484 6.08929 7.54181 5.84615 8.15385 5.84615H9.53846V10C9.53846 10.3031 9.59815 10.6031 9.71412 10.8831C9.8301 11.1631 10.0001 11.4175 10.2144 11.6318C10.6471 12.0646 11.2341 12.3077 11.8462 12.3077H19.2308C19.5338 12.3077 19.8339 12.248 20.1139 12.132C20.3939 12.0161 20.6483 11.8461 20.8626 11.6318C21.0768 11.4175 21.2468 11.1631 21.3628 10.8831C21.4788 10.6031 21.5385 10.3031 21.5385 10V5.88308C21.9995 5.96752 22.4238 6.19032 22.7551 6.52185L25.4782 9.24492C25.6924 9.45926 25.8624 9.7137 25.9783 9.99372C26.0943 10.2737 26.1539 10.5739 26.1538 10.8769V23.8462C26.154 24.3781 25.9703 24.8938 25.6338 25.306C25.2974 25.7181 24.8289 26.0013 24.3077 26.1077V18.3077C24.3077 17.6957 24.0646 17.1087 23.6318 16.6759C23.199 16.2431 22.612 16 22 16H10C9.38796 16 8.80099 16.2431 8.36822 16.6759C7.93544 17.1087 7.69231 17.6957 7.69231 18.3077V26.1077C7.17106 26.0013 6.70259 25.7181 6.36617 25.306C6.02975 24.8938 5.84605 24.3781 5.84615 23.8462V8.15385ZM9.53846 26.1538V18.3077C9.53846 18.1853 9.58709 18.0679 9.67364 17.9813C9.7602 17.8948 9.87759 17.8462 10 17.8462H22C22.1224 17.8462 22.2398 17.8948 22.3264 17.9813C22.4129 18.0679 22.4615 18.1853 22.4615 18.3077V26.1538H9.53846ZM19.6923 5.84615V10C19.6923 10.1224 19.6437 10.2398 19.5571 10.3264C19.4706 10.4129 19.3532 10.4615 19.2308 10.4615H11.8462C11.7237 10.4615 11.6064 10.4129 11.5198 10.3264C11.4332 10.2398 11.3846 10.1224 11.3846 10V5.84615H19.6923ZM8.15385 4C7.05218 4 5.99563 4.43764 5.21663 5.21663C4.43764 5.99563 4 7.05218 4 8.15385V23.8462C4 24.9478 4.43764 26.0044 5.21663 26.7834C5.99563 27.5624 7.05218 28 8.15385 28H23.8462C24.9478 28 26.0044 27.5624 26.7834 26.7834C27.5624 26.0044 28 24.9478 28 23.8462V10.8769C28 10.3314 27.8926 9.79128 27.6838 9.28731C27.4751 8.78334 27.1691 8.32542 26.7834 7.93969L24.0603 5.21662C23.6746 4.8309 23.2167 4.52493 22.7127 4.31618C22.2087 4.10743 21.6686 4 21.1231 4H8.15385Z" fill="#93969D" />
                        </svg>

                      </>
                  }} isActive={false} />


              </PromtModal>
            }
            <PromtModal
              content={<div className="flex gap-[4px] items-center h-[14px]">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.2439 0.185578C17.5556 0.458339 17.5872 0.932161 17.3144 1.24389L6.81443 13.2439C6.67774 13.4001 6.48242 13.4927 6.27496 13.4996C6.0675 13.5065 5.86645 13.4271 5.71967 13.2803L1.21967 8.78034C0.926777 8.48745 0.926777 8.01257 1.21967 7.71968C1.51256 7.42679 1.98744 7.42679 2.28033 7.71968L6.21347 11.6528L16.1856 0.256132C16.4583 -0.0555957 16.9322 -0.0871838 17.2439 0.185578Z" fill="white" />
                </svg>
                <span className="text-[#FFF] text-[18px]">{t("copied")}</span>
              </div>}
              timer={3000}
            >
              <AppMenuItem
                className="after:!content-none xl:after:!content-[''] xl:!px-[35px] xl:border-none border border-solid border-[#93969D] xl:!h-[35px] xl:w-auto !h-[50px] w-[200px] group"
                item={{
                  href: '#', label:
                    <>
                      <span className="transition-all duration-200 ease block xl:text-inherit text-[#2AABEE] xl:group-hover:text-[#2AABEE] xl:group-hover:-translate-x-[16px]">Telegram</span>


                      <svg
                        className="xl:absolute top-1/2 transition-all duration-200 ease right-[-1px] xl:translate-x-full  xl:-translate-y-1/2 translate-x-0 group-hover:translate-x-0 group-hover:right-[15px]"
                        width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.2021 12.3224L19.9315 20.4581C19.914 20.5702 19.8689 20.6763 19.8002 20.7667C19.7316 20.8571 19.6416 20.9291 19.5383 20.9761C19.4349 21.0232 19.3216 21.0438 19.2083 21.0362C19.095 21.0286 18.9854 20.993 18.8893 20.9325L14.6344 18.2665C14.546 18.2112 14.4713 18.1364 14.4162 18.0478C14.361 17.9593 14.3268 17.8593 14.3161 17.7556C14.3054 17.6518 14.3186 17.547 14.3546 17.449C14.3905 17.3511 14.4484 17.2627 14.5237 17.1905L18.0558 13.8053C18.0955 13.768 18.0488 13.7062 18.0022 13.7341L12.8823 16.7977C12.578 16.9807 12.2166 17.0442 11.8682 16.976L10.0146 16.6182C9.34552 16.4888 9.25343 15.5702 9.88175 15.3102L19.7928 11.2127C19.9616 11.1424 20.1461 11.1185 20.3273 11.1433C20.5085 11.1681 20.6798 11.2408 20.8235 11.3539C20.9672 11.467 21.0782 11.6163 21.1449 11.7866C21.2117 11.9568 21.2307 12.1418 21.2021 12.3224Z" fill="white" />
                        <path d="M21.2021 12.3224L19.9315 20.4581C19.914 20.5702 19.8689 20.6763 19.8002 20.7667C19.7316 20.8571 19.6416 20.9291 19.5383 20.9761C19.4349 21.0232 19.3216 21.0438 19.2083 21.0362C19.095 21.0286 18.9854 20.993 18.8893 20.9325L14.6344 18.2665C14.546 18.2112 14.4713 18.1364 14.4162 18.0478C14.361 17.9593 14.3268 17.8593 14.3161 17.7556C14.3054 17.6518 14.3186 17.547 14.3546 17.449C14.3905 17.3511 14.4484 17.2627 14.5237 17.1905L18.0558 13.8053C18.0955 13.768 18.0488 13.7062 18.0022 13.7341L12.8823 16.7977C12.578 16.9807 12.2166 17.0442 11.8682 16.976L10.0146 16.6182C9.34552 16.4888 9.25343 15.5702 9.88175 15.3102L19.7928 11.2127C19.9616 11.1424 20.1461 11.1185 20.3273 11.1433C20.5085 11.1681 20.6798 11.2408 20.8235 11.3539C20.9672 11.467 21.0782 11.6163 21.1449 11.7866C21.2117 11.9568 21.2307 12.1418 21.2021 12.3224Z" fill="url(#paint0_linear_4213_1011)" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 4C9.37284 4 4 9.37284 4 16C4 22.6272 9.37284 28 16 28C22.6272 28 28 22.6272 28 16C28 9.37284 22.6272 4 16 4ZM6.81326 12.1947C6.31354 13.4011 6.05634 14.6942 6.05634 16C6.05634 18.6372 7.10398 21.1664 8.96877 23.0312C10.8336 24.896 13.3628 25.9437 16 25.9437C18.6372 25.9437 21.1664 24.896 23.0312 23.0312C24.896 21.1664 25.9437 18.6372 25.9437 16C25.9437 14.6942 25.6865 13.4011 25.1867 12.1947C24.687 10.9883 23.9546 9.89213 23.0312 8.96877C22.1079 8.04542 21.0117 7.31297 19.8053 6.81326C18.5989 6.31354 17.3058 6.05634 16 6.05634C14.6942 6.05634 13.4011 6.31354 12.1947 6.81326C10.9883 7.31297 9.89213 8.04542 8.96877 8.96877C8.04542 9.89213 7.31297 10.9883 6.81326 12.1947Z" fill="#93969D" />
                        <defs>
                          <linearGradient id="paint0_linear_4213_1011" x1="597.353" y1="11.1338" x2="597.353" y2="1001.53" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#2AABEE" />
                            <stop offset="1" stop-color="#229ED9" />
                          </linearGradient>
                        </defs>
                      </svg>

                    </>
                }} isActive={false} />
            </PromtModal>
            <PromtModal
              content={<span className="flex gap-[4px] items-center h-[14px]">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.2439 0.185578C17.5556 0.458339 17.5872 0.932161 17.3144 1.24389L6.81443 13.2439C6.67774 13.4001 6.48242 13.4927 6.27496 13.4996C6.0675 13.5065 5.86645 13.4271 5.71967 13.2803L1.21967 8.78034C0.926777 8.48745 0.926777 8.01257 1.21967 7.71968C1.51256 7.42679 1.98744 7.42679 2.28033 7.71968L6.21347 11.6528L16.1856 0.256132C16.4583 -0.0555957 16.9322 -0.0871838 17.2439 0.185578Z" fill="white" />
                </svg>
                <span className="text-[#FFF] text-[18px]">{t("copied")}</span>
              </span>}
              timer={3000}
            >
              <AppMenuItem
                className="after:!content-none xl:after:!content-[''] xl:!px-[35px] xl:border-none border border-solid border-[#93969D] xl:!h-[35px] xl:w-auto !h-[50px] w-[200px] group"
                item={{
                  href: '#', label:
                    <>
                      <span className="transition-all duration-200 ease block xl:text-inherit text-[#60D669]  group-hover:text-[#60D669] xl:group-hover:-translate-x-[16px]">WhatsApp</span>

                      <svg
                        className="xl:absolute top-1/2 transition-all duration-200 ease right-[-1px] xl:translate-x-full  xl:-translate-y-1/2 translate-x-0 group-hover:translate-x-0 group-hover:right-[15px]"
                        width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1024 18.196C21.2817 18.2829 21.4257 18.3528 21.4995 18.388C21.5591 18.4165 21.6141 18.4417 21.6644 18.4648C21.8688 18.5586 21.9986 18.6181 22.0663 18.724C22.1508 18.856 22.1508 19.444 21.8975 20.14C21.6563 20.836 20.4623 21.472 19.8834 21.556C19.3648 21.628 18.7136 21.664 18.002 21.436C17.5678 21.304 17.0131 21.124 16.3015 20.812C13.442 19.5845 11.5195 16.7885 11.2296 16.3668C11.2162 16.3474 11.2064 16.333 11.2 16.324L11.1977 16.3209C11.0441 16.1172 9.98191 14.7084 9.98191 13.252C9.98191 11.9013 10.6389 11.1839 10.949 10.8454C10.975 10.817 10.9986 10.7913 11.0191 10.768C11.2965 10.468 11.61 10.396 11.8151 10.396H12.394C12.4149 10.3974 12.4368 10.3977 12.4596 10.398C12.6334 10.4001 12.8561 10.4027 13.0693 10.912C13.3106 11.512 13.9136 12.976 13.9859 13.12C14.0583 13.264 14.1065 13.432 14.01 13.636C14.0018 13.6524 13.9939 13.6684 13.9861 13.6839C13.9027 13.8508 13.8409 13.9744 13.7085 14.128C13.6623 14.1817 13.6137 14.2402 13.5645 14.2993C13.4597 14.4254 13.3526 14.5542 13.2623 14.644C13.1055 14.8 12.9608 14.956 13.1296 15.256C13.3106 15.556 13.9015 16.528 14.794 17.32C15.7633 18.1819 16.6092 18.5437 17.0225 18.7205C17.0926 18.7505 17.1503 18.7752 17.194 18.796C17.4955 18.952 17.6764 18.928 17.8452 18.724C18.0141 18.532 18.5809 17.86 18.7859 17.56C18.991 17.272 19.1839 17.32 19.4613 17.416C19.6617 17.4976 20.5496 17.9281 21.1024 18.196Z" fill="#60D669" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5025 7.49206C23.3967 6.38099 22.0796 5.50002 20.6282 4.9005C19.1767 4.30097 17.6198 3.99488 16.0482 4.00006C9.46332 4.00006 4.09648 9.34005 4.09648 15.892C4.09648 17.992 4.65126 20.032 5.68844 21.832L4 28L10.3317 26.344C12.0804 27.292 14.0462 27.796 16.0482 27.796C22.6332 27.796 28 22.456 28 15.904C28 12.724 26.7578 9.73605 24.5025 7.49206ZM10.9829 24.4C12.5146 25.3 14.2633 25.78 16.0482 25.78C21.5236 25.78 25.9859 21.352 25.9618 15.904C25.9669 14.6045 25.7126 13.317 25.2136 12.116C24.7147 10.9151 23.981 9.82469 23.0553 8.90805C21.1859 7.03606 18.6894 6.00406 16.0362 6.00406C10.5608 6.00406 6.09849 10.444 6.09849 15.892C6.09961 17.7512 6.62619 19.5725 7.61809 21.148L7.8593 21.52L6.85829 25.168L10.6211 24.184L10.9829 24.4Z" fill="#93969D" />
                      </svg>


                    </>
                }} isActive={false} />
            </PromtModal>
            <PromtModal
              classNameBox="xl:mt-0 mt-[25px]"
              className='!py-[20px]'
              content={
                <div className="flex flex-col gap-[20px]">
                  {langs.map((lang, i) => (
                    <button
                      onClick={() => {
                        changeLanguage(lang.code)
                      }}
                      key={i} className="h-[10px] flex items-center gap-[4px] group">
                      <span className="w-[10px] h-[10px] flex items-center justify-center">
                        <span className="block relative w-[6px] h-[6px]">
                          <span className={`block transition-all duration-300 ease  ${i18n.language === lang.code ? 'bg-[#69D771]' : 'group-hover:bg-[#CCCCCC]'} absolute inset-0 rounded-full blur-sm opacity-70`} />
                          <span className={`block transition-all duration-300 ease  ${i18n.language === lang.code ? 'bg-[#69D771]' : 'group-hover:bg-[#CCCCCC] bg-[#00000080]'} absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 inset-[4px] rounded-full  w-[4px] h-[4px]`} />
                        </span>
                      </span>
                      <span className={`transition-all duration-300 ease text-[18px]  ${i18n.language === lang.code ? 'text-[#69D771]' : 'group-hover:text-[#CCCCCC] text-[#00000080]'}`}>{lang.lable}</span>
                    </button>
                  ))}

                </div>
              }
            >
              <AppMenuItem
                item={{
                  href: '#', label: <>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.2676 18.8833C15.9735 17.9416 18.7776 14.7408 19.1293 10.8333H14.9785C14.8235 13.7891 13.8485 16.5391 12.2676 18.8833ZM19.1293 9.16664C18.7776 5.25831 15.971 2.05664 12.2643 1.11497C13.846 3.45997 14.8226 6.20997 14.9785 9.16664H19.1293ZM7.73678 1.11497C4.02845 2.05664 1.22345 5.25831 0.870117 9.16664H5.02178C5.17762 6.20997 6.15428 3.45997 7.73678 1.11497ZM0.87095 10.8333C1.04402 12.7192 1.79645 14.5054 3.02497 15.9466C4.2535 17.3879 5.89793 18.4137 7.73262 18.8833C6.15178 16.5391 5.17678 13.7891 5.02178 10.8333H0.87095ZM10.0001 19.135C8.07762 16.8141 6.87345 13.9508 6.69178 10.8333H13.3093C13.126 13.95 11.9226 16.8141 10.001 19.135M10.0001 0.869141C11.9226 3.18914 13.1251 6.05164 13.3085 9.16664H6.69178C6.87512 6.05164 8.07845 3.18914 10.0001 0.869141Z" fill="white" fillOpacity="1" />
                    </svg>
                    <span className="hidden">Языки</span>
                  </>
                }} isActive={false} />
            </PromtModal>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default AppFooter;