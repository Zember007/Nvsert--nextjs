import Link from "next/link";
import AppValidationObserver from "./AppValidationObserver";
import AppInput from "./elements/AppInput";
import { useTranslation } from "react-i18next";
import AppTextarea from "./elements/AppTextarea";

const AppDefaultForm = ({ btnText }) => {

    const { t } = useTranslation()

    const onSubmit = () => { }
    return (
        <AppValidationObserver onSubmit={onSubmit}>
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

                    <div className="policy">
                        <label className="field-check">
                            <input className="field-check__input" type="checkbox" required />
                            <span className="field-check__name">
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