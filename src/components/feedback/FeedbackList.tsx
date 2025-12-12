import { useRichTextRenderer } from '@/hook/useRichTextRenderer';
import { useId, useState } from 'react';
import textSize from '@/assets/styles/base/base.module.scss';
import stylesBtn from '@/assets/styles/base/base.module.scss';

const FeedbackList = ({ content, title }: { content: string, title: string }) => {

    const { processContent } = useRichTextRenderer();
    const [showServices, setShowServices] = useState<boolean>(false);

    const clip0_4632_2058 = useId()
    return (
        <div className="flex-1 flex flex-col gap-[20px]">
            <h6 className={`${textSize.headerH6} !font-normal`}>{title}</h6>
            {content && (
                <>
                    <div>
                        {processContent(content.split('\n')[0])}

                        <div className={`${showServices ? 'block' : 'hidden'}`}>
                            {processContent(content.split('\n').slice(1).join('\n'))}
                        </div>
                    </div>

                    <button
                        className={`${textSize.text2} font-normal text-[#34446D] flex pt-[15px] pl-auto grow justify-end !items-end ${stylesBtn.lineAfterBox} ${stylesBtn.btnIconAn} !gap-[5px]`}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setShowServices(!showServices)
                        }}
                    >
                        <span className={`${stylesBtn.lineAfter} !leading-[1.2] whitespace-nowrap`}>{!showServices ? 'Показать отзыв' : 'Свернуть отзыв'}</span>

                        <svg
                            className={`${stylesBtn.sendIconLeft} transition-all duration-100 ${showServices ? 'rotate-[180deg]' : ''}`}
                            width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath={`url(#${clip0_4632_2058})`}>
                                <path d="M7 3.5H9V0.5H7L7 3.5ZM15 9.46767L13.5692 8.02908L9.01287 12.6092V6.5H6.98815V12.6092L2.43177 8.02908L1 9.46767L8 16.5L8.71538 15.7822L9.43177 15.0634L15 9.46767Z" fill="#34446D" />
                            </g>
                            <defs>
                                <clipPath id={clip0_4632_2058}>
                                    <rect width="16" height="16" fill="white" transform="matrix(0 1 -1 0 16 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </button>
                </>
            )}


        </div>
    );
};

export default FeedbackList;