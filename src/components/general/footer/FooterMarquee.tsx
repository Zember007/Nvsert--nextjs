import React, { useCallback, useEffect, useRef, useState } from "react";
import AudioLogo from "@/assets/images/svg/audio-selector.svg";
import { useIntersectionObserver } from "@/hook/useIntersectionObserver";
import footerStyles from "@/assets/styles/sections/footer.module.scss";
import stylesSlider from "@/assets/styles/base/base.module.scss";
import textSize from "@/assets/styles/base/base.module.scss";

const slides = [
  "Помогаем сотрудникам не терять информацию",
  "Оцифровываем бизнесу переговоры в текст",
  "Конспектируем переговоры и встречи с помощью ИИ",
];

const FooterMarquee: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver();
  const stepsRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;
  const gsapRef = useRef<any>(null);

  // Clone slides for infinite scroll effect
  useEffect(() => {
    const stepsParent = stepsRef.current;
    if (!stepsParent || !isVisible) return;

    const alreadyCloned = (stepsParent as any).__cloned;
    if (alreadyCloned) return;

    const stepsArray = Array.from(stepsParent.children);
    const clones = stepsArray.map((child) => child.cloneNode(true));
    clones.forEach((clone) => stepsParent.appendChild(clone));
    (stepsParent as any).__cloned = true;
  }, [isVisible]);

  const loadGsap = async () => {
    if (!gsapRef.current) {
      const [gsapModule] = await Promise.all([import("gsap")]);
      const gsapLib: any =
        (gsapModule as any).gsap || (gsapModule as any).default || gsapModule;
      gsapRef.current = gsapLib;
    }
    return gsapRef.current;
  };

  const updateSteps = useCallback(
    (newIndex: number, prevIndex: number) => {
      const stepsParent = stepsRef.current;
      const gsap = gsapRef.current;
      if (!stepsParent || !gsap) return;

      const stepsArray = Array.from(stepsParent.children);
      if (stepsArray.length === 0) return;

      const height = (stepsArray[0] as HTMLElement).offsetHeight;
      const maxOffset = totalSlides * height;

      gsap.killTweensOf(stepsParent);

      let delta = newIndex - prevIndex;
      if (newIndex === 0 && prevIndex === totalSlides - 1) delta = 1;
      else if (newIndex === totalSlides - 1 && prevIndex === 0) delta = -1;

      const direction = delta >= 0 ? 1 : -1;

      let currentY = Number(gsap.getProperty(stepsParent, "y")) || 0;

      if (newIndex === totalSlides - 1 && prevIndex === 0) {
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
    },
    [totalSlides]
  );

  // Auto-rotate slides when visible, after gsap is loaded
  useEffect(() => {
    if (!isVisible) return;

    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | undefined;

    const start = async () => {
      await loadGsap();
      if (cancelled) return;

      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const index = (prev + 1) % totalSlides;
          updateSteps(index, prev);
          return index;
        });
      }, 3000);
    };

    start();

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, [isVisible, totalSlides, updateSteps]);

  const handleDotClick = async (index: number) => {
    await loadGsap();
    updateSteps(index, currentIndex);
    setCurrentIndex(index);
  };

  return (
    <div
      ref={ref}
      className={`${footerStyles.footer__dark} m:justify-start justify-center gap-[16px] xl:h-auto m:h-[135px] h-[96px]`}
    >
      <img
        src={AudioLogo}
        alt="audio-logo"
        className="xl:ml-[35px]"
      />
      <div className="pl-[16px] border-l border-[#FFF] border-solid flex flex-col gap-[4px]">
        <div className="xxs:h-[23px] h-[60px] overflow-hidden text-[#FFF]">
          <div ref={stepsRef}>
            {slides.map((item, i) => (
              <p
                key={i}
                className={`font-light ${textSize.text2} font-light xxs:h-[23px] h-[60px] flex items-center`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="flex gap-[7px] py-[4px]">
          {slides.map((_, i) => (
            <div
              onClick={() => handleDotClick(i)}
              key={i}
              className={`${currentIndex === i ? stylesSlider.activeDots : ""} ${stylesSlider.slideDots}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterMarquee;


