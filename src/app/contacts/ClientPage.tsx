'use client';

import { AppBreadcrumbs } from 'widgets/layout';
import { Button } from '@/shared/ui';
import { useHeaderContext } from '@/shared/contexts';
import textSize from '@/assets/styles/base/base.module.scss';
import Image from 'next/image';
import Moscow from '@/assets/images/contacts/towns/moscow.jpg';
import SaintPetersburg from '@/assets/images/contacts/towns/spb.jpg';
import Pskov from '@/assets/images/contacts/towns/pskov.jpg';
import ContactSpoiler from '@/widgets/contacts/ContactSpoiler';
import { useMemo, useState } from 'react';
import ConsultationFallback from '@/assets/images/contacts/docs_icon.png';
import FinanceIconFallback from '@/assets/images/contacts/finance_icon.png';
import { useRichTextRenderer } from 'shared/lib';

export type StrapiMedia = {
  url?: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  name?: string;
};

export type ContactsOffice = {
  city: string;
  address: string;
  phones?: Array<{ value: string }> | string[];
  email?: string;
  image?: StrapiMedia;
};

export type ContactsFeatureCard = {
  title: string;
  text: string;
};

export type ContactsConnectSection = {
  spoilerTitle: string;
  heading: string;
  description: string; // richtext html
  consultationTitle: string;
  consultationText: string; // richtext html
  consultationButtonLabel: string;
  consultationImage?: StrapiMedia;
  featureCards?: ContactsFeatureCard[];
};

export type ContactsLegalDetails = {
  fullName: string;
  shortName?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  legalAddress?: string;
  director?: string;
  chiefAccountant?: string;
  accountNumber?: string;
  bank?: string;
  bik?: string;
  corrAccount?: string;
  phone?: string;
  email?: string;
};

export type ContactsRequisitesSection = {
  spoilerTitle: string;
  heading: string;
  description: string; // richtext html
  downloadButtonLabel: string;
  pdfUrl: string;
  legal: ContactsLegalDetails;
  image?: StrapiMedia;
};

export type ContactsSeo = {
  metaTitle: string;
  metaDescription: string;
  shareImage?: StrapiMedia;
};

export type ContactsPageData = {
  title: string;
  intro: string; // richtext html
  offices?: ContactsOffice[];
  connectSection: ContactsConnectSection;
  requisitesSection: ContactsRequisitesSection;
  seo?: ContactsSeo;
};

function normalizePhones(phones?: Array<{ value: string }> | string[]): string[] {
  if (!phones) return [];
  if (Array.isArray(phones) && typeof phones[0] === 'string') return phones as string[];
  return (phones as Array<{ value: string }>).map((p) => p.value).filter(Boolean);
}

function encodeDownloadHref(url: string): string {
  if (!url) return url;
  return url.startsWith('/') ? encodeURI(url) : url;
}

const ClientPage = ({ data }: { data: ContactsPageData }) => {
  const { openDefaultModal } = useHeaderContext();
  const { processContent } = useRichTextRenderer();

  const [isExpandeds, setIsExpandeds] = useState([true, true]);

  const offices = data.offices ?? [];

  const fallbackImageByCity = useMemo(() => {
    return new Map<string, any>([
      ['Москва', Moscow],
      ['Санкт-Петербург', SaintPetersburg],
      ['Псков', Pskov],
    ]);
  }, []);

  const consultationImageSrc = data.connectSection.consultationImage?.url || ConsultationFallback;
  const financeImageSrc = data.requisitesSection.image?.url || FinanceIconFallback;

  const consultationW = data.connectSection.consultationImage?.width ?? 368;
  const consultationH = data.connectSection.consultationImage?.height ?? 260;
  const financeW = data.requisitesSection.image?.width ?? 368;
  const financeH = data.requisitesSection.image?.height ?? 260;

  const pdfHref = encodeDownloadHref(data.requisitesSection.pdfUrl);

  return (
    <div className={`main text-[#000] mb-[100px] flex flex-col gap-[150px]`}>
      <AppBreadcrumbs
        root={'/'}
        breadcrumbs={[{ id: 1, title: data.title || 'Контакты', full_slug: '/contacts' }]}
      />

      <div className="wrapper pt-[50px] ">
        <div className="flex gap-[40px] max-w-full">
          <div className="flex flex-col gap-[50px] flex-1 max-w-full">
            <div className="flex items-center justify-between gap-[20px] m:flex-row flex-col">
              <h1 className="m:text-left text-center m:!m-0">{data.title || 'Контакты'}</h1>

              <div className="xl:hidden">
                <Button
                  onClick={() => {
                    openDefaultModal('orderForm');
                  }}
                  label="Оформить заявку"
                />
              </div>
            </div>

            <div className="flex flex-col gap-[30px]">
              <div className={textSize.textBasePost}>{processContent(data.intro)}</div>

              <div className="flex xl:gap-[26px] gap-[20px] xl:flex-row flex-col">
                {offices.map((office) => {
                  const phoneList = normalizePhones(office.phones);
                  const imageUrl = office.image?.url;
                  const imgSrc = imageUrl || fallbackImageByCity.get(office.city);
                  const imgW = office.image?.width ?? 1200;
                  const imgH = office.image?.height ?? 800;

                  return (
                    <div
                      className="p-[30px] flex xl:flex-col m:flex-row flex-col gap-[20px] w-full bg-[#f1f1ed] rounded-[6px] border border-[#93969d]"
                      key={office.city}
                    >
                      <div className="relative overflow-hidden rounded-[6px]">
                        <Image
                          className="w-full h-full object-cover"
                          src={imgSrc}
                          width={typeof imgSrc === 'string' ? imgW : undefined}
                          height={typeof imgSrc === 'string' ? imgH : undefined}
                          alt={office.city}
                        />
                        <span
                          style={{
                            backdropFilter: 'blur(4px)',
                            boxShadow:
                              '0 0 10px 0 rgba(0, 0, 0, 0.8), inset 0 0 6px 0 rgba(255, 255, 255, 0.3)',
                            background: 'rgba(0, 0, 0, 0.1)',
                            padding: '10px',
                          }}
                          className={
                            textSize.headerH5 + ' rounded-[4px] absolute bottom-[10px] left-[10px] text-white'
                          }
                        >
                          {office.city}
                        </span>
                      </div>
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex items-center gap-[10px]">
                          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8 0C5.87904 0.00245748 3.84566 0.831051 2.34591 2.30402C0.846165 3.77699 0.00250718 5.77405 5.02122e-06 7.85714C-0.00194504 9.55935 0.564156 11.2153 1.61164 12.5714C1.61164 12.5714 1.82982 12.8536 1.86546 12.8943L8 20L14.1375 12.8907C14.1695 12.8529 14.3884 12.5714 14.3884 12.5714L14.3891 12.5693C15.4359 11.2136 16.0017 9.55854 16 7.85714C15.9975 5.77405 15.1538 3.77699 13.6541 2.30402C12.1543 0.831051 10.121 0.00245748 8 0ZM8 10.7143C7.42464 10.7143 6.86219 10.5467 6.3838 10.2328C5.9054 9.91882 5.53253 9.4726 5.31235 8.95052C5.09217 8.42845 5.03456 7.85397 5.14681 7.29974C5.25906 6.74551 5.53612 6.23642 5.94296 5.83684C6.34981 5.43726 6.86816 5.16514 7.43247 5.0549C7.99677 4.94466 8.58169 5.00124 9.11326 5.21749C9.64483 5.43374 10.0992 5.79994 10.4188 6.2698C10.7385 6.73965 10.9091 7.29205 10.9091 7.85714C10.9081 8.61461 10.6013 9.34079 10.056 9.8764C9.51062 10.412 8.77124 10.7133 8 10.7143Z"
                              fill="#93969D"
                            />
                          </svg>
                          <p className={textSize.textBasePost}>{office.address}</p>
                        </div>

                        {phoneList.map((phone) => (
                          <div className="flex items-center gap-[10px]" key={phone}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M3.21778 6.92444C4.49778 9.44 6.56 11.4933 9.07556 12.7822L11.0311 10.8267C11.2711 10.5867 11.6267 10.5067 11.9378 10.6133C12.9333 10.9422 14.0089 11.12 15.1111 11.12C15.6 11.12 16 11.52 16 12.0089V15.1111C16 15.6 15.6 16 15.1111 16C6.76444 16 0 9.23556 0 0.888889C0 0.4 0.4 0 0.888889 0H4C4.48889 0 4.88889 0.4 4.88889 0.888889C4.88889 2 5.06667 3.06667 5.39556 4.06222C5.49333 4.37333 5.42222 4.72 5.17333 4.96889L3.21778 6.92444Z"
                                fill="#93969D"
                              />
                            </svg>
                            <p className={textSize.textBasePost}>{phone}</p>
                          </div>
                        ))}

                        {office.email && (
                          <div className="flex items-center gap-[10px]">
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M20 12.25V1.75C20 0.781667 19.2122 0 18.2363 0H1.76367C0.787772 0 0 0.781667 0 1.75V12.25C0 13.2183 0.787772 14 1.76367 14H18.2363C19.2122 14 20 13.2183 20 12.25ZM18.4597 1.62167C18.8477 2.00667 18.6361 2.40333 18.4245 2.60167L13.6508 6.94167L18.2363 11.6783C18.3774 11.8417 18.4715 12.0983 18.3069 12.2733C18.154 12.46 17.8013 12.4483 17.6484 12.3317L12.5103 7.98L9.99412 10.255L7.48971 7.98L2.35156 12.3317C2.19871 12.4483 1.84597 12.46 1.69312 12.2733C1.52851 12.0983 1.62258 11.8417 1.76367 11.6783L6.34921 6.94167L1.57554 2.60167C1.3639 2.40333 1.15226 2.00667 1.54027 1.62167C1.92828 1.23667 2.32804 1.42333 2.65726 1.70333L9.99412 7.58333L17.3427 1.70333C17.672 1.42333 18.0717 1.23667 18.4597 1.62167Z"
                                fill="#93969D"
                              />
                            </svg>
                            <p className={textSize.textBasePost}>{office.email}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="hidden xl:block w-[250px] relative">
            <div className="sticky top-[104px] flex flex-col gap-[50px] overflow-y-auto pb-[60px] max-h-[calc(100vh-104px)]">
              <Button
                onClick={() => {
                  openDefaultModal('orderForm');
                }}
                label="Оформить заявку"
              />
            </div>
          </div>
        </div>
      </div>

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

          <div className="flex flex-col gap-[20px]">
            <div className="p-[40px] bg-[#f1f1ed] rounded-[8px] border border-[#93969d] flex justify-between m:flex-row flex-col-reverse gap-[30px] items-center">
              <div className="flex flex-col gap-[30px]">
                <span className={textSize.headerH3}>{data.connectSection.consultationTitle}</span>
                <div className={textSize.text3 + ' max-w-[660px]'}>
                  {processContent(data.connectSection.consultationText)}
                </div>

                <Button
                  onClick={() => {
                    openDefaultModal('orderForm');
                  }}
                  label={data.connectSection.consultationButtonLabel}
                />
              </div>
              <div className="w-[368px]">
                <Image
                  src={consultationImageSrc}
                  width={typeof consultationImageSrc === 'string' ? consultationW : undefined}
                  height={typeof consultationImageSrc === 'string' ? consultationH : undefined}
                  alt={data.connectSection.consultationImage?.alternativeText || 'Consultation'}
                />
              </div>
            </div>

            <div className="flex m:gap-[26px] gap-[20px] xl:flex-row flex-col">
              {(data.connectSection.featureCards || []).map((card) => (
                <div
                  key={card.title}
                  className="relative p-[40px] bg-[#f1f1ed] w-full rounded-[8px] border border-[#93969d] flex flex-col gap-[20px]"
                >
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
        <div className="flex flex-col gap-[50px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <span className={textSize.headerH2}>{data.requisitesSection.heading}</span>
              <a href={pdfHref} download rel="noopener noreferrer">
                <Button label={data.requisitesSection.downloadButtonLabel} />
              </a>
            </div>
            <div className={textSize.text3}>{processContent(data.requisitesSection.description)}</div>
          </div>

          <div className="p-[40px] bg-[#f1f1ed] rounded-[8px] border border-[#93969d] flex justify-between m:flex-row flex-col-reverse gap-[30px] items-center">
            <div className="flex flex-col gap-[16px]">
              <div className="flex m:items-center gap-[10px] m:flex-row flex-col">
                <span className={textSize.text1 + ' font-normal text-[#000]'}>Полное наименование:</span>
                <span className={textSize.text3}>{data.requisitesSection.legal.fullName}</span>
              </div>
              {data.requisitesSection.legal.legalAddress && (
                <div className="flex m:items-center gap-[10px] m:flex-row flex-col">
                  <span className={textSize.text1 + ' font-normal text-[#000]'}>Юридический адрес:</span>
                  <span className={textSize.text3}>{data.requisitesSection.legal.legalAddress}</span>
                </div>
              )}
              {data.requisitesSection.legal.inn && (
                <div className="flex m:items-center gap-[10px] m:flex-row flex-col">
                  <span className={textSize.text1 + ' font-normal text-[#000]'}>ИНН:</span>
                  <span className={textSize.text3}>{data.requisitesSection.legal.inn}</span>
                </div>
              )}
              {data.requisitesSection.legal.ogrn && (
                <div className="flex m:items-center gap-[10px] m:flex-row flex-col">
                  <span className={textSize.text1 + ' font-normal text-[#000]'}>ОГРН:</span>
                  <span className={textSize.text3}>{data.requisitesSection.legal.ogrn}</span>
                </div>
              )}
              {data.requisitesSection.legal.director && (
                <div className="flex m:items-center gap-[10px] m:flex-row flex-col">
                  <span className={textSize.text1 + ' font-normal text-[#000]'}>Генеральный директор:</span>
                  <span className={textSize.text3}>{data.requisitesSection.legal.director}</span>
                </div>
              )}
              {data.requisitesSection.legal.email && (
                <div className="flex m:items-center gap-[10px] m:flex-row flex-col">
                  <span className={textSize.text1 + ' font-normal text-[#000]'}>Почта:</span>
                  <span className={textSize.text3}>{data.requisitesSection.legal.email}</span>
                </div>
              )}
            </div>
            <div className="w-[368px]">
              <Image
                src={financeImageSrc}
                width={typeof financeImageSrc === 'string' ? financeW : undefined}
                height={typeof financeImageSrc === 'string' ? financeH : undefined}
                alt={data.requisitesSection.image?.alternativeText || 'FinanceIcon'}
              />
            </div>
          </div>
        </div>
      </ContactSpoiler>
    </div>
  );
};

export default ClientPage;

