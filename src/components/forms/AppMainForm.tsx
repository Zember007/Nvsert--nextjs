// components/AppMainForm.jsx
'use client';

import Link from "next/link";
import AppValidationObserver from "./AppValidationObserver";
import AppInput from "./elements/AppInput";
import AppTextarea from "./elements/AppTextarea";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useButton } from "@/hook/useButton";
import { useEffect, useId, useRef, useState } from "react";
import AppCheckbox from './elements/AppCheckbox';
import { BounceEffect } from "@/hook/useBounce";
import FlightSuccess from "../modals/FlightSuccess";
import { useAnimation, motion } from "framer-motion";
import { filterPrepositions } from "@/hook/filter";


const AppMainForm = ({ btnText, bg = true, BounceWrapper, active, countTrigger }: { btnText: string; bg?: boolean; close?: () => void; BounceWrapper?: () => void; active?: boolean; countTrigger?: number }) => {
    const { setButtonRef, setWrapperRef } = useButton();

    const onSubmit = async (e: any) => {


        const formData = new FormData();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;

        if ((!emailRegex.test(e.contact.trim()) && isEmail) || (!phoneRegex.test(e.contact.trim()) && isPhone)) {
            setEmailError(true)
            return;
        } else {
            setEmailError(false)
        }



        for (const key in e) {
            if (e.hasOwnProperty(key)) {
                formData.append(key, e[key]);
            }
        }

        formData.append('email', contactData.email);
        formData.append('phone', contactData.phone);

        try {
            const response = await axios.post('/api/feedback', formData);
            if (response.status === 200 || 201) {
                reset();
                setIsPhone(false);
                setIsEmail(false);
                setContactData({
                    email: '',
                    phone: ''
                })
                successVisible()

            }
        } catch (error) {
            console.log(error);
        }
    };

    const successVisible = () => {

        BounceWrapper && BounceWrapper()
        animation()
        setSuccessMessageVisible(true)


    }

    const ids = useId()


    const validContact = (value: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;

        if ((!emailRegex.test(value.trim()) && isEmail) || (!phoneRegex.test(value.trim()) && isPhone)) {
            setEmailError(true)

            if (isEmail) {
                setContactData(prev => (
                    {
                        ...prev,
                        email: ''
                    }
                ))
            } else {
                setContactData(prev => (
                    {
                        ...prev,
                        phone: ''
                    }
                ))
            }
        } else {
            setEmailError(false)

            if (isEmail) {
                setContactData(prev => (
                    {
                        ...prev,
                        email: value.trim()
                    }
                ))
            } else {
                setContactData(prev => (
                    {
                        ...prev,
                        phone: value.trim()
                    }
                ))
            }
        }


    }

    const methods = useForm({
        mode: "onTouched", shouldFocusError: false,
        defaultValues: {
            name: '',
            comment: '',
            contact: ''
        }
    });

    const { reset, formState: { submitCount }, watch, clearErrors, setFocus } = methods;


    const contactValue = watch("contact") || "";

    const bounceCheckbox = () => {
        const myElement = document.getElementById(`bounce-checkbox${ids}`)
        if (myElement) {
            BounceEffect(myElement, {
                startPosition: "-50px",
                endPosition: `${5}px`,
                duration: 500,
                easing: "ease",
                direction: 'vertical',
                distanceCoficent: -1
            });



        }
    }

    useEffect(() => {
        if (!submitCount) return;

        if (!isEmail && !isPhone) {
            bounceCheckbox()
            setFailCheck(true)

        } else {
            setFailCheck(false)
            validContact(contactValue)


        }
    }, [submitCount])

    useEffect(() => {
        if (emailError && contactValue.length > 0) {
            setEmailError(false)
        }
    }, [contactValue])

    const [focusContact, setFocusContact] = useState(false)
    const [isPhone, setIsPhone] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [failCheck, setFailCheck] = useState(false);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const [contactData, setContactData] = useState({
        phone: '',
        email: ''
    });


    useEffect(() => {
        setFailCheck(false)

    }, [isPhone, isEmail])

    const controls = useAnimation();
    const defaultSettings = {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
        times: [0, 0.2, 0.5, 0.8, 1],
        openY: [-30, 0, -10, 0, 0],
    };

    const animation = () => {
        controls.start({
            y: defaultSettings.openY,
            transition: {
                duration: defaultSettings.duration,
                ease: defaultSettings.ease,
                times: defaultSettings.times
            }
        });
    }

    useEffect(() => {
        if (!active) return
        animation()
    }, [active, countTrigger])

    return (
        <motion.div
            animate={controls}
            initial={{ x: 0 }}
            className={`relative main-form h-[475px] s:h-[590px] border border-solid border-[#93969d]  ${bg ? 'bg-[#93969d26]  ' : ''} py-[30px] px-[20px] s:p-[40px] max-w-[320px] s:max-w-[400px] flex flex-col gap-[20px] rounded-[6px]`}>
            {successMessageVisible && <FlightSuccess closeIcon={bg} text="Спасибо за заявку" close={() => { setSuccessMessageVisible(false) }} />}


            <span className={` form__title  ${successMessageVisible && 'opacity-0'} `}>Оформить заявку</span>


            <div className={`${successMessageVisible && 'opacity-0'}`}>
                <AppValidationObserver methods={methods} onSubmit={onSubmit}>
                    {({ register, errors }) => (
                        <div className="flex flex-col gap-[20px]">
                            <AppInput
                                title={'ФИО'}
                                inputName="name"
                                required={true}
                            />
                            <div className="flex flex-col gap-[10px]">
                                <div
                                    onClick={() => {
                                        if (!isEmail && !isPhone) {
                                            bounceCheckbox()
                                            setFailCheck(true)
                                        } else {
                                            setFailCheck(false)

                                        }
                                        setEmailError(false)
                                    }}
                                    className="w-full relative z-[1]">
                                    <AppInput
                                        defaultValue={isEmail ? contactData.email : isPhone ? contactData.phone : ''}
                                        title={isPhone ? 'Телефон' : 'Email'}
                                        inputName="contact"
                                        className="!bg-[#C7CBD4]"
                                        mask={isPhone ? "phone" : ''}
                                        type={isPhone ? "tel" : 'text'}
                                        fail={emailError}
                                        required={true}
                                        message={false}
                                        disable={!isPhone && !isEmail}
                                        onFocus={() => { setFocusContact(true) }}
                                        onBlur={() => { setFocusContact(false); validContact(contactValue) }}
                                    />
                                </div>

                                <div id={`bounce-checkbox${ids}`} className="s:pl-[10px] pl-[7px] flex items-center s:gap-[30px] gap-[24px]"
                                    onClick={() => { clearErrors('contact') }}
                                >
                                    <AppCheckbox id={`check-phone${ids}`} successful={contactData.phone !== ''} focus={focusContact} fail={failCheck} checked={isPhone || contactData.phone !== ''}
                                        onChange={(value) => {
                                            setIsPhone(value || contactData.phone !== '');
                                            if (value || contactData.phone !== '') {
                                                setIsEmail(false);
                                                setFocus('contact');
                                            } else if (contactData.email !== '') {
                                                setIsEmail(true);
                                            }
                                        }} label="Телефон" />
                                    <AppCheckbox focus={focusContact} id={`check-email${ids}`} successful={contactData.email !== ''} fail={failCheck} checked={isEmail || contactData.email !== ''}
                                        onChange={(value) => {
                                            setIsEmail(value || contactData.email !== '');
                                            if (value || contactData.email !== '') {
                                                setIsPhone(false);
                                                setFocus('contact');

                                            } else if (contactData.phone !== '') {
                                                setIsPhone(true);
                                            }
                                            setFocus('contact');
                                        }} label="Email" />
                                </div>
                            </div>

                            <AppTextarea
                                title={'Комментарий'}
                                inputName="comment"
                            />

                            <div ref={setWrapperRef} className="tariff-wrap relative">
                                <button
                                    type="submit"
                                    ref={setButtonRef}
                                    className="form__button no-drag btnIconAn group tariff"
                                    style={{
                                        verticalAlign: 'middle'
                                    }}
                                >

                                    <span
                                        className="sendText"
                                    >{btnText}</span>

                                    <span className="sendIconLeft">
                                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 8.5V6.5H0V8.5H3ZM8.96767 0.5L7.52908 1.93076L12.1092 6.48713H6V8.51185H12.1092L7.52908 13.0682L8.96767 14.5L16 7.5L15.2822 6.78462L14.5634 6.06823L8.96767 0.5Z" fill="#fff" />
                                        </svg>
                                    </span>
                                </button>
                            </div>


                            <span className="form__desc">
                                {filterPrepositions('Нажимая на кнопку «Оформить заявку» вы соглашаетесь с ')}
                                <Link href="/soglashenie/polzovatelskoe-soglashenie/" className="no-drag" target="_blank">
                                    политикой конфиденциальности
                                </Link>
                            </span>
                        </div>
                    )
                    }
                </AppValidationObserver >
            </div>

        </motion.div>
    );
};

export default AppMainForm;