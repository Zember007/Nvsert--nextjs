'use client';

import { useEffect, useRef, useState } from 'react';
import { skills as skillsData } from '../utils';
import AppSkillBlock from './AppSkillBlock';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver, useWindowSize } from 'shared/hooks';
import { filterPrepositions } from 'shared/lib';
import stylesSlider from '@/assets/styles/base/base.module.scss';
import textSize from '@/assets/styles/main.module.scss';
import stylesMainSkills from '@/assets/styles/main.module.scss';
import LinkButtonTitle from '../utils/ButtonTitle';

const AppMainSkills = () => {
  const { t } = useTranslation();
  const { width: widthWindow } = useWindowSize();
  const { ref, isVisible: isVisibleSection } = useIntersectionObserver({}, true);

  const timeLine = useRef<any>(null);
  const [activeIndex, setActive] = useState<number>(0);

  // Инициализация горизонтального слайдера только на мобильных/узких экранах
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef || !widthWindow || widthWindow >= 1407) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;

        const [gsapModule, sliderModule] = await Promise.all([
          import('gsap'),
          import('@/scripts/slider'),
        ]);
        const gsap = gsapModule.default || gsapModule;
        const { horizontalLoop } = sliderModule;

        const slides = gsap.utils.toArray('[data-slider="slide-skill"]');
        const gap = widthWindow < 960 ? (widthWindow - 250) / 2 : 20;

        timeLine.current = horizontalLoop(slides, {
          paused: true,
          center: widthWindow >= 960 ? false : true,
          draggable: true,
          mobile: true,
          gap: Math.round(gap),
          snap: true,
          onChange: (index: number) => {
            setActive(index);
            if (timeLine.current?.alignPositions) {
              // Принудительное выравнивание после изменения активного слайда
              setTimeout(() => timeLine.current?.alignPositions(), 50);
            }
          },
        });

        // Принудительное выравнивание через короткий интервал
        const alignInterval = setInterval(() => {
          if (timeLine.current?.alignPositions) {
            timeLine.current.alignPositions();
          }
        }, 100);

        observer.unobserve(currentRef);
        timeLine.current?.next({ ease: 'power3', duration: 0.725 });

        return () => {
          clearInterval(alignInterval);
          if (timeLine.current) {
            timeLine.current.destroy();
            timeLine.current = null;
          }
        };
      },
      { threshold: 0.3 }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
      if (timeLine.current) {
        timeLine.current.destroy();
        timeLine.current = null;
      }
    };
  }, [widthWindow, ref]);

  const handleDotClick = (index: number) => {
    if (!timeLine.current) return;
    timeLine.current.toIndex(index, { ease: 'power3', duration: 0.725 });
  };

  return (
    <section ref={ref} className="section ">
      <div id="skills" className="absolute top-[-50px] pointer-events-none"></div>

      <div className="flex justify-between items-center wrapper">
        <h2 className={`${textSize.headerH2} section__title`}>{t('MainSkills.sectionTitle')}</h2>

        <LinkButtonTitle  title="Подробнее о компании" link="/about" />
      </div>

      <div className={stylesMainSkills['skills__wrapper']}>
        <SkillsGrid
          skillsData={skillsData}
          widthWindow={widthWindow}
          isVisibleSection={isVisibleSection}
        />

        <SkillsDots
          itemsCount={skillsData.length}
          activeIndex={activeIndex}
          onDotClick={handleDotClick}
        />

        <SkillsDescription t={t} />
      </div>
    </section>
  );
};

export default AppMainSkills;

interface SkillsGridProps {
  skillsData: typeof skillsData;
  widthWindow: number | null | undefined;
  isVisibleSection: boolean;
}

const SkillsGrid: React.FC<SkillsGridProps> = ({ skillsData, widthWindow, isVisibleSection }) => {
  const { t } = useTranslation();

  const gapStyle =
    widthWindow && widthWindow < 960
      ? {
        gap: Math.round((widthWindow - 250) / 2),
      }
      : {};

  return (
    <div className={stylesMainSkills['skills-content-container']}>
      <div className={stylesMainSkills['skills__box']} style={gapStyle}>
        {skillsData.map((skill, index) => {

          return (
            <div key={index} data-slider="slide-skill" className={stylesMainSkills[`slide-skill`]}>
              <AppSkillBlock
                img={skill.img}
                title={skill.key ? t(`MainSkills.${skill.key}.title`) : ''}
                isVisible={isVisibleSection}
                text={
                  skill.key
                    ? (t(`MainSkills.${skill.key}.text`, { returnObjects: true }) as string[])
                    : []
                }
                bg={skill.bg}
                folder={skill.folder}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface SkillsDotsProps {
  itemsCount: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

const SkillsDots: React.FC<SkillsDotsProps> = ({ itemsCount, activeIndex, onDotClick }) => (
  <div className={`${stylesSlider.slideDotsBoxContainer} my-[20px]`}>
    <div className={`${stylesSlider.slideDotsBox}`}>
      {Array.from({ length: itemsCount }).map((_, i) => (
        <div
          key={i}
          onClick={() => onDotClick(i)}
          className={`${activeIndex === i ? stylesSlider.activeDots : ''} ${stylesSlider.slideDots}`}
        ></div>
      ))}
    </div>
  </div>
);

interface SkillsDescriptionProps {
  t: ReturnType<typeof useTranslation>['t'];
}

const SkillsDescription: React.FC<SkillsDescriptionProps> = ({ t }) => (
  <div className={`wrapper ${stylesMainSkills['overlay-content-container']}`}>
    <h3 className={stylesMainSkills['skills__wrapper-desc']}>
      {filterPrepositions(
        t('MainSkills.description')
      )}
    </h3>

  </div>
);


