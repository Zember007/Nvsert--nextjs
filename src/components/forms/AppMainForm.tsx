// components/AppMainForm.jsx
'use client';

import Link from "next/link";
import AppValidationObserver from "./AppValidationObserver";
import AppInput from "./elements/AppInput";
import { useTranslation } from "react-i18next";
import AppTextarea from "./elements/AppTextarea";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHeaderContext } from "../contexts/HeaderContext";
import MessageImg from '@/assets/images/svg/message-flight.svg';
import Image from "next/image";
import { useButton } from "@/hook/useButton";
import { useEffect, useRef, useState } from "react";
import AppCheckbox from './elements/AppCheckbox';
import { BounceEffect } from "@/hook/useBounce";


const AppMainForm = ({ btnText }: { btnText: string }) => {
    const { t } = useTranslation();
    const { openDefaultModal } = useHeaderContext();
    const { setButtonRef, setWrapperRef } = useButton();

    const onSubmit = async (e: any) => {

        console.log(e);


        const formData = new FormData();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(e.Contact) && isEmail) {
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

        try {
            const response = await axios.post('/api/feedback', formData);
            if (response.status === 200 || 201) {
                reset();
                setIsPhone(false);
                setIsEmail(false);
                openDefaultModal('successMessage');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const methods = useForm({ mode: "onTouched", shouldFocusError: false });
    const { reset } = methods;

    const [isPhone, setIsPhone] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [failCheck, setFailCheck] = useState(false);

    useEffect(() => {
        setFailCheck(false)
    }, [isPhone, isEmail])

    return (
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
                                    const myElement = document.getElementById('bounce-checkbox')
                                    if (myElement) {
                                        BounceEffect(myElement, {
                                            startPosition: "0",
                                            endPosition: `${5}px`,
                                            duration: 200,
                                            easing: "ease-in",
                                        });

                                    }
                                    setFailCheck(true)
                                } else {
                                    setFailCheck(false)

                                }
                            }}
                            className="w-full">
                            <AppInput
                                className="!bg-[#2a2a2a] focus:!bg-[#21262F]"
                                title={isPhone ? 'Телефон' : isEmail ? 'Email' : ''}
                                inputName="Contact"
                                mask={isPhone ? "phone" : ''}
                                type={isPhone ? "phone" : isEmail ? 'text' : ''}
                                fail={emailError}
                                required={true}
                                message={false}
                                disable={!isPhone && !isEmail}
                            />
                        </div>
                        <div id='bounce-checkbox' className="pl-[10px] flex items-center gap-[30px]">
                            <AppCheckbox fail={failCheck} checked={isEmail} onChange={(value) => { setIsEmail(value); if (value) { setIsPhone(false) } }} label="Email" />
                            <AppCheckbox fail={failCheck} checked={isPhone} onChange={(value) => { setIsPhone(value); if (value) { setIsEmail(false) } }} label="Телефон" />
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
                            className=" group tariff s:mt-[1px] mt-[15px] bg-[#34446D] text-[14px] s:text-[20px] text-[#FFFFFF] font-bold border border-solid border-[#737373] flex items-center gap-[10px] justify-center p-[9px] rounded-[4px]"
                            style={{
                                verticalAlign: 'middle'
                            }}
                            onClick={() => {
                                if (!isEmail && !isPhone) {
                                    const myElement = document.getElementById('bounce-checkbox')
                                    if (myElement) {
                                        BounceEffect(myElement, {
                                            startPosition: "0",
                                            endPosition: `${5}px`,
                                            duration: 200,
                                            easing: "ease-in",
                                        });

                                    }
                                    setFailCheck(true)
                                } else {
                                    setFailCheck(false)

                                }
                            }}
                        >
                            {btnText}
                            <Image
                                alt="message"
                                src={MessageImg}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="h-[30px] w-[30px]"
                            />
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
    );
};

export default AppMainForm;