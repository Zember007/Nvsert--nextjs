import React from 'react';
import { useButton } from 'shared/hooks';
import stylesBtn from '@/assets/styles/base/base.module.scss';

interface ServicesToggleButtonProps {
    isExpanded: boolean;
    onToggleAll: () => void;
    hover: boolean;
    setHover: React.Dispatch<React.SetStateAction<boolean>>;
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServicesToggleButton: React.FC<ServicesToggleButtonProps> = ({
    isExpanded,
    onToggleAll,
    hover,
    setHover,
    active,
    setActive,
}) => {
    const { setWrapperRef, setButtonRef } = useButton();

    return (
        <div ref={setWrapperRef} className={`${stylesBtn.tariffWrap} w-[250px]`}>
            <button
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onMouseDown={() => {
                    setActive(true);
                    setHover(true);
                }}
                onMouseUp={() => setActive(false)}
                onTouchStart={() => {
                    setHover(true);
                    setActive(true);
                }}
                onTouchEnd={() => {
                    setActive(false);
                    setHover(false);
                }}
                onClick={() => {
                    onToggleAll();
                    setActive(false);
                    setHover(false);
                }}
                ref={setButtonRef}
                className={`${stylesBtn.btnIconAn} ${stylesBtn.width_23} ${stylesBtn.tariff} bg-[#F5F5F2]   h-[50px] rounded-[4px] ${stylesBtn.btnText} border border-[#93969d] flex items-center justify-center`}
            >
                <span className={`${stylesBtn.sendText}`}>
                    {isExpanded ? 'Свернуть услуги' : 'Показать услуги'}
                </span>

                <span className={`${stylesBtn.sendIconLeft}`}>
                    <svg
                        className={`${isExpanded ? 'rotate-180' : ''} transition-all`}
                        width="23"
                        height="24"
                        viewBox="0 0 23 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_6557_2555)">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.1049 7.72888L17.1338 7.73442L17.1533 15.6286L17.155 16.6434L17.1567 17.6568L7.23434 17.6339L7.22952 15.6043L13.69 15.621L9.37014 11.3012L10.8018 9.86951L15.1217 14.1894L15.1049 7.72888Z"
                                fill="black"
                            />
                            <path
                                d="M7.2572 9.1715L8.67142 7.75728L6.5501 5.63596L5.13588 7.05018L7.2572 9.1715Z"
                                fill="black"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_6557_2555">
                                <rect
                                    width="16"
                                    height="16"
                                    fill="white"
                                    transform="translate(11.5 0.686523) rotate(45)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default ServicesToggleButton;


