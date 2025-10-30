import React from 'react';
import Button from '@/components/ui/Button';

interface CtaBannerProps {
    text: string;
    description: string;
    onButtonClick: () => void;
    descriptionClassName?: string;
    buttonLabel?: string;
    className?: string;
}

const AppCtaBanner: React.FC<CtaBannerProps> = ({
    text,
    description,
    descriptionClassName = '',
    onButtonClick,
    buttonLabel = 'Связаться',
    className = ''
}) => {
    return (
         text && description ? (
            <div className={`mx-auto text-center max-w-[700px] w-full min-h-[300px] bg-[rgba(52,68,109,0.2)] rounded-[8px] flex flex-col justify-center items-center gap-[16px] s:p-[40px] p-[20px] backdrop-blur-sm ${className}`}>
                <h3 className="s:text-[24px] text-[20px] font-light tracking-[-0.04em] text-black max-w-[460px]">
                    {text}
                </h3>
                <p className={`s:text-[16px] text-[14px] font-light tracking-[-0.01em] text-[rgba(0,0,0,0.6)]  leading-[1.4] ${descriptionClassName || 'max-w-[378px]'}`}>
                    {description}
                </p>
                <Button
                    wrapperClassName='xs:!w-[250px] !w-full'
                    onClick={onButtonClick}
                    label={buttonLabel}
                />
            </div>
        ) : <></>
    );
};

export default AppCtaBanner;
