import React from 'react';
import ServicesToggleButton from 'widgets/services/ServicesToggleButton';
import styles from '@/assets/styles/base/text-size.module.scss';

interface ServicesHeaderProps {
    title: string;
    isExpanded: boolean;
    onToggleAll: () => void;
    hover: boolean;
    setHover: React.Dispatch<React.SetStateAction<boolean>>;
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServicesHeader: React.FC<ServicesHeaderProps> = ({
    title,
    isExpanded,
    onToggleAll,
    hover,
    setHover,
    active,
    setActive,
}) => {
    return (
        <div className="flex m:justify-between justify-center items-center m:items-start wrapper overflow-hidden gap-[20px] m:flex-row flex-col pt-[50px] pb-[16px]">
            <div className="flex flex-col gap-[15px] m:items-start items-center text-center m:text-left">
                <h1 className=" -translate-x-[4px] translate-y-[1px]">
                    {title}
                </h1>
                <p className={styles.headerH4}>
                    Наша компания предоставляет широкий спектр услуг
                </p>
            </div>

            <ServicesToggleButton
                isExpanded={isExpanded}
                onToggleAll={onToggleAll}
                hover={hover}
                setHover={setHover}
                active={active}
                setActive={setActive}
            />
        </div>
    );
};

export default ServicesHeader;


