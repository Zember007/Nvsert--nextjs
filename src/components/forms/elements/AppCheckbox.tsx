import React, { ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface CustomCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    fail?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    checked,
    onChange,
    label = 'Custom Checkbox',
    fail
}) => {
    // Генерируем уникальный id один раз при создании компонента
    const uniqueId = React.useMemo(() => `custom-checkbox-${uuidv4()}`, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    return (
        <div className="flex items-center gap-[6px]">
            <input
                type="checkbox"
                id={uniqueId}
                checked={checked}
                onChange={handleChange}
                className="hidden peer"
            />
            <label
                htmlFor={uniqueId}
                className={`
                    group active:scale-[0.9] transition-all duration-300 active:!border-[#5F5F5F]
                    w-[20px] h-[20px] flex items-center justify-center border-[1.2px] border-[#5F5F5F] rounded-[1.8px]
                  peer-checked:border-[#34C759]
                  peer-checked:*:block
                  cursor-pointer ${fail && '!border-[#FF3030]'}`}

            >
                <span className="hidden group-active:block">
                    <svg className='group-active:*:fill-[#FFF] transition-all duration-300' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.30294 11.2728L5.75736 8.72718L4.0603 10.4242L8.30294 14.6669L15.9397 7.03013L14.2426 5.33307L8.30294 11.2728Z" fill="#34C759" />
                    </svg>
                </span>
            </label>
            <span className={`text-[#CCCCCC80] transition-all duration-300 peer-checked:text-[#FFF] ${fail && 'text-[#FF3030]'}`}>{label}</span>
        </div>
    );
};

export default CustomCheckbox;