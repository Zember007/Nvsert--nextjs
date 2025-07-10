import { useEffect, useMemo, useRef, useState } from "react";
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
import gsap from "gsap";
import { useIntersectionObserver } from "@/hook/useIntersectionObserver";

const AppFooter = () => {

  const { ref, isVisible } = useIntersectionObserver();
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

  const slides = [
    'Помогаем сотрудникам не терять важную информацию',
    'Оцифровываем бизнесу переговоры в текст',
    'Конспектируем переговоры и встречи с помощью ИИ'
  ]

  const stepsRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;


  useEffect(() => {
    const stepsParent = stepsRef.current;
    if (!stepsParent || !isVisible) return;

    const stepsArray = Array.from(stepsParent.children);
    const clones = stepsArray.map(child => child.cloneNode(true));
    clones.forEach(clone => stepsParent.appendChild(clone));
  }, [isVisible]);


  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const index = (prev + 1) % totalSlides
        updateSteps(index)
        return index
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, totalSlides]);

  function updateSteps(newIndex: number) {
    const stepsParent = stepsRef.current;
    if (!stepsParent) return;

    gsap.killTweensOf(stepsParent);
    const stepsArray = Array.from(stepsParent.children);
    const height = (stepsArray[0] as HTMLElement).offsetHeight;
    const maxOffset = totalSlides * height;

    let delta = newIndex - currentIndex;
    if (newIndex === 0 && currentIndex === totalSlides - 1) delta = 1;
    else if (newIndex === totalSlides - 1 && currentIndex === 0) delta = -1;

    const direction = delta >= 0 ? 1 : -1;

    let currentY = Number(gsap.getProperty(stepsParent, "y")) || 0;

    if (newIndex === totalSlides - 1 && currentIndex === 0) {
      gsap.set(stepsParent, { y: -maxOffset });
      currentY = -maxOffset;
    }

    let targetY = newIndex * height;

    if (targetY >= maxOffset) targetY -= maxOffset;
    else if (targetY < 0) targetY += maxOffset;

    if (Math.abs(currentY + targetY) > maxOffset / 2) {
      gsap.set(stepsParent, {
        y: currentY + (direction > 0 ? maxOffset : -maxOffset),
      });
      currentY = Number(gsap.getProperty(stepsParent, "y"));
    }

    gsap.to(stepsParent, {
      y: -targetY,
      duration: 0.4,
      ease: "power3",
      onComplete: () => {
        const finalY = Number(gsap.getProperty(stepsParent, "y"));
        if (Math.abs(finalY) >= maxOffset) {
          gsap.set(stepsParent, { y: finalY % maxOffset });
        } else if (finalY > 0) {
          gsap.set(stepsParent, { y: finalY - maxOffset });
        }
      },
    });

    setCurrentIndex(newIndex);
  }

  return (
    <footer ref={ref} className="footer flex flex-col gap-[2px]">
      <div className="flex gap-[2px]">
        <div className="footer__white !grid grid-cols-7 justify-items-start">
          <p className="text-[18px] font-light col-start-1 col-end-3">© 2025 NVSERT</p>

          <div className="flex gap-[10px] xl:flex-row flex-col col-start-4 col-end-7">
            {menuItems.map((item, i) => (
              <AppMenuItem key={i} item={item} isActive={false} />
            ))}

          </div>
        </div>

        <div className="footer__white gap-[10px]">
          <button
            onClick={() => { openDefaultModal('introForm') }}
            className="xl:hidden  border border-solid text-[18px] flex items-center justify-between px-[15px] text-[#FFF]  border-[#93969D] h-[50px] w-full rounded-[4px] bg-[#34446D]"
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
                className="max-xl:!border-[#93969D] xl:!px-[35px]  xl:!h-[35px] w-[280px] xl:mx-0 mx-auto !h-[50px] xl:w-auto group"
                item={{
                  href: '#', label:
                    <>
                      <span className="transition-all duration-200 ease block xl:group-hover:-translate-x-[16px]">{email.value}</span>
                      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5381 5.96154C3.5381 5.45151 3.7407 4.96236 4.10135 4.60172C4.462 4.24107 4.95114 4.03846 5.46117 4.03846H6.61502V7.5C6.61502 7.75254 6.66476 8.00261 6.7614 8.23593C6.85805 8.46925 6.9997 8.68125 7.17827 8.85982C7.53892 9.22047 8.02806 9.42308 8.5381 9.42308H14.6919C14.9445 9.42308 15.1946 9.37334 15.4279 9.27669C15.6612 9.18005 15.8732 9.03839 16.0518 8.85982C16.2303 8.68125 16.372 8.46925 16.4686 8.23593C16.5653 8.00261 16.615 7.75254 16.615 7.5V4.06923C16.9992 4.1396 17.3528 4.32527 17.6289 4.60154L19.8981 6.87077C20.0767 7.04938 20.2183 7.26141 20.3149 7.49476C20.4115 7.72811 20.4612 7.97821 20.4612 8.23077V19.0385C20.4613 19.4818 20.3082 19.9115 20.0278 20.255C19.7475 20.5984 19.3571 20.8344 18.9227 20.9231V14.4231C18.9227 13.913 18.7201 13.4239 18.3595 13.0633C17.9988 12.7026 17.5097 12.5 16.9996 12.5H6.99963C6.4896 12.5 6.00046 12.7026 5.63981 13.0633C5.27917 13.4239 5.07656 13.913 5.07656 14.4231V20.9231C4.64219 20.8344 4.25179 20.5984 3.97144 20.255C3.69109 19.9115 3.538 19.4818 3.5381 19.0385V5.96154ZM6.61502 20.9615V14.4231C6.61502 14.3211 6.65554 14.2232 6.72767 14.1511C6.7998 14.079 6.89763 14.0385 6.99963 14.0385H16.9996C17.1016 14.0385 17.1995 14.079 17.2716 14.1511C17.3437 14.2232 17.3842 14.3211 17.3842 14.4231V20.9615H6.61502ZM15.0766 4.03846V7.5C15.0766 7.60201 15.036 7.69984 14.9639 7.77196C14.8918 7.84409 14.7939 7.88462 14.6919 7.88462H8.5381C8.43609 7.88462 8.33826 7.84409 8.26613 7.77196C8.194 7.69984 8.15348 7.60201 8.15348 7.5V4.03846H15.0766ZM5.46117 2.5C4.54312 2.5 3.66266 2.8647 3.01349 3.51386C2.36433 4.16303 1.99963 5.04348 1.99963 5.96154V19.0385C1.99963 19.9565 2.36433 20.837 3.01349 21.4861C3.66266 22.1353 4.54312 22.5 5.46117 22.5H18.5381C19.4562 22.5 20.3366 22.1353 20.9858 21.4861C21.6349 20.837 21.9996 19.9565 21.9996 19.0385V8.23077C21.9996 7.77619 21.9101 7.32607 21.7362 6.90609C21.5622 6.48611 21.3072 6.10451 20.9858 5.78308L18.7166 3.51385C18.3951 3.19241 18.0135 2.93744 17.5935 2.76348C17.1736 2.58953 16.7234 2.5 16.2689 2.5H5.46117Z" fill="black" />
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
              className="max-xl:!border-[#93969D] xl:!px-[35px] xl:!h-[35px] xl:w-auto w-[280px] xl:mx-0 mx-auto  !h-[50px]  group"
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
              className="max-xl:!border-[#93969D] xl:!px-[35px] xl:!h-[35px] xl:w-auto w-[280px] xl:mx-0 mx-auto !h-[50px]  group"
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
                    <path d="M12.2676 18.8833C15.9735 17.9416 18.7776 14.7408 19.1293 10.8333H14.9785C14.8235 13.7891 13.8485 16.5391 12.2676 18.8833ZM19.1293 9.16664C18.7776 5.25831 15.971 2.05664 12.2643 1.11497C13.846 3.45997 14.8226 6.20997 14.9785 9.16664H19.1293ZM7.73678 1.11497C4.02845 2.05664 1.22345 5.25831 0.870117 9.16664H5.02178C5.17762 6.20997 6.15428 3.45997 7.73678 1.11497ZM0.87095 10.8333C1.04402 12.7192 1.79645 14.5054 3.02497 15.9466C4.2535 17.3879 5.89793 18.4137 7.73262 18.8833C6.15178 16.5391 5.17678 13.7891 5.02178 10.8333H0.87095ZM10.0001 19.135C8.07762 16.8141 6.87345 13.9508 6.69178 10.8333H13.3093C13.126 13.95 11.9226 16.8141 10.001 19.135M10.0001 0.869141C11.9226 3.18914 13.1251 6.05164 13.3085 9.16664H6.69178C6.87512 6.05164 8.07845 3.18914 10.0001 0.869141Z" fill="black" fillOpacity="1" />
                  </svg>
                  <span className="hidden">Языки</span>
                </>
              }} isActive={false} />
          </PromtModal>
        </div>
      </div>
      <div className="flex gap-[2px] mb-[2px]">
        <div className="footer__dark !grid grid-cols-7 justify-items-start">
          <div className=" xl:text-[16px] xl:items-start items-center text-[14px] flex flex-col xl:gap-[18px]  gap-[16px] ">
            <span>{t("footer.inn")}</span>
            <span>{t("footer.company")}</span>
          </div>

          <div className="col-start-4 col-end-7 flex gap-[8px] flex-col">
            <AppMenuItem
              className=" xl:!h-[35px] !h-auto !text-left"

              item={{ href: '/soglashenie/polzovatelskoe-soglashenie/', label: t("footer.policy") }} isActive={false} />
            <AppMenuItem
              className=" xl:!h-[35px] !h-auto !text-left"

              item={{ href: '/soglashenie/polzovatelskoe-soglashenie/', label: 'Обработка персональных данных' }} isActive={false} />
          </div>
        </div>

        <div className="footer__dark gap-[16px]">
          <Image src={AudioLogo} alt="audioselector" />
          <div className="pl-[16px] border-l border-[#FFF] border-solid flex flex-col gap-[4px]">
            <div className="h-[23px] overflow-hidden text-[#FFF]">
              <div ref={stepsRef}>
                {slides.map((item, i) => (
                  <h3 key={i} className="text-[18px] leading-[23px]">
                    {item}
                  </h3>
                ))}
              </div>
            </div>
            <div className="flex gap-[7px]">
              {slides.map((_, i) => (
                <div
                  onClick={() => {
                    updateSteps(i)
                  }}
                  key={i} className={`${currentIndex === i ? 'active' : ""} slide-dots`}></div>
              ))}
            </div>
          </div>
        </div>



      </div>
    </footer>
  );
};

export default AppFooter;