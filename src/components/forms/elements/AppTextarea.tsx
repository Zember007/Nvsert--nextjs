import React from 'react';
import { useFormContext } from 'react-hook-form';

const AppTextarea = ({ title, inputName, required, className }:{ title:string, inputName:string, required?:boolean, className?:string }) => {

    const { register, formState: { errors, isSubmitted } } = useFormContext();
    return (
        <label className='field'>

            {isSubmitted && errors[inputName] && <ul className="error-list" >
                <li className="error-item">
                    Это поле обязательно
                </li>
            </ul>}


            <textarea
                {...register(inputName, { required })}          
                className={`field__textarea ${className}`}
                name={inputName}              
                placeholder={title}             
            ></textarea>
            <span className="field__title">
                { title }
            </span>
        </label>
    );
};

export default AppTextarea;