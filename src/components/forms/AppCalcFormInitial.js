import { useTranslation } from "react-i18next";
import AppValidationObserver from "./AppValidationObserver";
import AppInput from "./elements/AppInput.tsx";
import AppInputDate from "./elements/AppInputDate";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActionSessionId } from "@/store/session";
import AppInputFile from "./elements/AppInputFile";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { nextStep, setDiscount } from "@/store/find_out_cost";

const AppCalcFormInitial = ({ discount }) => {
    const { t } = useTranslation()
    
    const onSubmit = (e) => {

        try {

            const formData = new FormData();
            for (const key in e) {
                if (e.hasOwnProperty(key)) {
                    formData.append(key, e[key]);
                }
            }
          
            formData.append('sessionid', sessionKey);
            const response = axios.post('/api/order/data', formData);
       
            if (response.status == 200 || 201) {                
                dispatch(nextStep())
            } else {
                response.errors ?? Object.keys(response.errors).length > 0
                    ? setServerErrors(response.errors)
                    : false;
            }


        } catch (error) {
            console.error(error);
        }
    }
    const dispatch = useDispatch()

    const [serverErrors, setServerErrors] = useState(null);
    const formData = []
    const [salesUsed, setSalesUsed] = useState([]);
    const [companyHints, setCompanyHints] = useState([]);
    const [showCompanyHints, setShowCompanyHints] = useState(false);

    useEffect(() => {
        dispatch(updateActionSessionId())
    }, [])

    const { session_id: sessionKey } = useSelector(state => state.session)

    const sales = useMemo(() => {
        return discount
            ? discount.map((discountItem) => discountItem.sale)
            : [];
    }, [discount]);

    const fields = useMemo(() => {
        return discount
            ? discount.map((discountItem) => discountItem.field)
            : [];
    }, [discount]);


    const salesUsedSum = useMemo(() => {
        return formData.reduce((prev, curr) => {
            if (curr.value !== '') {
                const discountVal =
                    discount?.find((item) => item.field === curr.name)?.sale || 0;

                return prev + discountVal;
            } else {
                return prev;
            }
        }, 0);
    }, [discount, formData]);

    useEffect(() => {
        dispatch(setDiscount(salesUsedSum))
    },[salesUsedSum])

    async function getCompanyHints(inputValue) {

        await axios.get('/api/order/companies', {
            params: {
                query: inputValue,
                count: 10
            },
        })
            .then((response) => {
                // setCompanyHints(response.data)
                // setShowCompanyHints(true)
            });
    }

    let hintsTimeout = null

    function inputListener(inputName, inputValue) {
        formData.find((item) => item.name === inputName)
            ? (formData.find((item) => item.name === inputName).value =
                inputValue)
            : formData.push({ name: inputName, value: inputValue });

        if (inputName === 'company') {

            clearTimeout(hintsTimeout);

            if (inputValue.length >= 3) {

                hintsTimeout = setTimeout(function () {
                    getCompanyHints(inputValue);
                }, 600)

            } else {
                setShowCompanyHints(false)
                companyHints.length = 0;
            }
        }
    }

    const methods = useForm({ mode: "onTouched" });

    const { watch, formState: { isDirty, dirtyFields } } = methods;

    const watchedValues = watch(); // Подписываемся на все изменения полей формы

    useEffect(() => {
        if (isDirty) {
            // Обходим все измененные поля, чтобы получить их имена и значения
            for (const fieldName in dirtyFields) {
                if (dirtyFields.hasOwnProperty(fieldName)) {
                    const fieldValue = watchedValues[fieldName];

                    inputListener(fieldName, fieldValue)
                }
            }
        }
    }, [isDirty, dirtyFields, watchedValues]);

    const companyInput = useRef(null)

    return (
        < div >

            {fields.length && <>

                <AppValidationObserver methods={methods} onSubmit={onSubmit}>
                    {({ register, errors }) => (
                        <>
                            <div className="cost-calc__group">
                                <AppInputDate inputName={fields[0]} title={t('calculation.form.placeholder.doc')} />
                                {sales[0] > 0 && <span className="discount">+{sales[0]}%</span>}
                            </div>

                            <div className="cost-calc__group">
                                <AppInput inputName={fields[1]} required={true} title={t('calculation.form.placeholder.name')} />
                                {sales[1] > 0 && <span className="discount">+{sales[1]}%</span>}
                            </div>

                            <div className="cost-calc__group">
                                <AppInput inputName={fields[2]} type='phone' mask='phone'
                                    title={t('calculation.form.placeholder.phone')} />
                                {sales[2] > 0 && <span className="discount">+{sales[2]}%</span>}
                            </div>

                            <div className="cost-calc__group">
                                <AppInput type='email' inputName={fields[3]} required={true}
                                    title={t('calculation.form.placeholder.mail')} />
                                {sales[3] > 0 && <span className="discount" >+{sales[3]}%</span>}
                            </div>

                            <div className="cost-calc__group">
                                <AppInput inputName={fields[4]} title={t('calculation.form.placeholder.company_name')}
                                    autocomplete="off" ref={companyInput} />
                                {sales[4] > 0 && <span className="discount" >+{sales[4]}%</span>}

                                <ul className={`cost-calc__dropdown ${showCompanyHints && companyHints.length > 0 && 'active'}`}>

                                    {companyHints.map((hint, index) =>
                                        <div className="cost-calc__hint"
                                            // onClick={() => { companyInput.current.value = `${hint.value} ${hint.city !== null ? ', ' + hint.city : ''}`; setShowCompanyHints(false); }}
                                            key={index}>
                                            {hint.value}
                                            <span v-if=" hint.city !== null ">, {hint.city}</span>
                                            <span v-if=" hint.inn !== null "> - ИНН: {hint.inn}</span>
                                        </div>)}

                                </ul>

                            </div>

                            <div className="cost-calc__group">
                                <AppInput inputName={fields[5]} title={t('calculation.form.placeholder.company_site')} />
                                {sales[5] > 0 && <span className="discount" >+{sales[5]}%</span>}
                            </div>

                            <div className="cost-calc__group">
                                <AppInput inputName={fields[6]} title={t('calculation.form.placeholder.company_city')} />
                                {sales[6] > 0 && <span className="discount">+{sales[6]}%</span>}
                            </div>

                            <div className="cost-calc__group">
                                <AppInputFile inputName={fields[7]} discount={sales[7]} />
                            </div>

                            <div className="form-bottom">
                                <button className="btn btn--primary btn--l" type="submit">
                                    {t('calculation.form.btn.next')}
                                </button>
                                <div className="policy">
                                    <label className="field-check">
                                        <input className="field-check__input" required={true} type="checkbox" />
                                        <span className="field-check__name">
                                            {t('privacy.btn.next')}
                                            <Link href="/soglashenie/polzovatelskoe-soglashenie/" target="_blank"> {t('privacy.btn.link')}
                                            </Link>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </>
                    )}
                </AppValidationObserver >
            </>}

        </div >
    );
};

export default AppCalcFormInitial;