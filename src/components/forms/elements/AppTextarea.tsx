import ScrollableContainer from '@/components/general/ScrollableContainer';
import React, { useEffect, useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const AppTextarea = ({ title, inputName, required, className }: { title: string, inputName: string, required?: boolean, className?: string }) => {

    const { register, formState: { errors, isSubmitted, submitCount }, getValues } = useFormContext();

    const [visibleError, setVisibleError] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        setVisibleError(false)
        setTimeout(() => {
            setVisibleError(true)
        }, 50)
    }, [submitCount])
    const id = useId()

    const registerData = register(inputName, { required })

    return (
        <div className="relative no-drag">
            {isSubmitted && errors[inputName] && <ul className="error-list" >
                <li className={`error-item ${visibleError && 'bounce'}`}>
                    Это поле обязательно
                </li>
            </ul>}
            <label
                htmlFor={id}

                className={`field ${visibleError && isSubmitted && errors[inputName] && 'bounce'}`}>

                <ScrollableContainer smoothScrollFactor={0.1}>
                    <textarea
                        id={id}
                        {...registerData}
                        className={`field__textarea ${className}`}
                        name={inputName}
                        placeholder={title}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                            if (e.target.value) return

                            setIsFocused(false)
                        }}
                    ></textarea>
                </ScrollableContainer>

                <span className={`field__title-top ${isFocused ? 'focused' : ''}`}>
                    {title}
                </span>
            </label>
        </div>
    );
};

export default AppTextarea;