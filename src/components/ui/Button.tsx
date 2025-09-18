import { FC } from 'react';
import { useButton } from '@/hook/useButton';

type TariffButtonProps = {
    label?: string;
    icon?: React.ReactNode;
    wrapperClassName?: string;
    buttonClassName?: string;
    onClick?: () => void;
};

const Button: FC<TariffButtonProps> = ({
    label = 'Подробнее',
    icon,
    wrapperClassName,
    buttonClassName,
    onClick,
}) => {
    const { setButtonRef, setWrapperRef } = useButton();

    return (
        <div className={`skills-tariff-wrap main-button-wrap tariff-wrap ${wrapperClassName}`} ref={setWrapperRef}>
            <button ref={setButtonRef} className={` main-button btnIconAn doc-btn tariff ${buttonClassName}`} onClick={onClick}>
                <span className="sendText">{label}</span>
                <span className="sendIconLeft">
                    {icon ?
                        icon :

                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="white" />
                        </svg>
                        }
                </span>
            </button>
        </div>
    );
};

export default Button;


