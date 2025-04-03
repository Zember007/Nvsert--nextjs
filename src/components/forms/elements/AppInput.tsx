import React, { useEffect, useState } from 'react';
import { useFormContext } from "react-hook-form";

const AppInput = ({ title,disable,fail,message = true, inputName, type, required, autocomplete, mask, className, classNameTitle, onBlur }: { onBlur?:() => void ,disable?:boolean,fail?:boolean, message?:boolean, title: string, inputName: string, type?: string, required?: boolean, autocomplete?: string, mask?: string, className?: string, classNameTitle?: string }) => {
    const { register, formState: { errors, isSubmitted, submitCount }, setValue, clearErrors } = useFormContext();

    const formatPhoneNumber = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        let cleaned = value.replace(/\D/g, '');

        if (cleaned[0] === '8') {
            cleaned = '7' + cleaned.substring(1);
        } else if (cleaned.length > 0 && cleaned[0] !== '7') {
            cleaned = '7' + cleaned;
        }

        let formatted = cleaned.length > 0 ? '+7' : '';
        if (cleaned.length > 1) {
            formatted += ` (${cleaned.substring(1, 4)}`;
        }
        if (cleaned.length >= 5) {
            formatted += `) ${cleaned.substring(4, 7)}`;
        }
        if (cleaned.length >= 8) {
            formatted += `-${cleaned.substring(7, 9)}`;
        }
        if (cleaned.length >= 10) {
            formatted += `-${cleaned.substring(9, 11)}`;
        }

        e.currentTarget.value = formatted;
    };

    const changeInput = (value: React.FormEvent<HTMLInputElement>) => {
        if (mask === 'phone') {
            return formatPhoneNumber(value)
        }
        return value
    }

    const [visibleError, setVisibleError] = useState(false)

    useEffect(() => {
        setVisibleError(false)
        setTimeout(() => {
            setVisibleError(true)
            console.log('bounce');

        }, 30)
    }, [submitCount])



    useEffect(() => {
        setValue(inputName, '')
    }, [title])
    return (
        <div className={`relative z-[0] ${disable && 'active:scale-[0.95]'} transition-all duration-300 `}>
            <label className={`field ${disable && 'pointer-events-none'} ${visibleError && ((errors[inputName]  ) || fail) && isSubmitted && 'bounce'}`}>




                <input
                    {...register(inputName, {
                        required
                    })}
                    type={type}
                    className={`field__input ${className} ${(fail) && 'error !text-[red]'} `}
                    name={inputName}
                    placeholder={title}
                    autoComplete={autocomplete}
                    onInput={(e) => { changeInput(e) }}
                    onFocus={() => {clearErrors(inputName)}}
                    onBlur={(e) => {
                        if(onBlur) {
                            onBlur();
                        }
                        e.target.value = e.target.value+' '}}
                />
                <span className={`field__title ${(errors[inputName] ) && '!text-[#FF3030]'} ${classNameTitle}`}>
                    {title}
                </span>
                <span className={`field__title-top ${classNameTitle}`}>
                    {title}
                </span>
            </label>
            {/* {message && visibleError && isSubmitted && errors[inputName] && <ul className="error-list" >
                <li className={`error-item ${visibleError && 'bounce'}`}>
                    Заполните ФИО!
                </li>
            </ul>} */}
        </div>
    );
};

export default AppInput;