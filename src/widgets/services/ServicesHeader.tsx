import React from 'react';
import ServicesToggleButton from 'widgets/services/ServicesToggleButton';

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
        <div className="flex items-center m:justify-between justify-center wrapper overflow-hidden gap-[20px] m:flex-row flex-col pt-[50px] pb-[50px]">
            <h1 className="text-center -translate-x-[4px] translate-y-[1px]">
                {title}
            </h1>

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


