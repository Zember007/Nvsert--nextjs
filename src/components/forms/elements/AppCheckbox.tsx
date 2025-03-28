import React, { ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

interface CustomCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    checked,
    onChange,
    label = 'Custom Checkbox'
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
                className="w-[20px] h-[20px] flex items-center justify-center border-[1.2px] border-[#5F5F5F] rounded-[1.8px]
                  peer-checked:border-[#34C759]
                  peer-checked:*:block
                  cursor-pointer transition-colors duration-200"
            >
                <span className="hidden">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.30294 11.2728L5.75736 8.72718L4.0603 10.4242L8.30294 14.6669L15.9397 7.03013L14.2426 5.33307L8.30294 11.2728Z" fill="#34C759" />
                    </svg>
                </span>
            </label>
            <span className='text-[#CCCCCC80]'>{label}</span>
        </div>
    );
};

export default CustomCheckbox;