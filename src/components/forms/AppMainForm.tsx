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

const AppMainForm = ({ btnText }: { btnText:string }) => {

    const { t } = useTranslation()
    const { openDefaultModal } = useHeaderContext()

    const onSubmit = async(e:any) => {
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
    return (
        <AppValidationObserver methods={methods} onSubmit={onSubmit}>
            {({ register, errors }) => (

                <div className="flex flex-col gap-[10px]">
                    <AppInput title={t('form.input.titles.name')} inputName="name" required={true} />

                    <AppInput title={t('form.input.titles.phone')} inputName="phone" mask="phone"
                        type="phone" required={true} />

                    <AppTextarea title={'Комментарий'} inputName="comment"
                        required={true} />

                    <button type="submit" className="mt-[20px] text-[20px] text-[#FFFFFF] font-bold border border-solid border-[#737373] flex items-center gap-[20px] justify-center p-[5px] rounded-[4px]">
                        {btnText}
                        <div className="translate-y-[5px]">
                            <Image alt="message" src={MessageImg} width={40} height={40}/>
                        </div>



                    </button>


                    <span className=" mt-[10px] text-[#A4A4A4] text-[13px]">
                    Согласен на обработку моих персональных данных в соответствии с <Link href="/soglashenie/polzovatelskoe-soglashenie/" target="_blank">Пользовательским соглашением</Link>
                    </span>

                </div>
            )}
        </AppValidationObserver>
    );
};

export default AppMainForm;