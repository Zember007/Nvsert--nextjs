import React, { useCallback, useEffect, useRef, useState } from "react";
import AudioLogo from "@/assets/images/svg/AudioLogo.svg";
import { useIntersectionObserver } from 'shared/hooks';
import textSize from "@/assets/styles/base/base.module.scss";
import Image from "shared/ui/OptimizedImage";
import { useTranslation } from "react-i18next";

type FooterMarqueeProps = {
  className?: string;
};

const FooterMarquee: React.FC<FooterMarqueeProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const slides = React.useMemo(() => t("footer.marquee.slides", { returnObjects: true }) as string[], [t]);
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
      className={`flex min-w-0 items-center justify-between gap-[12px] m:gap-[20px] flex-wrap m:flex-nowrap ${className}`}
    >
      <Image
        src={AudioLogo}
        unoptimized={true}
        alt="audio-logo"
        className="w-[180px] m:w-[235px] h-[32px] shrink-0"
      />

        <div className="min-w-0 pl-[11px]  flex gap-[9px] gap-[4px]">

          <svg
            className="shrink-0"
            width="1"
            height="42"
            viewBox="0 0 1 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="footerMarqueeDividerGradient"
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="42"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#353535" stopOpacity="0" />
                <stop offset="0.5" stopColor="#353535" />
                <stop offset="1" stopColor="#353535" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="1" height="42" fill="url(#footerMarqueeDividerGradient)" />
          </svg>
          <div className="h-[42px] overflow-hidden m:w-[235px] text-black">
            <div ref={stepsRef}>
              {slides.map((item, i) => (
                <p
                  key={i}
                  className={`${textSize.text3} font-light h-[42px] flex items-center`}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-[7px] py-[4px] self-end">
            {slides.map((_, i) => (

              <svg
                onClick={() => handleDotClick(i)}
                key={i}
                className={`${currentIndex === i ? '*:fill-[#34446D] *:stroke-[#34446D]' : ""} cursor-pointer`}
                width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 0.5V1.5H7.5V6.5H6.5V7.5H1.5V6.5H0.5V1.5H1.5V0.5H6.5Z" stroke="#93969D" />
              </svg>

            ))}
          </div>
        </div>
    </div>
  );
};

export default FooterMarquee;


