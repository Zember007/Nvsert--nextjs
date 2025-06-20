// components/AppMainForm.jsx
'use client';

import Link from "next/link";
import AppValidationObserver from "./AppValidationObserver";
import AppInput from "./elements/AppInput";
import AppTextarea from "./elements/AppTextarea";
import { useForm } from "react-hook-form";
import axios from "axios";
import MessageImg from '@/assets/images/svg/message-flight.svg';
import Image from "next/image";
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
            className={`relative main-form ${bg && 'bg-[#0000004d] border-main'} p-[20px] s:pb-[33px] s:pt-[38px] s:px-[40px] max-w-[320px] s:max-w-[400px] flex flex-col s:gap-[20px] gap-[15px] rounded-[6px]`}>
            {successMessageVisible && <FlightSuccess closeIcon={bg} text="Спасибо за заявку" close={() => { setSuccessMessageVisible(false) }} />}

            <div className="h-[16px] s:h-[23px]">
                <span className={`leading-[1] text-[#FFF] text-[24px] s:text-[32px] ${bg ? 'text-center linear-text' : 'text-left'} tracking-[-0.03em] s:px-[8px]  ${successMessageVisible && 'opacity-0'} `}>Оформить заявку</span>
            </div>

            <div className={`${successMessageVisible && 'opacity-0'}`}>
                <AppValidationObserver methods={methods} onSubmit={onSubmit}>
                    {({ register, errors }) => (
                        <div className="flex flex-col s:gap-[20px] gap-[15px]">
                            <AppInput
                                className={`${bg ? '!bg-[#00000026] focus:!bg-[#34446d33] !border-[#444] focus:!border-[#ffffff80]' : '!bg-[transparent] focus:!bg-[#21262F]'}  main__input `}
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
                                        className={`main__input ${bg ? '!bg-[#00000026] focus:!bg-[#34446d33] !border-[#444] focus:!border-[#ffffff80]' : '!bg-[transparent] focus:!bg-[#21262F]'}`}
                                        title={isPhone ? 'Телефон' : 'Email'}
                                        inputName="contact"
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

                                <div id={`bounce-checkbox${ids}`} className="pl-[10px] flex items-center gap-[30px]"
                                    onClick={() => { clearErrors('contact') }}
                                >
                                    <AppCheckbox whiteBox={!bg} id={`check-phone${ids}`} successful={contactData.phone !== ''} focus={focusContact} fail={failCheck} checked={isPhone || contactData.phone !== ''}
                                        onChange={(value) => {
                                            setIsPhone(value || contactData.phone !== '');
                                            if (value || contactData.phone !== '') {
                                                setIsEmail(false);
                                                setFocus('contact');

                                            } else if (contactData.email !== '') {
                                                setIsEmail(true);
                                            }
                                        }} label="Телефон" />
                                    <AppCheckbox focus={focusContact} whiteBox={!bg} id={`check-email${ids}`} successful={contactData.email !== ''} fail={failCheck} checked={isEmail || contactData.email !== ''}
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
                                className={`main__input ${bg ? '!bg-[#00000026] focus:!bg-[#34446d33] !border-[#444] focus:!border-[#ffffff80]' : '!bg-[transparent] focus:!bg-[#21262F]'}`}
                                title={'Комментарий'}
                                inputName="comment"
                            />

                            <div ref={setWrapperRef} className="tariff-wrap relative">
                                <button
                                    type="submit"
                                    ref={setButtonRef}
                                    className="form__button s:!h-[50px] !h-[40px] no-drag btnIconAn group tariff"
                                    style={{
                                        verticalAlign: 'middle'
                                    }}
                                >
                                    <span className="sendIconLeft">
                                        <Image
                                            alt="message"
                                            src={MessageImg}
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            className="h-[30px] w-[30px] rotate-[45deg] translate-x-[-5px]"
                                        />
                                    </span>
                                    <span
                                        className="sendText"
                                    >{btnText}</span>
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