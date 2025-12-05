import DatePicker from "react-multi-date-picker";
// import "react-multi-date-picker/styles/colors/teal.css";
import { ru } from "react-multi-date-picker";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import formStyles from '@/assets/styles/base/base.module.scss';

const AppInputDate = ({ title, inputName, required }) => {
    const [date, setDate] = useState(null);
    const { register, formState: { errors } } = useFormContext();

    return (

        <label className={formStyles.field}>


            {errors[inputName] && <ul className={formStyles['error-list']} >
                <li className="error-item">
                    Это поле обязательно
                </li>
            </ul>}

            <DatePicker
                {...register(inputName, { required })}
                value={date}
                onChange={setDate}
                format="DD.MM.YYYY"
                placeholder={title}
                locale={ru}
                name={inputName}
                // inputClass="mx-input"
                // containerClassName="mx-datepicker"
            />

            <span className={formStyles['field__title']}>
                {title}
            </span>

        </label>
    );
};

export default AppInputDate;