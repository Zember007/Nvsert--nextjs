'use client';
import React from 'react';
import { useRichTextRenderer } from 'shared/lib';
import { useHeaderContext } from 'shared/contexts';
import { AppCtaBanner, CollapseSection } from 'widgets/layout';
import { PrivacyPolicyData } from './page';
import { useTranslation } from 'react-i18next';

interface PrivacyPolicyClientProps {
    pageData: PrivacyPolicyData | null;
}

const PrivacyPolicyClient: React.FC<PrivacyPolicyClientProps> = ({ pageData }) => {
    const [sectionsOpen, setSectionsOpen] = React.useState<number[]>([]);
    const { processContent } = useRichTextRenderer();
    const { openDefaultModal } = useHeaderContext();
    const { t } = useTranslation();

    const toggleSection = (id: number) => {
        setSectionsOpen(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    if (!pageData) {
        return (
            <div className="w-full text-center py-[50px]">
                <span className="text-[16px] text-gray-500">{t('common.dataNotFound')}</span>
            </div>
        );
    }

    return (
        <>
            {pageData.content?.map((block, index) => {
                if (!block.heading) {
                    return (
                        <div key={block.id ?? index} className="w-full">
                            <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                                {processContent(block.richText ?? '')}
                            </div>
                        </div>
                    );
                }

                return (
                    <div key={block.id ?? index} id={`block-${index}`} className="w-full">
                        <CollapseSection
                            title={block.heading}
                            isOpen={!sectionsOpen.includes(index)}
                            onToggle={() => toggleSection(index)}
                        >
                            <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                                {processContent(block.richText ?? '')}
                            </div>
                        </CollapseSection>
                    </div>
                );
            })}

            <AppCtaBanner
                text={pageData.cta?.text || ''}
                descriptionClassName="max-w-full"
                description={pageData.cta?.description || ''}
                onButtonClick={() => openDefaultModal('introForm')}
            />
        </>
    );
};

export default PrivacyPolicyClient;
