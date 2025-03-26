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
import { useButton } from "@/hook/useButton";
import '@/assets/styles/sections/main/animation/form.scss'

const AppMainForm = ({ btnText }: { btnText: string }) => {

    const { t } = useTranslation()
    const { openDefaultModal } = useHeaderContext()
    const { setButtonRef, setWrapperRef } = useButton()

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

    const methods = useForm({ mode: "onTouched", shouldFocusError: false });
    const { reset } = methods


    return (
        <AppValidationObserver methods={methods} onSubmit={onSubmit}>
            {({ register, errors }) => (

                <div className="flex flex-col s:gap-[10px] gap-[5px]">
                    <AppInput className="!bg-[#2a2a2a] focus:!bg-[#20272a]" title={'ФИО'} inputName="name" required={true} />

                    <AppInput className="!bg-[#2a2a2a] focus:!bg-[#20272a]" title={'Телефон'} inputName="phone" mask="phone"
                        type="phone" required={true} />

                    <AppTextarea className="!bg-[#2a2a2a] focus:!bg-[#20272a]" title={'Комментарий'} inputName="comment" />
                    <div ref={setWrapperRef} className="tariff-wrap">
                        <button type="submit" ref={setButtonRef} className="shiny-cta tariff s:mt-[20px] mt-[15px] text-[14px] s:text-[20px] text-[#FFFFFF] font-bold border border-solid border-[#737373] flex items-center gap-[10px] justify-center p-[9px] rounded-[4px]">
                            {btnText}


                            <Image alt="message" src={MessageImg} width="0"
                                height="0"
                                sizes="100vw"
                                className="h-[30px] w-[30px]" />




                        </button>
                    </div>


                    <span className=" mt-[10px] text-[#A4A4A4] text-[10px] s:text-[13px]">
                        Согласен на обработку моих персональных данных <span className="whitespace-nowrap">в соответствии</span> с <Link href="/soglashenie/polzovatelskoe-soglashenie/" target="_blank">Пользовательским соглашением</Link>
                    </span>

                </div>
            )}
        </AppValidationObserver>
    );
};

export default AppMainForm;