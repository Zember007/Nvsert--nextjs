import { useTranslation } from "react-i18next";
import AppValidationObserver from "./AppValidationObserver";
import AppInput from "./elements/AppInput";
import AppInputDate from "./elements/AppInputDate";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActionSessionId } from "@/store/session";
import AppInputFile from "./elements/AppInputFile";
import Link from "next/link";

const AppCalcFormInitial = ({ discount }) => {
    const { t } = useTranslation()
    const onSubmit = () => { }
    const dispatch = useDispatch()

    const [serverErrors, setServerErrors] = useState(null);
    const [formData, setFormData] = useState([]);
    const [salesUsed, setSalesUsed] = useState([]);
    const [companyHints, setCompanyHints] = useState([]);
    const [showCompanyHints, setShowCompanyHints] = useState(false);
    const [hintsTimeout, setHintsTimeout] = useState(null);

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

    function nextStep() {
        $nuxt.$emit('stepChange');
    }

    async function getCompanyHints (inputValue) {

        await $axios.$get('/api/order/companies', {
            params: {
                query: inputValue,
                count: 10
            },
        })
            .then((response) => {
                companyHints = response;                
                setShowCompanyHints(true)
            });
    }

    function inputListener() {
        $nuxt.$on('inputChange', (inputName, inputValue) => {
            formData.find((item) => item.name === inputName)
                ? (formData.find((item) => item.name === inputName).value =
                    inputValue)
                : formData.push({ name: inputName, value: inputValue });         

            if (inputName === 'company') {

                clearTimeout(hintsTimeout);

                if (inputValue.length >= 3) {

                    setHintsTimeout(setTimeout(function () {
                        getCompanyHints(inputValue);
                    }, 600))


                } else {
                    showCompanyHints = false;
                    companyHints.length = 0;
                }
            }
        });

    }

    return (
        < div >

            {fields.length && <>

                <AppValidationObserver onSubmit={onSubmit}>
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
                                    autocomplete="off" />
                                {sales[4] > 0 && <span className="discount" >+{sales[4]}%</span>}

                                <ul className={`cost-calc__dropdown ${showCompanyHints && companyHints.length > 0 && 'active'}`}>

                                    {/* <div className="cost-calc__hint"
                @click="$refs.companyInput.changeValue(`${hint.value} ${hint.city !== null ? ', ' + hint.city : ''}`); showCompanyHints = false;"
                v-for="hint in     companyHints    " :key="JSON.stringify(hint)">
                                {{ hint.value }}
                                <span v-if=" hint.city !== null ">, {{ hint.city }}</span>
                                <span v-if=" hint.inn !== null "> - ИНН: {{ hint.inn }}</span>
                            </div> */}

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
                                        <input className="field-check__input" required={true}  type="checkbox" />
                                        <span className="field-check__name">
                                            {t('privacy.btn.next')}
                                            <Link href="/soglashenie/polzovatelskoe-soglashenie/" target="_blank"> { t('privacy.btn.link') }
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