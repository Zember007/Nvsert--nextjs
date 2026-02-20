'use client';
import React from 'react';
import Image from 'next/image';
import IconAbout1 from '@/assets/images/about/1.svg';
import IconAbout2 from '@/assets/images/about/2.svg';
import IconAbout3 from '@/assets/images/about/3.svg';
import IconAbout4 from '@/assets/images/about/4.svg';
import IconAbout5 from '@/assets/images/about/5.svg';
import IconAbout6 from '@/assets/images/about/6.svg';
import textSize from '@/assets/styles/base/base.module.scss';
import { getStrapiImageApiPath } from '../../shared/lib/strapi-image';

interface GridBlockProps {
    block: string;
    index: number;
    processContent: (content: string) => React.ReactNode;
}

const svgIcons = [
    IconAbout1,
    IconAbout2,
    IconAbout3,
    IconAbout4,
    IconAbout5,
    IconAbout6
];

const GridBlock: React.FC<GridBlockProps> = ({ block, index, processContent }) => {
    // Проверяем, является ли блок изображением
    const imageMatch = block?.replace(/^#\s*/, '').match(/^!\[(.*?)\]\((.*?)\)/);

    // Обычная текстовая карточка
    const lines = block.split('\n').filter(line => line.trim());
    const title = lines[0]?.replace(/^#\s*/, '').trim() || '';
    const content = lines.slice(1).join('\n').trim();

    const cardClass = "xl:w-auto m:min-w-full min-w-[calc(100%-52px)] p-[20px] border border-[#93969D] rounded-[6px] flex flex-col relative justify-between items-end min-h-[300px]";

    if (imageMatch) {
        // Это изображение - рендерим как grid блок с изображением
        const alt = imageMatch[1];
        const rawPath = imageMatch[2];
        const src = /\/uploads\/?/.test(rawPath) || rawPath.startsWith('uploads') ? (getStrapiImageApiPath(rawPath) || rawPath) : rawPath;

        return (
            <div
                key={index}
                data-slider="slide-grid"
                className={`border border-[#93969D] rounded-[6px] relative overflow-hidden ${cardClass}`}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    unoptimized={typeof src === 'string' && src.startsWith('http')}
                />
            </div>
        );
    }

    return (
        <div
            key={index}
            data-slider="slide-grid"
            className={cardClass}
        >
            <div className="flex flex-col gap-[15px] w-full">
                <h3 className={`${textSize.headerH6} !font-normal`}>
                    {title}
                </h3>
                <div>
                    {processContent(content)}
                </div>
                <Image src={svgIcons[index % svgIcons.length]} alt={`Icon ${index + 1}`} className="absolute bottom-[20px] right-[20px]" unoptimized={true} />
            </div>
        </div>
    );
};

export default GridBlock;

