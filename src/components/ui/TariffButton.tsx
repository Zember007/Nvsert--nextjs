import { FC } from 'react';
import { useButton } from '@/hook/useButton';

type TariffButtonProps = {
    label?: string;
    wrapperClassName?: string;
    buttonClassName?: string;
};

const TariffButton: FC<TariffButtonProps> = ({
    label = 'Подробнее',
    wrapperClassName = 'skills-tariff-wrap tariff-wrap ',
    buttonClassName = 'slider__button group btnIconAn doc-btn tariff'
}) => {
    const { setButtonRef, setWrapperRef } = useButton();

    return (
        <div className={wrapperClassName} ref={setWrapperRef}>
            <button ref={setButtonRef} className={buttonClassName}>
                <span className="sendText">{label}</span>
                <span className="sendIconLeft">
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default TariffButton;


