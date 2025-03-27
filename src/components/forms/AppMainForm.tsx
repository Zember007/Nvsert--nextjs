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
import '@/assets/styles/sections/main/animation/form.scss';
import GUI from 'lil-gui'
import { useEffect, useRef } from "react";


const AppMainForm = ({ btnText }: { btnText: string }) => {
    const { t } = useTranslation();
    const { openDefaultModal } = useHeaderContext();
    const { setButtonRef, setWrapperRef } = useButton();
    const guiRef = useRef<GUI | null>(null);

    const onSubmit = async (e: any) => {
        const formData = new FormData();
        for (const key in e) {
            if (e.hasOwnProperty(key)) {
                formData.append(key, e[key]);
            }
        }

        try {
            const response = await axios.post('/api/feedback', formData);
            if (response.status === 200 || 201) {
                reset();
                openDefaultModal('successMessage');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const methods = useForm({ mode: "onTouched", shouldFocusError: false });
    const { reset } = methods;

    useEffect(() => {
        const settings = {
            color: '#0000ff'
        }
        const gui = new GUI();
        gui.addColor(settings, 'color').name('Цвет текста').onChange((value: any) => {
            const el = document.querySelector('.shiny-cta') as HTMLElement | null
            if (!el) return
            el.style.setProperty('--shiny-cta-highlight', value);
        });

        guiRef.current = gui;
        return () => {
            if (guiRef.current) {
                guiRef.current.destroy(); // Уничтожаем GUI
                guiRef.current = null;
            }
        };
    }, [])



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

                    <AppInput
                        className="!bg-[#2a2a2a] focus:!bg-[#21262F]"
                        title={'Телефон'}
                        inputName="phone"
                        mask="phone"
                        type="phone"
                        required={true}
                    />

                    <AppTextarea
                        className="!bg-[#2a2a2a] focus:!bg-[#21262F]"
                        title={'Комментарий'}
                        inputName="comment"
                    />

                    <div ref={setWrapperRef} className="tariff-wrap relative">
                        <button
                            type="submit"
                            ref={setButtonRef}
                            className="shiny-cta group tariff s:mt-[1px] mt-[15px] text-[14px] s:text-[20px] text-[#FFFFFF] font-bold border border-solid border-[#737373] flex items-center gap-[10px] justify-center p-[9px] rounded-[4px]"
                            style={{
                                verticalAlign: 'middle'
                            }}
                        >
                            <div className="absolute z-[1] top-[1px] right-[1px] left-[1px] bottom-[1px] group-active:shadow-[inset_2px_2px_4px_0_#34446D,inset_-2px_-2px_4px_0_#34446D]"></div>
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