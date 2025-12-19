import React from 'react';
import { FeedbackItem } from '@/types/feedback';
import Image from 'next/image';
import FeedbackList from './FeedbackList';

const FeedbackCard: React.FC<{ item: FeedbackItem }> = ({ item }) => {
    const img = item.photo?.url || item.photo?.formats?.thumbnail?.url || '';
    
    return (

                <div className="cursor-pointer active:scale-[0.95] transition-all duration-100 flex gap-[16px] xxs:flex-row flex-col p-[20px] border border-[#93969d] hover:border-[#34446D] bg-[#f5f5f2] hover:bg-[#34446d33] rounded-[10px] w-full">
                    {!!img && (
                        <div className="shrink-0 w-[190px] rounded-[6px] overflow-hidden bg-[#fff] border border-[#93969D] xxs:mx-0 mx-auto">
                            {/* Using img to avoid Image domain config issues */}
                            <Image src={'' + img} alt={item.photo?.alternativeText || item.title} className="w-full h-full object-contain" width={190} height={267} />
                        </div>
                    )}
                    <FeedbackList content={item.content?.body || ''} title={item.title || ''} />
                </div>
     
    );
};

export default FeedbackCard;