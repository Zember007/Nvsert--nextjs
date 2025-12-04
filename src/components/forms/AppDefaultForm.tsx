import Link from "next/link";
import AppValidationObserver from "./AppValidationObserver";
import AppInput from "./elements/AppInput";
import { useTranslation } from "react-i18next";
import AppTextarea from "./elements/AppTextarea";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHeaderContext } from "../contexts/HeaderContext";
import formStyles from '@/assets/styles/blocks/forms.module.scss';

const AppDefaultForm = ({ btnText }:{ btnText:string }) => {

    const { t } = useTranslation()
    const { openDefaultModal } = useHeaderContext()

    const onSubmit = async(e:any) => {
        const formData = new FormData();
        for (const key in e) {
            if (e.hasOwnProperty(key)) {
                formData.append(key, e[key]);
            }
        }

        try {

            const response = await axios.post('/api/feedback', formData);

            if (response.status == 200 || 201) {
                reset()
                openDefaultModal('successMessage')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const methods = useForm({ mode: "onTouched" });
    const { reset } = methods
    return (
        <AppValidationObserver methods={methods} onSubmit={onSubmit}>
            {({ register, errors }) => (

                <>
                    <AppInput title={t('form.input.titles.name')} inputName="name" required={true} />

                    <AppInput title={t('form.input.titles.phone')} inputName="phone" mask="phone"
                        type="phone" required={true} />

                    <AppInput title={t('form.input.titles.email')} inputName="email" type="email" />

                    <AppTextarea title={t('form.input.titles.question')} inputName="comment"
                        required={true} />

                    <button type="submit" className="btn btn--primary btn--l">
                        {btnText}
                    </button>

                    <div className={formStyles.policy}>
                        <label className={formStyles['field-check']}>
                            <input className={formStyles['field-check__input']} type="checkbox" required />
                            <span className={formStyles['field-check__name']}>
                                Нажимая на кнопку «Связаться» вы соглашаетесь с
                                <Link href="/soglashenie/polzovatelskoe-soglashenie/" target="_blank">
                                    политикой конфиденциальности
                                </Link>
                            </span>
                        </label>
                    </div>
                </>
            )}
        </AppValidationObserver>
    );
};

export default AppDefaultForm;