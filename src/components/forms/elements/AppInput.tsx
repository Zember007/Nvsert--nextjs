import React from 'react';
import { useFormContext } from "react-hook-form";

const AppInput = ({ title, inputName, type, required, autocomplete, mask, className, classNameTitle } : { title: string, inputName: string, type?: string, required?: boolean, autocomplete?: string, mask?: string, className?:string , classNameTitle?:string }) => {
    const { register, formState: { errors } } = useFormContext();

    const formatPhoneNumber = (e:React.FormEvent<HTMLInputElement>) => {
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

    const changeInput = (value:React.FormEvent<HTMLInputElement>) => {
        if (mask === 'phone') {
            return formatPhoneNumber(value)
        }
        return value
    }
    return (
        <label className='field'>

            {errors[inputName] && <ul className="error-list" >
                <li className="error-item">
                    Это поле обязательно
                </li>
            </ul>}


            <input
                {...register(inputName, { required })}
                type={type}
                className={`field__input ${className}`}
                name={inputName}
                placeholder={title}
                autoComplete={autocomplete}
                onInput={(e) => { changeInput(e) }}
            />
            <span className={`field__title ${classNameTitle}`}>
                {title}
            </span>
        </label>
    );
};

export default AppInput;