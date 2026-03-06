'use client';

import { useEffect, useState, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import ContactSpoiler from 'widgets/contacts/ContactSpoiler';
import ContactsButton from './ContactsButton';
import textSize from '@/assets/styles/base/contacts-base.module.scss';
import ConsultationFallback from '@/assets/images/contacts/docs_icon.png';
import FinanceIconFallback from '@/assets/images/contacts/finance_icon.png';
import { useRichTextRenderer } from 'shared/lib';
import { getStrapiImageApiPath } from 'shared/lib/strapi-image';
import { useTranslation } from 'react-i18next';
import type { ContactsPageData } from './ClientPage';

const ContactsSpoilersClient = ({ data, pdfHref }: { data: ContactsPageData; pdfHref: string }) => {
  const { processContent } = useRichTextRenderer();
  const { t } = useTranslation();
  const [isExpandeds, setIsExpandeds] = useState([true, true]);

  const consultationImageSrc =
    (data.connectSection.consultationImage?.url && getStrapiImageApiPath(data.connectSection.consultationImage.url)) ||
    ConsultationFallback;
  const financeImageSrc =
    (data.requisitesSection.image?.url && getStrapiImageApiPath(data.requisitesSection.image.url)) ||
    FinanceIconFallback;

  const consultationW = data.connectSection.consultationImage?.width ?? 368;
  const consultationH = data.connectSection.consultationImage?.height ?? 260;
  const financeW = data.requisitesSection.image?.width ?? 368;
  const financeH = data.requisitesSection.image?.height ?? 260;

  return (
    <>
      <ContactSpoiler
        isExpanded={isExpandeds[0]}
        onToggle={() => {
          setIsExpandeds((prev) => [!prev[0], prev[1]]);
        }}
        title={data.connectSection.spoilerTitle}
      >
        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-[20px]">
            <span className={textSize.headerH2}>{data.connectSection.heading}</span>
            <div className={textSize.text3}>{processContent(data.connectSection.description)}</div>
          </div>

          <div className="flex flex-col m:gap-[30px] gap-[20px]">
            <div className="xxs:p-[40px] s:p-[30px] p-[20px] bg-[#93969d26] rounded-[8px] border border-[#93969d] flex justify-between m:flex-row flex-col-reverse gap-[30px] items-center">
              <div className="flex flex-col gap-[30px]">
                <span className={textSize.headerH3}>{data.connectSection.consultationTitle}</span>
                <div className={textSize.text3 + ' max-w-[660px]'}>
                  {processContent(data.connectSection.consultationText)}
                </div>
                <ContactsButton label={data.connectSection.consultationButtonLabel} />
              </div>
              <ImageAnimated
                src={consultationImageSrc}
                width={consultationW}
                height={consultationH}
                alt={data.connectSection.consultationImage?.alternativeText || 'Consultation'}
                sizes="(min-width: 768px) 368px, 100vw"
                quality={70}
              />
            </div>

            <div className="flex m:gap-[30px] gap-[20px] xl:flex-row flex-col">
              {(data.connectSection.featureCards || []).map((card, index) => (
                <div
                  key={card.title}
                  className="relative xl:p-[40px] p-[30px] xl:pb-[40px] xss:pb-[30px] pb-[86px] bg-[#93969d26] w-full rounded-[8px] border border-[#93969d] flex flex-col gap-[20px]"
                >
                  <div className="absolute xl:top-[10px] bottom-[10px] right-[10px]">
                    {index === 0 && (
                      <svg width="66" height="45" viewBox="0 0 66 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M23.6613 0L0 22.5L20.9099 42.3836L26.4128 37.1509L11.0057 22.5L23.6613 10.4655L36.317 22.5L33 25.6542L26.9316 19.8836L21.4287 25.1164L42.3387 45L66 22.5L42.3387 0L33 8.88029L23.6613 0ZM38.5029 14.1131L47.3227 22.5L38.5028 30.8869L42.3387 34.5345L54.9943 22.5L42.3387 10.4655L38.5029 14.1131Z" fill="#34446D" fillOpacity="0.2" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="35" height="45" viewBox="0 0 35 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.2">
                          <path d="M22.4992 25.1992L34.9987 32.3992L13.1245 44.9992L0 37.7992L22.4992 25.1992Z" fill="url(#paint0_linear_15508_15332)" />
                          <path d="M5.78279e-07 12.5996L13.1245 19.7996V44.9996L0 37.7996L5.78279e-07 12.5996Z" fill="#3C4D79" />
                          <path d="M22.5 0L34.9995 7.2V32.4L22.5 25.2V0Z" fill="url(#paint1_linear_15508_15332)" />
                          <path d="M22.4991 0L34.9987 7.2L13.1245 19.8L0 12.6L22.4991 0Z" fill="#3B4D78" />
                        </g>
                        <defs>
                          <linearGradient id="paint0_linear_15508_15332" x1="28.1239" y1="29.0992" x2="8.6397" y2="42.7351" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#0A1E53" />
                            <stop offset="0.375754" stopColor="#34446D" />
                          </linearGradient>
                          <linearGradient id="paint1_linear_15508_15332" x1="28.7498" y1="0" x2="28.7498" y2="32.4" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#00103A" />
                            <stop offset="0.531505" stopColor="#34446D" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.8125 22.5V42.1875H22.5M22.5 2.8125H42.1875V22.5" stroke="#34446D" strokeOpacity="0.2" strokeWidth="5.625" />
                        <path d="M8.4375 22.5L8.4375 8.4375H22.5M22.5 36.5625H36.5625V22.5" stroke="#34446D" strokeOpacity="0.2" strokeWidth="5.625" />
                        <rect x="11.25" y="33.75" width="11.25" height="11.25" transform="rotate(-90 11.25 33.75)" fill="#34446D" fillOpacity="0.2" />
                        <rect x="22.5" y="22.5" width="11.25" height="11.25" transform="rotate(-90 22.5 22.5)" fill="#34446D" fillOpacity="0.2" />
                      </svg>
                    )}
                  </div>
                  <span className={textSize.headerH6}>{card.title}</span>
                  <p className={textSize.textBasePost}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContactSpoiler>

      <ContactSpoiler
        isExpanded={isExpandeds[1]}
        onToggle={() => {
          setIsExpandeds((prev) => [prev[0], !prev[1]]);
        }}
        title={data.requisitesSection.spoilerTitle}
      >
        {isExpandeds[1] ? (
          <div className="flex flex-col gap-[50px]">
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center justify-between">
                <span className={textSize.headerH2}>{data.requisitesSection.heading}</span>
                <ContactsButton className="m:block hidden" label={data.requisitesSection.downloadButtonLabel} href={pdfHref} />
              </div>
              <div className={textSize.text3}>{processContent(data.requisitesSection.description)}</div>
            </div>

            <ContactsButton className="block m:hidden xxs:!mx-0" label={data.requisitesSection.downloadButtonLabel} href={pdfHref} />


            <div className="xxs:p-[40px] s:p-[30px] p-[20px] bg-[#93969d26] rounded-[8px] border border-[#93969d] flex justify-between m:flex-row flex-col-reverse gap-[30px] items-center">
              <div className="flex flex-col gap-[16px]">
                <div className="flex  gap-[10px] m:flex-row flex-col">
                  <span className={textSize.text1 + ' font-normal text-[#000] whitespace-nowrap'}>
                    {t('contacts.requisites.labels.fullName')}:
                  </span>
                  <span className={textSize.text3}>{data.requisitesSection.legal.fullName}</span>
                </div>
                {data.requisitesSection.legal.legalAddress && (
                  <div className="flex  gap-[10px] m:flex-row flex-col">
                    <span className={textSize.text1 + ' font-normal text-[#000] whitespace-nowrap'}>
                      {t('contacts.requisites.labels.legalAddress')}:
                    </span>
                    <span className={textSize.text3}>{data.requisitesSection.legal.legalAddress}</span>
                  </div>
                )}
                {data.requisitesSection.legal.inn && (
                  <div className="flex gap-[10px] m:flex-row flex-col">
                    <span className={textSize.text1 + ' font-normal text-[#000] whitespace-nowrap'}>
                      {t('contacts.requisites.labels.inn')}:
                    </span>
                    <span className={textSize.text3}>{data.requisitesSection.legal.inn}</span>
                  </div>
                )}
                {data.requisitesSection.legal.ogrn && (
                  <div className="flex gap-[10px] m:flex-row flex-col">
                    <span className={textSize.text1 + ' font-normal text-[#000] whitespace-nowrap'}>
                      {t('contacts.requisites.labels.ogrn')}:
                    </span>
                    <span className={textSize.text3}>{data.requisitesSection.legal.ogrn}</span>
                  </div>
                )}
                {data.requisitesSection.legal.director && (
                  <div className="flex gap-[10px] m:flex-row flex-col">
                    <span className={textSize.text1 + ' font-normal text-[#000] whitespace-nowrap'}>
                      {t('contacts.requisites.labels.director')}:
                    </span>
                    <span className={textSize.text3}>{data.requisitesSection.legal.director}</span>
                  </div>
                )}
                {data.requisitesSection.legal.email && (
                  <div className="flex gap-[10px] m:flex-row flex-col">
                    <span className={textSize.text1 + ' font-normal text-[#000] whitespace-nowrap'}>
                      {t('contacts.requisites.labels.email')}:
                    </span>
                    <span className={textSize.text3}>{data.requisitesSection.legal.email}</span>
                  </div>
                )}
              </div>
              <ImageAnimated
                src={financeImageSrc}
                width={financeW}
                height={financeH}
                alt={data.requisitesSection.image?.alternativeText || 'FinanceIcon'}
                sizes="(min-width: 768px) 368px, 100vw"
                quality={70}
              />
            </div>
          </div>
        ) : null}
      </ContactSpoiler>
    </>
  );
};

export default ContactsSpoilersClient;

const ImageAnimated = ({
  src,
  width,
  height,
  alt,
  sizes,
  quality,
}: {
  src: string | StaticImageData;
  width: number;
  height: number;
  alt: string;
  sizes?: string;
  quality?: number;
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [shouldAnimateIn, setShouldAnimateIn] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldAnimateIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={contentRef}
      className={`flex-1 max-w-[368px] ${
        shouldAnimateIn ? 'translate-x-0 opacity-100' : 'translate-x-[calc(100%+60px)] opacity-0 '
      } transition-all duration-300`}
    >
      <Image
        className="w-full h-full object-cover"
        src={src}
        width={width}
        height={height}
        alt={alt}
        sizes={sizes}
        quality={quality}
      />
    </div>
  );
};
