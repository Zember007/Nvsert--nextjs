'use client';

import React from 'react';
import { ContentBlock } from '@/store/navigation';
import { StrapiResponsiveImage } from '@/components/general/StrapiResponseImage';
import ServiceRichTextRenderer from '@/components/services/ServiceRichTextRenderer';

interface ServiceContentBlockProps {
    block: ContentBlock;
    isExpanded: boolean;
    onToggle: () => void;
    isFirst?: boolean;
    index?: number;
}


const ServiceContentBlock: React.FC<ServiceContentBlockProps> = ({
    block,
    isExpanded,
    onToggle,
    isFirst = false,
    index,
}) => {
    const { heading, richText, image } = block;

    if (!richText || !heading) {
        return null;
    }


    return (
        <div
            id={'block-' + index}
            className="w-full"
        >
            <div
                className="flex justify-center group items-center gap-[10px] pb-[10px] border-b border-[#93969d80] cursor-pointer line-after"
                onClick={onToggle}
            >
                <h2 className="header-h-4 -my-[0.6%] group-active:scale-[0.98] transition-all duration-100  group-hover:text-[#34446D] text-[#000] flex-1">
                    {heading}
                </h2>

                <svg
                    className={`transition-transform duration-100 group-hover:text-[#34446D] text-[#000] ${!isExpanded ? 'rotate-180' : ''}`}
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1.0459 1.0459L3.16722 3.16722M15.753 15.753L5.28854 5.28854" stroke="currentColor" strokeWidth="2" />
                    <path d="M15.7529 7.75293V14.4707L14.4717 15.7529H7.75293" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>

            {isExpanded && (
                <div className="pt-[30px]">
                    {/* <ServiceRichTextRenderer content={richText} /> */}
                </div>
            )}

            {image?.url}

            {image ? (
                <div className="max-w-full mx-auto mt-[50px] flex justify-center">
                    <StrapiResponsiveImage
                        image={image}
                        baseUrl={'https://test11.audiosector.ru/cp'}
                        priority={isFirst && isExpanded}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default ServiceContentBlock;


