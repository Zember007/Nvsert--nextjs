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
import { useEffect, useRef, useState } from "react";
import AppCheckbox from './elements/AppCheckbox';
import { BounceEffect } from "@/hook/useBounce";
import FlightSuccess from "../modals/FlightSuccess";
import { useAnimation, motion } from "framer-motion";


const AppMainForm = ({ btnText, bg = true, BounceWrapper, active, close }: { btnText: string; bg?: boolean; close?: () => void; BounceWrapper?: () => void; active?: boolean }) => {
    const { setButtonRef, setWrapperRef } = useButton();

    const onSubmit = async (e: any) => {


        const formData = new FormData();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;

        if ((!emailRegex.test(e.Contact.trim()) && isEmail) || (!phoneRegex.test(e.Contact.trim()) && isPhone)) {
            setEmailError(true)
            setEmailSuccessful(false)
            return;
        } else {
            setEmailError(false)
        }

        console.log(123123);


        for (const key in e) {
            if (e.hasOwnProperty(key)) {
                formData.append(key, e[key]);
            }
        }

        try {
            const response = await axios.post('/api/feedback', formData);
            if (response.status === 200 || 201) {
                reset();
                setIsPhone(false);
                setIsEmail(false);
                // openDefaultModal('successMessage');
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

    const ids = Date.now()

    const validContact = (value: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;

        if ((!emailRegex.test(value.trim()) && isEmail) || (!phoneRegex.test(value.trim()) && isPhone)) {
            setEmailError(true)
            setEmailSuccessful(false)

            return;
        } else {
            setEmailError(false)
            setEmailSuccessful(true)
        }
    }

    const methods = useForm({ mode: "onTouched", shouldFocusError: false });

    const { reset, formState: { submitCount }, watch, clearErrors, setFocus } = methods;

    const contactValue = watch("Contact") || "";

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

    const [isPhone, setIsPhone] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailSuccessful, setEmailSuccessful] = useState(false);
    const [failCheck, setFailCheck] = useState(false);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);

    useEffect(() => {
        setFailCheck(false)
    }, [isPhone, isEmail])

    const controls = useAnimation();
    const defaultSettings = {
        duration: 0.6,
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
                delay: 0.2,
                times: defaultSettings.times
            }
        });
    }

    useEffect(() => {
        if (!active) return
        animation()
    }, [active])

    return (
        <motion.div
            animate={controls}
            initial={{ x: 0 }}
            className={`relative main-form ${bg && 'bg-[#00000050] border-main'} py-[27px] pb-[30px] px-[48px] max-w-[420px] flex flex-col gap-[12px] rounded-[6px]`}>
            {successMessageVisible && <FlightSuccess text="Спасибо за заявку" close={() => { setSuccessMessageVisible(false) }} />}
            {!bg &&
                <button
                    onClick={() => { close && close() }}
                    className={`${successMessageVisible && 'opacity-0'} close !top-[15px] !right-[15px]`}>
                    <div className="in">
                        <div className="close-button-block after:!bg-[#A4A4A4] before:!bg-[#A4A4A4]"></div>
                        <div className="close-button-block after:!bg-[#A4A4A4] before:!bg-[#A4A4A4]"></div>
                    </div>
                    <div className="out">
                        <div className="close-button-block after:!bg-[#A4A4A4] before:!bg-[#A4A4A4]"></div>
                        <div className="close-button-block after:!bg-[#A4A4A4] before:!bg-[#A4A4A4]"></div>
                    </div>
                </button>}
            <span className={`leading-[1] text-[#FFF] text-[32px] ${bg ? 'text-center' : 'text-left'} tracking-[-0.03em] px-[8px]  ${successMessageVisible && 'opacity-0'}`}>Оформить заявку</span>
            <div className={`${successMessageVisible && 'opacity-0'}`}>
                <AppValidationObserver methods={methods} onSubmit={onSubmit}>
                    {({ register, errors }) => (
                        <div className="flex flex-col s:gap-[19px] gap-[5px]">
                            <AppInput
                                className="!bg-[#2a2a2a] focus:!bg-[#21262F]"
                                title={'ФИО'}
                                inputName="name"
                                required={true}
                            />
                            <div className="flex flex-col gap-[12px]">
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
                                        className="!bg-[#2a2a2a] focus:!bg-[#21262F]"
                                        title={isPhone ? 'Телефон' : isEmail ? 'Email' : ''}
                                        inputName="Contact"
                                        mask={isPhone ? "phone" : ''}
                                        type={isPhone ? "phone" : 'text'}
                                        fail={emailError}
                                        required={true}
                                        message={false}
                                        disable={!isPhone && !isEmail}
                                        onBlur={() => { validContact(contactValue) }}
                                    />
                                </div>
                                <div id={`bounce-checkbox${ids}`} className="pl-[10px] flex items-center gap-[30px]"
                                    onClick={() => { clearErrors('Contact') }}
                                >
                                    <AppCheckbox whiteBox={!bg} id={`check-phone${ids}`} successful={emailSuccessful} fail={failCheck} checked={isPhone} onChange={(value) => { setIsPhone(value); if (value) { setIsEmail(false); setFocus('Contact'); setEmailSuccessful(false) } }} label="Телефон" />
                                    <AppCheckbox whiteBox={!bg} id={`check-email${ids}`} successful={emailSuccessful} fail={failCheck} checked={isEmail} onChange={(value) => { setIsEmail(value); if (value) { setIsPhone(false); setFocus('Contact'); setEmailSuccessful(false) } }} label="Email" />
                                </div>
                            </div>

                            <AppTextarea
                                className="!bg-[#2a2a2a] focus:!bg-[#21262F]"
                                title={'Комментарий'}
                                inputName="comment"
                            />

                            <div ref={setWrapperRef} className="tariff-wrap relative">
                                <button
                                    type="submit"
                                    ref={setButtonRef}
                                    className=" btnIconAn group  tariff an-border s:mt-[1px] mt-[15px] bg-[#34446D] text-[14px] s:text-[20px] text-[#FFFFFF] font-bold border border-solid border-[transparent]   rounded-[4px]"
                                    style={{
                                        verticalAlign: 'middle'
                                    }}
                                >

                                    <div className="overflow-hidden p-[9px] px-[20px] relative flex items-center gap-[20px] justify-between">
                                        <div className="sendIconLeft transition-all ease-in">
                                            <Image
                                                alt="message"
                                                src={MessageImg}
                                                width="0"
                                                height="0"
                                                sizes="100vw"
                                                className="h-[30px] w-[30px] rotate-[45deg] translate-x-[-5px]"
                                            />
                                        </div>
                                        <span
                                            className="transition-all ease-in"
                                        >{btnText}</span>
                                        <div className="sendIconRight transition-all ease-in">
                                            <Image
                                                alt="message"
                                                src={MessageImg}
                                                width="0"
                                                height="0"
                                                sizes="100vw"
                                                className="h-[30px] w-[30px] rotate-[45deg] translate-x-[-5px]"
                                            />
                                        </div>
                                    </div>
                                </button>
                            </div>


                            <span className="mt-[1px] text-[#A4A4A4] text-[10px] s:text-[13px]">
                                Согласен на обработку моих персональных данных{' '}
                                <span className="whitespace-nowrap">в соответствии</span> с{' '}
                                <Link href="/soglashenie/polzovatelskoe-soglashenie/" target="_blank">
                                    Пользовательским соглашением
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