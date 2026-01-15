'use client';

import * as React from 'react';
import { CollapseSection, AppCtaBanner, StrapiResponsiveImage } from 'widgets/layout';
import { SliderPost } from 'shared/ui';
import { useRichTextRenderer } from 'shared/lib';
import textSize from '@/assets/styles/base/base.module.scss';
import type { OkpdPageData } from '@/widgets/okpd/types';

type SliderBlock = {
  title: string;
  description: string;
};

const defaultSliderBlocks: SliderBlock[] = [
  {
    title: 'Сертификация и стандартизация',
    description: 'Код ОКПД 2 является основным идентификатором для определения того, какой именно документ требуется для подтверждения соответствия товара.',
  },
  {
    title: 'Государственная статистика',
    description: 'Используется для сбора, обработки и анализа данных об объёме и структуре производства, продаж и потребления в стране.',
  },
  {
    title: 'Госзакупки (44-ФЗ и 223-ФЗ)',
    description: 'Применяется для идентификации объекта закупки, составления документации и формирования идентификационного кода закупки.',
  },
  {
    title: 'Сертификация и стандартизация',
    description: 'Код ОКПД 2 является основным идентификатором для определения того, какой именно документ требуется для подтверждения соответствия товара.',
  },
  {
    title: 'Государственная статистика',
    description: 'Используется для сбора, обработки и анализа данных об объёме и структуре производства, продаж и потребления в стране.',
  },
  {
    title: 'Госзакупки (44-ФЗ и 223-ФЗ)',
    description: 'Применяется для идентификации объекта закупки, составления документации и формирования идентификационного кода закупки.',
  }
];


export function OkpdInfoSections({
  pageData,
  sectionsOpen,
  onToggleSection,
  onCtaClick,
}: {
  pageData: OkpdPageData | null;
  sectionsOpen: number[];
  onToggleSection: (id: number) => void;
  onCtaClick: () => void;
}) {
  const { processContent } = useRichTextRenderer();

  const renderSliderItem = React.useCallback(
    (block: SliderBlock, index: number) => {
      return (
        <div className="p-[20px] l:w-[300px] l:min-w-[300px] xxs:w-[280px] xxs:min-w-[280px] xss:w-[300px] xss:min-w-[300px] w-[280px] min-w-[280px] l:min-h-[350px] min-h-[270px] relative border border-[#93969D] bg-[#93969d26] rounded-[4px] flex flex-col justify-between">
          <span className={`text-[80px] font-light leading-[0.8] text-[#93969D] opacity-15 self-end`}>0{index + 1}</span>
          <div className="flex flex-col gap-[20px]">
            <span className={`${textSize.headerH6}`}>{block.title}</span>
            <p className={`${textSize.textBasePost}`}>{block.description}</p>
          </div>
        </div>
      );
    },
    []
  );

  const renderRichText = React.useCallback(
    (richText: string): React.ReactNode => {
      if (richText.includes('[slider]')) {
        const parts = richText.split('[slider]');
        return (
          <>
            {parts[0] && <div className="mb-[20px]">{renderRichText(parts[0])}</div>}
            <SliderPost items={defaultSliderBlocks} renderItem={renderSliderItem} />
            {parts[1] && <div>{renderRichText(parts[1])}</div>}
          </>
        );
      }
      return processContent(richText);
    },
    [processContent, renderSliderItem],
  );

  return (
    <>
      {pageData?.content?.map((block, index) => {
        return (
          <div key={block.id} id={`block-${block.id}`} className="w-full">
            
            <CollapseSection
              title={block.heading}
              isOpen={!sectionsOpen.includes(index + 1)}
              onToggle={() => onToggleSection(index + 1)}
            >
              {block.image?.url && index === 0 && (
                <div className="max-w-full mx-auto mb-[50px] mt-[30px] flex justify-center">
                  <StrapiResponsiveImage image={block.image} priority={true} baseUrl="" />
                </div>
              )}
              <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                {renderRichText(block.richText.replace('[start_img]', ''))}
              </div>
            </CollapseSection>

            {block.image?.url && index !== 0 && (
              <div className="max-w-full mx-auto mt-[50px] flex justify-center">
                <StrapiResponsiveImage image={block.image} baseUrl="" />
              </div>
            )}
          </div>
        );
      })}

      {pageData?.cta && (
        <AppCtaBanner
          text={pageData.cta.text || ''}
          descriptionClassName="max-w-full"
          description={pageData.cta.description || ''}
          onButtonClick={onCtaClick}
        />
      )}
    </>
  );
}


