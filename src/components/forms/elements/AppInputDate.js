import DatePicker from "react-multi-date-picker";
// import "react-multi-date-picker/styles/colors/teal.css";
import { ru } from "react-multi-date-picker";
import { useState } from "react";
import '@/assets/styles/blocks/vue-datapicker.scss'
import { useFormContext } from "react-hook-form";

const AppInputDate = ({ title, inputName, required }) => {
    const [date, setDate] = useState(null);
    const { register, formState: { errors } } = useFormContext();

    return (

        <label className='field'>


            {errors[inputName] && <ul className="error-list" >
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

            <span className="field__title">
                {title}
            </span>

        </label>
    );
};

export default AppInputDate;