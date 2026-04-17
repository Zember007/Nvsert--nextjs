'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { getLocaleFromI18n, getLocaleFromPathname, withLocalePrefix } from 'shared/i18n/client-locale';
import { SliderPost } from 'shared/ui';
import styles from './ServicesExpertAdvantages.module.scss';
import LinkButtonTitle from '../../home/utils/ButtonTitle';


type Block = {
    title: string;
    bullets: string[];
};

const PHOTOS = [
    '/services/expert-advantages/photo-1.jpg',
    '/services/expert-advantages/photo-2.jpg',
    '/services/expert-advantages/photo-3.jpg',
    '/services/expert-advantages/photo-4.jpg',
] as const;

const NUMBERS = [
    '/services/expert-advantages/num-1.png',
    '/services/expert-advantages/num-2.png',
    '/services/expert-advantages/num-3.png',
    '/services/expert-advantages/num-4.png',
] as const;

const NUMBER_TINTS = ['transparent', '#00C8FF', '#FFE100', '#28412F'] as const;

const ARROW_SRC = '/services/expert-advantages/arrow.svg';

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="block w-full list-disc text-[16px] font-light leading-[0] text-black">
            {items.map((line) => (
                <li key={line} className="mb-[5px] ms-[24px] last:mb-0">
                    <span className="leading-[1.3]">{line}</span>
                </li>
            ))}
        </ul>
    );
}

function TextCard({ title, bullets, className = '' }: { title: string; bullets: string[]; className?: string }) {
    return (
        <div
            className={`flex h-full flex-1 flex-col justify-center gap-[20px] rounded-[4px] border border-solid border-[#93969d] p-[31px] text-black not-italic max-m:gap-[10px] max-m:p-0 max-m:[border:none] ${className}`}
        >
            <p className="w-full text-[20px] leading-[1.1] s:text-[24px] s:tracking-[-1px]">
                {title}
            </p>
            <BulletList items={bullets} />
        </div>
    );
}

function NumberCol({ index }: { index: number }) {
    return (
        <div className="relative isolate flex h-full w-[102px] h-[131px] xl:h-[206px] shrink-0 items-center justify-center overflow-visible xl:w-[160px]">
            <Image
                src={NUMBERS[index]}
                alt=""
                width={160}
                height={206}
                className="block h-full w-auto"
                sizes="(min-width: 1024px) 160px, 102px"
                loading="eager"
                priority={index === 0}
            />
            <div
                className={`pointer-events-none absolute inset-0 opacity-30 ${styles.numberTint}`}
                style={
                    {
                        backgroundColor: NUMBER_TINTS[index],
                        // Same asset as <Image>: tint exists only on opaque pixels, no colored rectangle
                        ['--number-mask' as string]: `url("${NUMBERS[index]}")`,
                    } as React.CSSProperties
                }
                aria-hidden
            />
        </div>
    );
}

export default function ServicesExpertAdvantages() {
    const { t, i18n } = useTranslation();
    const pathname = usePathname();
    const i18nLocale = getLocaleFromI18n(i18n.language);
    const locale = getLocaleFromPathname(pathname, i18nLocale);
    const aboutHref = withLocalePrefix('/about', locale);

    const blocks = useMemo(
        () => t('services.expertAdvantages.blocks', { returnObjects: true }) as Block[],
        [t],
    );

    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [mobileAnimSeed, setMobileAnimSeed] = useState(0);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([e]) => {
                if (e?.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.12 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const renderSliderSlide = (block: Block, index: number) => (
        <div
            className={`flex h-full min-h-[420px] w-[280px] min-w-[280px] flex-col overflow-hidden rounded-[4px] border border-solid border-[#93969d] s:min-h-0 s:w-[min(566px,calc(100vw-74px))] s:min-w-[min(566px,calc(100vw-74px))]`}
        >
            <div
                key={index === activeSlide ? `go-${mobileAnimSeed}` : `idle-${index}`}
                className={`flex flex-col gap-[30px] ${index === activeSlide ? styles.slideAnimating : ''}`}
            >
                <div
                    className={`relative w-full shrink-0 overflow-hidden rounded-tl-[4px] rounded-tr-[4px] ${styles.slidePhoto}`}
                    style={{ aspectRatio: '566 / 324' }}
                >
                    <Image src={PHOTOS[index]} alt="" fill className="object-cover" sizes="(max-width: 640px) 280px, min(566px, calc(100vw - 74px))" loading="eager" />
                </div>
                <div className={`px-[21px] pb-[21px] ${styles.slideText}`}>
                    <TextCard title={block.title} bullets={block.bullets} className="!border-none !p-0" />
                </div>
            </div>
        </div>
    );

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} mt-[80px] flex w-full flex-col gap-[30px] px-[26px] xss:px-[37px] xxxl:px-[110px] m:gap-[40px]`}
        >
            <div className="flex flex-col items-center gap-[20px] l:flex-row l:items-end l:justify-between l:gap-0">
                <h2 className="w-full text-center text-[26px] leading-[1.1] tracking-[-1px] text-black xxs:text-[36px] xxs:tracking-[-2px] l:text-left l:text-[40px]">
                    {t('services.expertAdvantages.title')}
                </h2>
                <LinkButtonTitle title={t('services.expertAdvantages.moreAbout')} link={aboutHref} />

            </div>

            {/* Desktop: full rows with numbers — l: (1024+) */}
            <div className={`hidden flex-col gap-[40px] l:flex ${inView ? styles.inView : ''}`}>
                {blocks.map((block, index) => {
                    const photoOnRight = index % 2 === 0;
                    const photoClass = photoOnRight ? styles.photoAnimRtl : styles.photoAnim;
                    const isFirst = index < 2;
                    return (
                        <div
                            key={block.title}
                            className="flex w-full gap-[40px]"
                            style={{ '--r': index } as React.CSSProperties}
                        >
                            {photoOnRight ? (
                                <>
                                    <div className={`shrink-0 flex items-center justify-center ${styles.numberAnim}`}>
                                        <NumberCol index={index} />
                                    </div>
                                    <div className={`min-w-0 flex-1 ${styles.textAnim}`}>
                                        <TextCard title={block.title} bullets={block.bullets} />
                                    </div>
                                    <div className={`relative h-[226px] w-[395px] shrink-0 overflow-hidden rounded-[4px] ${photoClass}`}>
                                        <Image src={PHOTOS[index]} alt="" fill className="object-cover" sizes="395px" priority={isFirst} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`relative h-[226px] w-[395px] shrink-0 overflow-hidden rounded-[4px] ${photoClass}`}>
                                        <Image src={PHOTOS[index]} alt="" fill className="object-cover" sizes="395px" priority={isFirst} />
                                    </div>
                                    <div className={`min-w-0 flex-1 ${styles.textAnim}`}>
                                        <TextCard title={block.title} bullets={block.bullets} />
                                    </div>
                                    <div className={`shrink-0 flex items-center justify-center ${styles.numberAnim}`}>
                                        <NumberCol index={index} />
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Tablet 960–1023: two columns, no decorative numbers */}
            <div
                className={`mx-auto hidden w-full max-w-[886px] flex-col gap-[30px] m:flex l:hidden ${inView ? styles.inView : ''}`}
            >
                {blocks.map((block, index) => {
                    const imageRight = index % 2 === 0;
                    const photoClass = imageRight ? styles.photoAnimRtl : styles.photoAnim;
                    const isFirst = index < 2;
                    return (
                        <div
                            key={`tab-${block.title}`}
                            className={`flex h-[226px] w-full items-center gap-[30px] overflow-hidden rounded-[4px] border border-solid border-[#93969d] ${imageRight ? 'pl-[21px]' : 'pr-[21px]'
                                }`}
                            style={{ '--r': index } as React.CSSProperties}
                        >
                            {imageRight ? (
                                <>
                                    <div className={`min-w-0 flex-1 py-[21px] ${styles.textAnim}`}>
                                        <TextCard title={block.title} bullets={block.bullets} className="!border-none !p-0" />
                                    </div>
                                    <div className={`relative h-full w-[395px] shrink-0 overflow-hidden ${photoClass}`}>
                                        <Image
                                            src={PHOTOS[index]}
                                            alt=""
                                            fill
                                            className={`object-cover ${imageRight ? 'rounded-br-[4px] rounded-tr-[4px]' : ''}`}
                                            sizes="395px"
                                            priority={isFirst}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`relative h-full w-[395px] shrink-0 overflow-hidden ${photoClass}`}>
                                        <Image
                                            src={PHOTOS[index]}
                                            alt=""
                                            fill
                                            className="object-cover rounded-bl-[4px] rounded-tl-[4px]"
                                            sizes="395px"
                                            priority={isFirst}
                                        />
                                    </div>
                                    <div className={`min-w-0 flex-1 py-[21px] ${styles.textAnim}`}>
                                        <TextCard title={block.title} bullets={block.bullets} className="!border-none !p-0" />
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* &lt;960: slider + dots (SliderPost) */}
            <div className="m:hidden">
                <SliderPost
                    items={blocks}
                    renderItem={renderSliderSlide}
                    onSlideChange={(i) => {
                        setActiveSlide(i);
                        setMobileAnimSeed((s) => s + 1);
                    }}
                    containerClassName="!mt-0 max-m:!mx-0 max-m:w-full"
                    itemClassName="!min-w-[280px] !w-[280px] s:!w-[min(566px,calc(100vw-74px))] s:!min-w-[min(566px,calc(100vw-74px))]"
                />
            </div>
        </section>
    );
}
