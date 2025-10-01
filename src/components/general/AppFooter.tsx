import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import AudioLogo from '@/assets/images/svg/audio-selector.svg';
import AppMenuItem from "./AppMenuItem";
import PromtModal from "../modals/PromtModal";
import { useHeaderContext } from "../contexts/HeaderContext";
import gsap from "gsap";
import { useIntersectionObserver } from "@/hook/useIntersectionObserver";
import { useCopyContext } from "../contexts/CopyContext";

const AppFooter = () => {

  const { ref, isVisible } = useIntersectionObserver();
  const { t, i18n } = useTranslation();
  const { handleCopy } = useCopyContext();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = [
    { label: "FAQ", href: "#" },
    { label: t("navigation.blog"), href: "#" },
    { label: t("navigation.reviews"), href: "/feedback" },
    { label: t("navigation.okp"), href: "/class/okp/" },
    { label: t('navigation.tnved'), href: "/class/tnved/" }
  ]

  const langs = [
    { lable: 'Россия', code: 'ru' },
    { lable: 'English', code: 'en' },
  ]

  const { openDefaultModal } = useHeaderContext();

  const slides = [
    'Помогаем сотрудникам не терять информацию',
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
    <footer ref={ref} className="footer grid xl:grid-cols-2 gap-[2px]">
      <div className="footer__white change-style xl:row-start-auto row-start-2   xl:justify-between xxs:gap-[62px]  xl:mx-0 m:mx-auto xxs:mx-0 xl:gap-[0px]" >
        <p className="xxs:block hidden xl:static absolute left-[34px] top-1/2 -translate-y-1/2 text-[18px] font-light col-start-1 col-end-3 whitespace-nowrap">© 2025 NVSERT</p>

        <div className="xxs:w-auto w-full xxs:mx-0 mx-auto xxs:max-w-full max-w-[280px]  flex gap-[10px] items-start xxs:flex-row flex-col ">
          {menuItems.map((item, i) => (
            <AppMenuItem
              className="xxs:!h-[35px] !h-[50px]"
              key={i} item={item} isActive={false} />
          ))}

        </div>
      </div>

      <div className="footer__white xxs:justify-center xl:justify-start justify-start">
        <div className="xl:flex xxs:grid grid-cols-2 place-items-center flex gap-[10px] xxs:flex-row flex-col xl:w-full xxs:w-auto w-full">
          <button
            onClick={() => { openDefaultModal('introForm') }}
            className="xl:hidden  border border-solid w-full text-[18px] flex items-center justify-between px-[15px] text-[#FFF]  border-[#93969D] h-[50px] xss:w-[280px] w-[260px] mx-auto rounded-[3px] bg-[#34446D]"
          >
            <span>Заказать звонок</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.03597 2C7.61151 2 9.91367 7.17986 9.91367 7.7554C9.91367 8.90648 8.18705 10.0576 7.61151 11.2086C7.03597 12.3597 8.18705 13.5108 9.33813 14.6619C9.78705 15.1108 11.6403 16.964 12.7914 16.3885C13.9424 15.813 15.0935 14.0863 16.2446 14.0863C16.8201 14.0863 22 16.3885 22 16.964C22 19.2662 20.2734 20.9928 18.5468 21.5683C16.8201 22.1439 15.6691 22.1439 13.3669 21.5683C11.0647 20.9928 9.33813 20.4173 6.46043 17.5396C3.58273 14.6619 3.00719 12.9353 2.43165 10.6331C1.85612 8.33094 1.85612 7.17986 2.43165 5.45324C3.00719 3.72662 4.73381 2 7.03597 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 7C14.6689 7.31419 15.277 7.73986 15.7838 8.25676C16.2804 8.75338 16.6959 9.35135 17 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 2C16.7165 2.45043 18.2504 3.33913 19.4678 4.55652C20.673 5.77391 21.5617 7.29565 22 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>


          </button>
          <AppMenuItem
            onClick={(e) => handleCopy('info@nvsert.ru', e)}
            className="sendBtn max-xl:!border-[#93969D] gap-[8px] max-xl:!bg-[#F5F5F2]  w-full xl:!h-[35px] xss:w-[280px] w-[260px] xl:mx-0 mx-auto !h-[50px] xl:w-auto cursor-pointer"
            item={{
              href: '#', label:
                <>
                  <span className="sendTextFooter">info@nvsert.ru</span>
                  <svg className="sendIconFooter" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5381 5.96154C3.5381 5.45151 3.7407 4.96236 4.10135 4.60172C4.462 4.24107 4.95114 4.03846 5.46117 4.03846H6.61502V7.5C6.61502 7.75254 6.66476 8.00261 6.7614 8.23593C6.85805 8.46925 6.9997 8.68125 7.17827 8.85982C7.53892 9.22047 8.02806 9.42308 8.5381 9.42308H14.6919C14.9445 9.42308 15.1946 9.37334 15.4279 9.27669C15.6612 9.18005 15.8732 9.03839 16.0518 8.85982C16.2303 8.68125 16.372 8.46925 16.4686 8.23593C16.5653 8.00261 16.615 7.75254 16.615 7.5V4.06923C16.9992 4.1396 17.3528 4.32527 17.6289 4.60154L19.8981 6.87077C20.0767 7.04938 20.2183 7.26141 20.3149 7.49476C20.4115 7.72811 20.4612 7.97821 20.4612 8.23077V19.0385C20.4613 19.4818 20.3082 19.9115 20.0278 20.255C19.7475 20.5984 19.3571 20.8344 18.9227 20.9231V14.4231C18.9227 13.913 18.7201 13.4239 18.3595 13.0633C17.9988 12.7026 17.5097 12.5 16.9996 12.5H6.99963C6.4896 12.5 6.00046 12.7026 5.63981 13.0633C5.27917 13.4239 5.07656 13.913 5.07656 14.4231V20.9231C4.64219 20.8344 4.25179 20.5984 3.97144 20.255C3.69109 19.9115 3.538 19.4818 3.5381 19.0385V5.96154ZM6.61502 20.9615V14.4231C6.61502 14.3211 6.65554 14.2232 6.72767 14.1511C6.7998 14.079 6.89763 14.0385 6.99963 14.0385H16.9996C17.1016 14.0385 17.1995 14.079 17.2716 14.1511C17.3437 14.2232 17.3842 14.3211 17.3842 14.4231V20.9615H6.61502ZM15.0766 4.03846V7.5C15.0766 7.60201 15.036 7.69984 14.9639 7.77196C14.8918 7.84409 14.7939 7.88462 14.6919 7.88462H8.5381C8.43609 7.88462 8.33826 7.84409 8.26613 7.77196C8.194 7.69984 8.15348 7.60201 8.15348 7.5V4.03846H15.0766ZM5.46117 2.5C4.54312 2.5 3.66266 2.8647 3.01349 3.51386C2.36433 4.16303 1.99963 5.04348 1.99963 5.96154V19.0385C1.99963 19.9565 2.36433 20.837 3.01349 21.4861C3.66266 22.1353 4.54312 22.5 5.46117 22.5H18.5381C19.4562 22.5 20.3366 22.1353 20.9858 21.4861C21.6349 20.837 21.9996 19.9565 21.9996 19.0385V8.23077C21.9996 7.77619 21.9101 7.32607 21.7362 6.90609C21.5622 6.48611 21.3072 6.10451 20.9858 5.78308L18.7166 3.51385C18.3951 3.19241 18.0135 2.93744 17.5935 2.76348C17.1736 2.58953 16.7234 2.5 16.2689 2.5H5.46117Z" fill="black" />
                  </svg>
                </>
            }} isActive={false} />
          <AppMenuItem
            onClick={(e) => handleCopy('@nvsert', e)}
            className="sendBtn max-xl:!border-[#93969D] max-xl:!bg-[#F5F5F2]  w-full  xl:!h-[35px] xl:w-auto xss:w-[280px] w-[260px] xl:mx-0 mx-auto  !h-[50px]  group cursor-pointer"
            item={{
              href: '#', label:
                <>
                  <span className="sendTextFooter">Telegram</span>


                  <svg
                    className="sendIconFooter"
                    width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.3357 9.43586L15.2769 16.2155C15.2623 16.309 15.2247 16.3974 15.1675 16.4727C15.1103 16.5481 15.0353 16.6081 14.9492 16.6473C14.8631 16.6865 14.7686 16.7037 14.6742 16.6973C14.5798 16.691 14.4885 16.6613 14.4084 16.6109L10.8626 14.3892C10.7889 14.3431 10.7267 14.2808 10.6808 14.207C10.6348 14.1332 10.6063 14.0499 10.5974 13.9635C10.5885 13.877 10.5994 13.7896 10.6294 13.708C10.6594 13.6264 10.7076 13.5527 10.7703 13.4926L13.7138 10.6715C13.7468 10.6404 13.708 10.589 13.6691 10.6123L9.40256 13.1652C9.14896 13.3177 8.84781 13.3707 8.5574 13.3138L7.01282 13.0156C6.45521 12.9078 6.37846 12.1423 6.90207 11.9257L15.1613 8.51105C15.302 8.45251 15.4557 8.43256 15.6067 8.45324C15.7577 8.47393 15.9004 8.53452 16.0202 8.62875C16.14 8.72298 16.2324 8.84744 16.2881 8.98932C16.3437 9.13119 16.3595 9.28534 16.3357 9.43586Z" fill="white" />
                    <path d="M16.3357 9.43586L15.2769 16.2155C15.2623 16.309 15.2247 16.3974 15.1675 16.4727C15.1103 16.5481 15.0353 16.6081 14.9492 16.6473C14.8631 16.6865 14.7686 16.7037 14.6742 16.6973C14.5798 16.691 14.4885 16.6613 14.4084 16.6109L10.8626 14.3892C10.7889 14.3431 10.7267 14.2808 10.6808 14.207C10.6348 14.1332 10.6063 14.0499 10.5974 13.9635C10.5885 13.877 10.5994 13.7896 10.6294 13.708C10.6594 13.6264 10.7076 13.5527 10.7703 13.4926L13.7138 10.6715C13.7468 10.6404 13.708 10.589 13.6691 10.6123L9.40256 13.1652C9.14896 13.3177 8.84781 13.3707 8.5574 13.3138L7.01282 13.0156C6.45521 12.9078 6.37846 12.1423 6.90207 11.9257L15.1613 8.51105C15.302 8.45251 15.4557 8.43256 15.6067 8.45324C15.7577 8.47393 15.9004 8.53452 16.0202 8.62875C16.14 8.72298 16.2324 8.84744 16.2881 8.98932C16.3437 9.13119 16.3595 9.28534 16.3357 9.43586Z" fill="url(#paint0_linear_4763_590)" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 2.5C6.47749 2.5 2.00012 6.97737 2.00012 12.5C2.00012 18.0226 6.47749 22.5 12.0001 22.5C17.5228 22.5 22.0001 18.0226 22.0001 12.5C22.0001 6.97737 17.5228 2.5 12.0001 2.5ZM4.3445 9.32894C3.92808 10.3343 3.71374 11.4118 3.71374 12.5C3.71374 14.6977 4.58677 16.8054 6.14077 18.3594C7.69476 19.9134 9.80244 20.7864 12.0001 20.7864C14.1978 20.7864 16.3055 19.9134 17.8595 18.3594C19.4135 16.8054 20.2865 14.6977 20.2865 12.5C20.2865 11.4118 20.0722 10.3343 19.6557 9.32894C19.2393 8.32359 18.6289 7.41011 17.8595 6.64064C17.09 5.87118 16.1765 5.26081 15.1712 4.84438C14.1658 4.42795 13.0883 4.21362 12.0001 4.21362C10.9119 4.21362 9.83441 4.42795 8.82906 4.84438C7.82371 5.26081 6.91023 5.87118 6.14077 6.64064C5.3713 7.41011 4.76093 8.32359 4.3445 9.32894Z" fill="#2AABEE" />
                    <defs>
                      <linearGradient id="paint0_linear_4763_590" x1="496.461" y1="8.44531" x2="496.461" y2="833.774" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2AABEE" />
                        <stop offset="1" stopColor="#229ED9" />
                      </linearGradient>
                    </defs>
                  </svg>


                </>
            }} isActive={false} />
          <AppMenuItem
            onClick={(e) => handleCopy('+7 (999) 123-45-67', e)}
            className="sendBtn max-xl:!border-[#93969D]  max-xl:!bg-[#F5F5F2]   xl:!h-[35px] xl:w-auto xss:w-[280px] w-[260px] xl:mx-0 mx-auto !h-[50px]  group cursor-pointer"
            item={{
              href: '#', label:
                <>
                  <span className="sendTextFooter">WhatsApp</span>

                  <svg
                    className="sendIconFooter"
                    width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.2307 14.33C16.3794 14.4025 16.4988 14.4606 16.56 14.49C16.6095 14.5138 16.655 14.5348 16.6968 14.554C16.8662 14.6321 16.9739 14.6818 17.03 14.77C17.1 14.88 17.1 15.37 16.89 15.95C16.69 16.53 15.7 17.06 15.22 17.13C14.79 17.19 14.25 17.22 13.66 17.03C13.3 16.92 12.84 16.77 12.25 16.51C9.87904 15.4871 8.28497 13.157 8.04455 12.8056C8.0335 12.7895 8.02531 12.7775 8.02003 12.77L8.01809 12.7674C7.89075 12.5977 7.01004 11.4236 7.01004 10.21C7.01004 9.08443 7.55483 8.4866 7.81191 8.20448C7.83347 8.18082 7.85301 8.15938 7.87003 8.14004C8.10003 7.89004 8.36003 7.83004 8.53003 7.83004H9.01003C9.0274 7.8312 9.04557 7.83142 9.06444 7.83164C9.20852 7.83338 9.39319 7.83562 9.57003 8.26004C9.77003 8.76004 10.27 9.98003 10.33 10.1C10.39 10.22 10.43 10.36 10.35 10.53C10.3432 10.5437 10.3366 10.557 10.3301 10.5699C10.261 10.709 10.2098 10.812 10.1 10.94C10.0617 10.9847 10.0214 11.0335 9.9806 11.0828C9.89369 11.1878 9.80491 11.2952 9.73003 11.37C9.60003 11.5 9.48003 11.63 9.62003 11.88C9.77003 12.13 10.26 12.94 11 13.6C11.8038 14.3183 12.5051 14.6198 12.8479 14.7671C12.906 14.7921 12.9538 14.8126 12.99 14.83C13.24 14.96 13.39 14.94 13.53 14.77C13.67 14.61 14.14 14.05 14.31 13.8C14.48 13.56 14.64 13.6 14.87 13.68C15.0361 13.748 15.7724 14.1067 16.2307 14.33Z" fill="#60D669" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.05 5.41005C18.1331 4.48415 17.041 3.75002 15.8375 3.25041C14.634 2.75081 13.3431 2.49574 12.04 2.50005C6.58004 2.50005 2.13005 6.95004 2.13005 12.41C2.13005 14.16 2.59005 15.86 3.45005 17.36L2.05005 22.5L7.30003 21.12C8.75003 21.91 10.38 22.33 12.04 22.33C17.5 22.33 21.95 17.88 21.95 12.42C21.95 9.77003 20.92 7.28004 19.05 5.41005ZM7.84003 19.5C9.11003 20.25 10.56 20.65 12.04 20.65C16.58 20.65 20.28 16.96 20.26 12.42C20.2642 11.3371 20.0533 10.2641 19.6396 9.26336C19.2259 8.26258 18.6176 7.3539 17.85 6.59004C16.3 5.03005 14.23 4.17005 12.03 4.17005C7.49003 4.17005 3.79004 7.87004 3.79004 12.41C3.79097 13.9593 4.22759 15.4771 5.05004 16.79L5.25004 17.1L4.42004 20.14L7.54003 19.32L7.84003 19.5Z" fill="#60D669" />
                  </svg>



                </>
            }} isActive={false} />
          <PromtModal
            classNameBox="!w-auto xl:!relative !absolute xl:bottom-0 xl:right-0 m:bottom-[-53px] xxs:bottom-[-66px] xxs:right-[34px] bottom-[-80px]  right-1/2 xxs:translate-x-0 translate-x-[140px]"
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
              className="btn-lang xxs:!h-[35px] !h-[50px] xxs:w-auto w-[50px]"
              item={{
                href: '#', label: <>
                  <svg
                    className="xxs:*:fill-black *:fill-white"
                    width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.2676 18.8833C15.9735 17.9416 18.7776 14.7408 19.1293 10.8333H14.9785C14.8235 13.7891 13.8485 16.5391 12.2676 18.8833ZM19.1293 9.16664C18.7776 5.25831 15.971 2.05664 12.2643 1.11497C13.846 3.45997 14.8226 6.20997 14.9785 9.16664H19.1293ZM7.73678 1.11497C4.02845 2.05664 1.22345 5.25831 0.870117 9.16664H5.02178C5.17762 6.20997 6.15428 3.45997 7.73678 1.11497ZM0.87095 10.8333C1.04402 12.7192 1.79645 14.5054 3.02497 15.9466C4.2535 17.3879 5.89793 18.4137 7.73262 18.8833C6.15178 16.5391 5.17678 13.7891 5.02178 10.8333H0.87095ZM10.0001 19.135C8.07762 16.8141 6.87345 13.9508 6.69178 10.8333H13.3093C13.126 13.95 11.9226 16.8141 10.001 19.135M10.0001 0.869141C11.9226 3.18914 13.1251 6.05164 13.3085 9.16664H6.69178C6.87512 6.05164 8.07845 3.18914 10.0001 0.869141Z" fill="black" fillOpacity="1" />
                  </svg>
                  <span className="hidden">Языки</span>
                </>
              }} isActive={false} />
          </PromtModal>
        </div>
      </div>

      <div className="footer__dark bottom-top xxs:justify-between  m:gap-[216px] xl:!gap-[0px] xl:h-auto xxs:h-[135px]">
        <div className="xxs:flex hidden text-[16px] items-start  flex-col gap-[18px] font-ligh whitespace-nowrap">
          <span>{t("footer.inn")}</span>
          <span>{t("footer.company")}</span>
        </div>

        <div className="xxs:max-w-full m:w-full xxs:mx-0 mx-auto max-w-[280px]  flex xl:gap-[8px] gap-[10px] flex-col xl:items-end items-start">
          <AppMenuItem
            className="max-xl:!border-[#FFFFFF] xl:!h-[35px] !h-auto !text-left"

            item={{ href: '/soglashenie/polzovatelskoe-soglashenie/', label: t("footer.policy") }} isActive={false} />
          <AppMenuItem
            className="max-xl:!border-[#FFFFFF] xl:!h-[35px] !h-auto !text-left"

            item={{ href: '/soglashenie/polzovatelskoe-soglashenie/', label: 'Обработка персональных данных' }} isActive={false} />
        </div>
      </div>

      <div className="xxs:!hidden footer__white flex-col gap-[5.5px] !p-[18px] h-[96px] text-[14px]">
        <span>«ЦЕНТР СТАНДАРТИЗАЦИИ»</span>
        <span>ИНН 6027189146</span>
        <span className="font-light">© 2025 NVSERT</span>
      </div>

      <div className="footer__dark xxs:justify-start justify-center gap-[16px] xl:h-auto xxs:h-[135px] h-[96px]">
        <Image src={AudioLogo} alt="audiosector" className="xl:ml-[35px]" />
        <div className="pl-[16px] border-l border-[#FFF] border-solid flex flex-col gap-[4px]">
          <div className="xxs:h-[23px] h-[36px] overflow-hidden text-[#FFF]">
            <div ref={stepsRef}>
              {slides.map((item, i) => (
                <h3 key={i} className="font-light xxs:text-[18px] text-[14px]">
                  {item}
                </h3>
              ))}
            </div>
          </div>
          <div className="flex gap-[7px] py-[4px]">
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

    </footer>
  );
};

export default AppFooter;