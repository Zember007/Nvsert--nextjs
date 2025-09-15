import React, { ChangeEvent } from 'react';

interface CustomCheckboxProps {
    focus?: boolean;
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    fail?: boolean;
    successful?: boolean;
    id: string;
    whiteBox?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    checked,
    onChange,
    label = 'Custom Checkbox',
    fail,
    successful,
    id,
    whiteBox,
    focus
}) => {
    // Генерируем уникальный id один раз при создании компонента

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    const labelRef = React.useRef<HTMLLabelElement>(null);

    return (
        <div className="flex items-center  gap-[4px] no-drag s:pl-[10px] pl-[7px]"
            onClick={(e) => {
                if (labelRef.current?.contains(e.target as Node)) return;
                onChange(!checked)
            }
            }>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={handleChange}
                className="hidden peer"
            />
            <label
                ref={labelRef}
                htmlFor={id}
                className={`
                    before:content-['']
                    before:absolute before:top-[-2.4px] before:left-[-2.4px] before:right-[-2.4px] before:bottom-[-2.4px]  before:z-[-1]
                    relative z-[0]
                   
                    group active:scale-[0.9] transition-all duration-100 active:!${whiteBox ? 'border-[#FFF]' : 'border-[#000]'}
                    w-[20px] h-[20px] flex items-center justify-center border-[1.2px] ${whiteBox ? 'border-[#FFF]' : 'border-[#000]'} rounded-[1.8px]
                  ${successful ? 'peer-checked:border-[#34C759]' : ''}
                 
                  peer-checked:*:block
                  cursor-pointer ${fail && '!border-[#FF3030]'}`}

            >
                {/*  ${!successful && focus && 'peer-checked:bg-[#21262F]'} */}
                <span className="hidden group-active:block">
                    <svg className={`group-active:*:fill-[#000] ${ !successful ? '*:fill-[#000]' : ''} transition-all duration-100`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.30294 11.2728L5.75736 8.72718L4.0603 10.4242L8.30294 14.6669L15.9397 7.03013L14.2426 5.33307L8.30294 11.2728Z" fill="#34C759" />
                    </svg>
                </span>
            </label>
            <span className={`peer-active:scale-[0.95] leading-[1.4] transition-all duration-100 peer-checked:text-[#000] s:text-[16px] text-[14px] ${whiteBox ? 'text-[#FFF]' : 'text-[#000]'} ${fail && '!text-[#FF3030]'}`}>{label}</span>
        </div>
    );
};

export default CustomCheckbox;