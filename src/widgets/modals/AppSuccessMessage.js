import { useTranslation } from "react-i18next";
import { useHeaderContext } from "shared/contexts";
import { useRouter } from "next/navigation";


const AppSuccessMessage = () => {
    const { setDefaultModalActive } = useHeaderContext()
    const { t } = useTranslation()

    const router = useRouter()

    const close = () => {
        setDefaultModalActive(false)
        router.push('/')
    }
    return (
        <div className="success-message__wrapper">
            <h3 className="success-message__title">
                {t('success.title')}
            </h3>

            <p className="success-message__subtitle">
                {t('success.subtitle')}
            </p>

            <button
                type="button"
                onClick={() => { close() }}
                className="btn btn--primary success-message__btn"
            >
                {t('success.btn')}
            </button>
        </div >
    );
};

export default AppSuccessMessage;