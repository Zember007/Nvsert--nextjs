import React from 'react';
import { useFormContext } from 'react-hook-form';

const AppTextarea = ({ title, inputName, required }) => {

    const { register, formState: { errors } } = useFormContext();
    return (
        <label className='field'>

            {errors[inputName] && <ul className="error-list" >
                <li className="error-item">
                    Это поле обязательно
                </li>
            </ul>}


            <textarea
                {...register(inputName, { required })}          
                className="field__textarea"
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