import Link from "next/link";
import AppValidationObserver from "./AppValidationObserver";
import AppInput from "./elements/AppInput";
import { useTranslation } from "react-i18next";
import AppTextarea from "./elements/AppTextarea";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHeaderContext } from "../contexts/HeaderContext";
import MessageImg from '@/assets/images/svg/message-flight.svg'
import Image from "next/image";
import { useEffect, useRef } from "react";

const AppMainForm = ({ btnText }: { btnText: string }) => {

    const { t } = useTranslation()
    const { openDefaultModal } = useHeaderContext()

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
                reset()
                openDefaultModal('successMessage')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const methods = useForm({ mode: "onTouched" });
    const { reset } = methods

    const buttonRefs = useRef<HTMLButtonElement[]>([]);
    const wrapperRefs = useRef<HTMLDivElement[]>([]);

    const setWrapperRef = (el: HTMLDivElement | null) => {
        if (!el) return
        wrapperRefs.current.push(el)
    }

    const setButtonRef = (el: HTMLButtonElement | null) => {
        if (!el) return
        buttonRefs.current.push(el)
    }

    useEffect(() => {
        const buttons = buttonRefs.current;
        const wrappers = wrapperRefs.current;

        if (!buttons.length || !wrappers.length) return;

        const handleMouseMove = (e: MouseEvent, element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const rotateX = (mouseY / rect.height) * 30 - 15;
            const rotateY = (mouseX / rect.width) * -30 + 15;
            element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            element.style.setProperty("--mouse-x", `${mouseX}px`);
            element.style.setProperty("--mouse-y", `${mouseY}px`);
        };


        const resetTransform = (element: HTMLElement) => {
            element.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        };

        buttons.forEach((button, index) => {
            const wrapper = wrappers[index];
            if (!button || !wrapper) return;

            wrapper.addEventListener('mousemove', (e) => handleMouseMove(e, button));
            wrapper.addEventListener('mouseleave', () => resetTransform(button));
            button.addEventListener('focus', () => button.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(10px)');
            button.addEventListener('blur', () => resetTransform(button));
        });

        return () => {
            buttons.forEach((button, index) => {
                const wrapper = wrappers[index];
                if (!button || !wrapper) return;

                wrapper.removeEventListener('mousemove', (e) => handleMouseMove(e, button));
                wrapper.removeEventListener('mouseleave', () => resetTransform(button));
                button.removeEventListener('focus', () => button.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(10px)');
                button.removeEventListener('blur', () => resetTransform(button));
            });
        };
    }, []);
    return (
        <AppValidationObserver methods={methods} onSubmit={onSubmit}>
            {({ register, errors }) => (

                <div className="flex flex-col s:gap-[10px] gap-[5px]">
                    <AppInput className="!bg-[#2a2a2a] focus:!bg-[#20272a]" title={t('form.input.titles.name')} inputName="name" required={true} />

                    <AppInput className="!bg-[#2a2a2a] focus:!bg-[#20272a]" title={t('form.input.titles.phone')} inputName="phone" mask="phone"
                        type="phone" required={true} />

                    <AppTextarea className="!bg-[#2a2a2a] focus:!bg-[#20272a]" title={'Комментарий'} inputName="comment" />
                    <div ref={setWrapperRef} className="tariff-wrap">
                        <button type="submit" ref={setButtonRef} className="tariff s:mt-[20px] mt-[15px] text-[14px] s:text-[20px] text-[#FFFFFF] font-bold border border-solid border-[#737373] flex items-center gap-[20px] justify-center p-[5px] rounded-[4px]">
                            {btnText}
                            <div className="translate-y-[5px]">
                                <Image alt="message" src={MessageImg} width="0"
                                    height="0"
                                    sizes="100vw"
                                    className="h-[30px] w-[30px] s:h-[40px] s:w-[40px]" />
                            </div>



                        </button>
                    </div>


                    <span className=" mt-[10px] text-[#A4A4A4] text-[10px] s:text-[13px]">
                        Согласен на обработку моих персональных данных в соответствии с <Link href="/soglashenie/polzovatelskoe-soglashenie/" target="_blank">Пользовательским соглашением</Link>
                    </span>

                </div>
            )}
        </AppValidationObserver>
    );
};

export default AppMainForm;