// components/AppIntroForm.jsx
'use client';

import Link from "next/link";
import AppValidationObserver from "./AppValidationObserver";
import AppInput from "./elements/AppInput";
import { useForm } from "react-hook-form";
import Image from "next/image";
import ImgCall from '@/assets/images/order-call.png'
import ImgCallMob from '@/assets/images/order-call-mob.png'
import { useButton } from 'shared/hooks';
import { useEffect, useRef, useState, useCallback } from "react";
import FlightSuccess from "../modals/FlightSuccess";
import { useHeaderContext } from 'shared/contexts';
import { useAnimation, motion } from "framer-motion";
import { filterPrepositions } from 'shared/lib';
import { useTranslation } from "react-i18next";
import stylesBtn from '@/assets/styles/base/base.module.scss';
import textSize from '@/assets/styles/base/base.module.scss';
import formStyles from '@/assets/styles/base/base.module.scss';

const INTRO_ANIMATION_SETTINGS = {
    duration: 0.3,
    ease: [0.34, 1.56, 0.64, 1] as const,
    times: [0, 0.2, 0.5, 0.8, 1],
    openY: [-30, 0, -10, 0, 0],
};


const AppIntroForm = ({ close, BounceWrapper }: { close?: () => void; BounceWrapper?: () => void }) => {
    const { setButtonRef, setWrapperRef } = useButton();
    const { t } = useTranslation();

    const onSubmit = async (e: any) => {
        const phoneRegex = /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;
        if (!phoneRegex.test((e.Contact || '').trim())) {
            setContactError(true);
            return;
        }


        const formData = new FormData();


        for (const key in e) {
            if (e.hasOwnProperty(key)) {
                formData.append(key, e[key]);
            }
        }

        /* try {
            const response = await axios.post('/api/feedback', formData);
            if (response.status === 200 || 201) {
                reset();

                animation()
                BounceWrapper && BounceWrapper()
                setSuccessMessageVisible(true)

            }
        } catch (error) {
            console.log(error);
        } */

        reset();

        animation()
        BounceWrapper && BounceWrapper()
        setSuccessMessageVisible(true)
    };

    const methods = useForm({
        mode: "onTouched", shouldFocusError: false,
        defaultValues: {
            name: '',
            Contact: ''
        }
    });


    const { reset, watch } = methods;

    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const [focusContact, setFocusContact] = useState(false);

    const validContact = (value: string) => {
        const phoneRegex = /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;

        if ((!phoneRegex.test(value.trim()))) {
            setContactError(true)
        } else {
            setContactError(false)
        }
    }


    const [contactError, setContactError] = useState(false);
    const contactValue = watch("Contact") || "";
    const { defaultModalActive, defaultModalCount } = useHeaderContext();

    useEffect(() => {
        if (!contactError) return;
        // Скрываем ошибку только в процессе редактирования, а не сразу после blur
        if (focusContact) {
            setContactError(false);
        }
    }, [focusContact, contactValue, contactError]);

    const controls = useAnimation();

    const animation = useCallback(() => {
        controls.start({
            y: INTRO_ANIMATION_SETTINGS.openY,
            transition: {
                duration: INTRO_ANIMATION_SETTINGS.duration,
                ease: [0.34, 1.56, 0.64, 1] as const,
                times: INTRO_ANIMATION_SETTINGS.times
            }
        });
    }, [controls])

    useEffect(() => {
        if (!defaultModalActive) return
        animation()
    }, [defaultModalActive, defaultModalCount, animation])
    return (
        <motion.div
            animate={controls}
            initial={{ x: 0 }}
            className={`${formStyles['main-form']} s:h-[590px] h-[475px] border border-solid border-[#93969d] rounded-[6px] flex flex-col s:gap-[20px] s:justify-start justify-between py-[30px] px-[20px] s:p-[40px] relative`}>

            {successMessageVisible ? (
                <FlightSuccess
                    small={true}
                    closeIcon={false}
                    text={t("modals.flightSuccess.thankYou")}
                    close={() => { setSuccessMessageVisible(false) }}
                />
            ) : (
                <div className={`${successMessageVisible && 'opacity-0'} flex flex-col s:gap-[44px] gap-[20px]`}>
                    <span className={`${textSize.headerH3} text-black ${formStyles.form__title}`}>{t("navigation.order")}</span>

                    <div className="w-full s:h-[113px] h-[120px] overflow-hidden pointer-events-none rounded-[4px] border border-solid border-[#93969D]">
                        <Image className="w-full s:hidden" src={ImgCallMob} alt='order-call'></Image>
                        <Image className="w-full hidden s:block" src={ImgCall} alt='order-call'></Image>
                    </div>
                </div>

            )
            }




            <AppValidationObserver methods={methods} onSubmit={onSubmit}>
                {({ register, errors }) => (
                    <div className={`${successMessageVisible && 'opacity-0'} flex flex-col gap-[20px]`}>
                        <AppInput
                            title={t("form.input.titles.fullName")}
                            inputName="name"
                            required={true}
                        />

                        <AppInput
                            title={t("form.input.titles.phone")}
                            inputName="Contact"
                            mask={"phone"}
                            type={"tel"}
                            required={true}
                            fail={contactError && !focusContact}
                            onFocus={() => {
                                setFocusContact(true);
                                setContactError(false);
                            }}
                            onBlur={(value) => {
                                setFocusContact(false);
                                validContact(value);
                            }}
                        />



                        <div ref={setWrapperRef} className={`${stylesBtn.tariffWrap} relative s:mt-[24px]`}>
                            <button
                                type="submit"
                                ref={setButtonRef}
                                className={`${stylesBtn.btnIconAn} ${formStyles.form__button} no-drag group ${stylesBtn.tariff}`}
                            >

                                <span
                                    className={`${stylesBtn.sendText}`}
                                >{t("navigation.order")}</span>

                                <span className={`${stylesBtn.sendIconLeft}`}>
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="#fff" />
                                    </svg>
                                </span>
                            </button>
                        </div>


                        <span className={formStyles.form__desc}>
                            {t('form.policy.prefix', { button: t('form.buttons.submitApplication') })}{' '}
                            <Link href="#" className={`${stylesBtn.lineAfter} no-drag`} target="_blank">
                                {t('form.policy.privacyPolicy')}
                            </Link>
                        </span>
                    </div>
                )
                }
            </AppValidationObserver >

        </motion.div>
    );
};

export default AppIntroForm;