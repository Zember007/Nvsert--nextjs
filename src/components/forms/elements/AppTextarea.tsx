import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const AppTextarea = ({ title, inputName, required, className }: { title: string, inputName: string, required?: boolean, className?: string }) => {

    const { register, formState: { errors, isSubmitted, submitCount } } = useFormContext();

      const [visibleError, setVisibleError] = useState(false)
    
        useEffect(() => {
            setVisibleError(false)
            setTimeout(() => {
                setVisibleError(true)
            }, 50)
        }, [submitCount])
    return (
        <div className="relative no-drag">
            {isSubmitted && errors[inputName] && <ul className="error-list" >
                <li className={`error-item ${visibleError && 'bounce'}`}>
                    Это поле обязательно
                </li>
            </ul>}
            <label className={`field ${visibleError && isSubmitted && errors[inputName] && 'bounce'}`}>




                <textarea
                    {...register(inputName, { required })}
                    className={`field__textarea ${className}`}
                    name={inputName}
                    placeholder={title}
                ></textarea>
                {/* <span className="field__title">
                    {title}
                </span> */}
                <span className={`field__title-top`}>
                    {title}
                </span>
            </label>
        </div>
    );
};

export default AppTextarea;