'use client';

import * as React from 'react';
import { CollapseSection, AppCtaBanner, StrapiResponsiveImage } from 'widgets/layout';
import { Slider } from 'widgets/about';
import { useRichTextRenderer } from 'shared/lib';
import type { OkpdPageData } from '@/widgets/okpd/types';

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

  const renderRichText = React.useCallback(
    (richText: string): React.ReactNode => {
      if (richText.includes('[slider]')) {
        const parts = richText.split('[slider]');
        return (
          <>
            {parts[0] && <div className="mb-[20px]">{renderRichText(parts[0])}</div>}
            <Slider />
            {parts[1] && <div>{renderRichText(parts[1])}</div>}
          </>
        );
      }
      return processContent(richText);
    },
    [processContent],
  );

  return (
    <>
      {pageData?.content?.map((block, index) => {
        return (
          <div key={block.id} id={`block-${index + 1}`} className="w-full">
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


