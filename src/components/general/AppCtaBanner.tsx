import React from 'react';
import { Button } from '@/shared/ui';
import textSize from '@/assets/styles/base/base.module.scss';

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
            <div className={`mx-auto text-center max-w-[700px] w-full xxs:min-h-[300px] bg-[rgba(52,68,109,0.2)] rounded-[8px] flex flex-col justify-center items-center gap-[16px] s:py-[40px] px-[14px] py-[20px] backdrop-blur-sm ${className}`}>
                <h3 className={`${textSize.headerH4} text-black max-w-[460px]`}>
                    {text}
                </h3>
                <p className={`${textSize.text3} text-[rgba(0,0,0,0.6)] ${descriptionClassName || 'max-w-[378px]'}`}>
                    {description}
                </p>
                <Button
                    wrapperClassName='xs:!w-[250px] xss:!w-[280px] !w-full'
                    onClick={onButtonClick}
                    label={buttonLabel}
                />
            </div>
        ) : <></>
    );
};

export default AppCtaBanner;
