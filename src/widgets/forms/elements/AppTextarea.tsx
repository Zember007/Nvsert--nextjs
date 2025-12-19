import { ScrollableContainer } from 'widgets/layout';
import React, { useEffect, useId, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import formStyles from '@/assets/styles/base/base.module.scss';

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
            {isSubmitted && errors[inputName] && <ul className={formStyles['error-list']} >
                <li className={`error-item ${visibleError ? formStyles.bounce : ''}`}>
                    Это поле обязательно
                </li>
            </ul>}
            <label
                htmlFor={id}

                className={`${formStyles.field} ${visibleError && isSubmitted && errors[inputName] ? formStyles.bounce : ''}`}>

                <ScrollableContainer smoothScrollFactor={0.1} priorityScroll={true}>
                    <textarea
                        id={id}
                        {...registerData}
                        className={`${formStyles['field__textarea']} ${className || ''}`}
                        name={inputName}
                        placeholder={title}
                        onFocus={() => setIsFocused(true)}
                        onBlur={(e) => {
                            if (e.target.value) return

                            setIsFocused(false)
                        }}
                    ></textarea>
                </ScrollableContainer>

                <span className={`${formStyles['field__title']} ${formStyles['textarea-title']} ${isFocused ? formStyles.focused : ''}`}>
                    {title}
                </span>

                <span className={`${formStyles['field__title-top']} ${formStyles['textarea-title']} ${isFocused ? formStyles.focused : ''}`}>
                    {title}
                </span>
            </label>
        </div>
    );
};

export default AppTextarea;