'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FeedbackItem } from '@/types/feedback';
import Image from 'next/image';
import FeedbackList from './FeedbackList';
import { getStrapiImageApiPath } from '../../shared/lib/strapi-image';

const IMG_WIDTH = 190;
const IMG_HEIGHT = 267;

/** Плейсхолдер той же высоты, чтобы контент не скакал; изображение подгружается при появлении в viewport */
function LazyFeedbackImage({
    src,
    alt,
    photoIndex,
    onPhotoClick,
}: {
    src: string;
    alt: string;
    photoIndex?: number;
    onPhotoClick?: (index: number) => void;
}) {
    const [inView, setInView] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = boxRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (e?.isIntersecting) setInView(true);
            },
            { rootMargin: '100px', threshold: 0 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={boxRef}
            role={onPhotoClick && photoIndex !== undefined ? 'button' : undefined}
            tabIndex={onPhotoClick && photoIndex !== undefined ? 0 : undefined}
            onClick={onPhotoClick && photoIndex !== undefined ? (e) => { e.stopPropagation(); onPhotoClick(photoIndex); } : undefined}
            className={`relative shrink-0 w-[190px] h-[267px] min-h-[267px] rounded-[6px] overflow-hidden border border-[#93969D] xxs:mx-0 mx-auto bg-[#e8e8e6] ${onPhotoClick && photoIndex !== undefined ? 'cursor-zoom-in' : ''}`}
            style={{ width: IMG_WIDTH, height: IMG_HEIGHT, minHeight: IMG_HEIGHT }}
        >
            {inView ? (
                <Image
                    src={src}
                    alt={alt}
                    className="w-full h-full object-contain"
                    width={IMG_WIDTH}
                    height={IMG_HEIGHT}
                    sizes="190px"
                    loading="lazy"
                />
            ) : null}
        </div>
    );
}

const FeedbackCard: React.FC<{ item: FeedbackItem; photoIndex?: number; onPhotoClick?: (index: number) => void }> = ({ item, photoIndex, onPhotoClick }) => {
    const img = item.photo?.url || item.photo?.formats?.thumbnail?.url || '';

    const [showServices, setShowServices] = useState<boolean>(false);

    return (
        <div
            onClick={() => setShowServices(!showServices)}
            className={`cursor-pointer active:scale-[0.95] transition-all duration-100 flex gap-[16px] items-start xxs:flex-row flex-col p-[20px] border border-[#93969d] hover:border-[#34446D] bg-[#f5f5f2] hover:bg-[#34446d33] rounded-[10px] w-full`}
        >
            {!!img ? (
                <LazyFeedbackImage
                    src={getStrapiImageApiPath(img) || img}
                    alt={item.photo?.alternativeText || item.title}
                    photoIndex={photoIndex}
                    onPhotoClick={onPhotoClick}
                />
            ) : null}
            <FeedbackList
                content={item.content?.body || ''}
                title={item.title || ''}
                showServices={showServices}
                setShowServices={setShowServices}
            />
        </div>
    );
};

export default FeedbackCard;