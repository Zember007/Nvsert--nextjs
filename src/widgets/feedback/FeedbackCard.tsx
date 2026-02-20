import React, { useState } from 'react';
import { FeedbackItem } from '@/types/feedback';
import Image from 'next/image';
import FeedbackList from './FeedbackList';
import { BASE_URL } from '../../shared/config/env';
import { getStrapiImageApiPath } from '../../shared/lib/strapi-image';
import { AsyncPhotoView } from '../../shared/common/AsyncPhotoView';

const FeedbackCard: React.FC<{ item: FeedbackItem }> = ({ item }) => {
    const img = item.photo?.url || item.photo?.formats?.thumbnail?.url || '';

    const [showServices, setShowServices] = useState<boolean>(false);

    return (

        <div
            onClick={() => setShowServices(!showServices)}
            className={`cursor-pointer  active:scale-[0.95] transition-all duration-100 flex gap-[16px] items-start xxs:flex-row flex-col p-[20px] border border-[#93969d] hover:border-[#34446D] bg-[#f5f5f2] hover:bg-[#34446d33] rounded-[10px] w-full`}>
            {!!img && (
                <div className="shrink-0 w-[190px] rounded-[6px] overflow-hidden border border-[#93969D] xxs:mx-0 mx-auto">
                    <AsyncPhotoView src={getStrapiImageApiPath(img) || img}>
                        <Image
                            src={getStrapiImageApiPath(img) || img}
                            alt={item.photo?.alternativeText || item.title}
                            className="w-full h-full object-contain"
                            width={190}
                            height={267}
                            sizes="190px"
                        />
                    </AsyncPhotoView>
                </div>
            )}
            <FeedbackList content={item.content?.body || ''} title={item.title || ''} showServices={showServices} setShowServices={setShowServices} />
        </div>

    );
};

export default FeedbackCard;