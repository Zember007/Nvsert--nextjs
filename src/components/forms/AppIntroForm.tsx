// components/AppIntroForm.jsx
'use client';

import Link from "next/link";
import AppValidationObserver from "./AppValidationObserver";
import AppInput from "./elements/AppInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import ImgCall from '@/assets/images/order-call.png'
import { useButton } from "@/hook/useButton";
import { useEffect, useRef, useState } from "react";
import FlightSuccess from "../modals/FlightSuccess";
import { useHeaderContext } from "../contexts/HeaderContext";
import { useAnimation, motion } from "framer-motion";
import { filterPrepositions } from "@/hook/filter";


const AppIntroForm = ({ close, BounceWrapper }: { close?: () => void; BounceWrapper?: () => void }) => {
    const { setButtonRef, setWrapperRef } = useButton();

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

                animation()
                BounceWrapper && BounceWrapper()
                setSuccessMessageVisible(true)

            }
        } catch (error) {
            console.log(error);
        }
    };

    const methods = useForm({
        mode: "onTouched", shouldFocusError: false,
        defaultValues: {
            name: '',
            Contact: ''
        }
    });

    const { reset } = methods;

    const [successMessageVisible, setSuccessMessageVisible] = useState(false);

    const validContact = (value: string) => {
        const phoneRegex = /^(?:\+7|8)?[\s(-]*\d[\s(-]*\d{2}[\s)-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/;

        if ((!phoneRegex.test(value.trim()))) {
            setContactError(true)
        } else {
            setContactError(false)
        }
    }


    const [contactError, setContactError] = useState(false);
    const { defaultModalActive, defaultModalCount } = useHeaderContext();

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
        if (!defaultModalActive) return
        animation()
    }, [defaultModalActive, defaultModalCount])
    return (
        <motion.div
            animate={controls}
            initial={{ x: 0 }}
            className='flex flex-col gap-[20px] pb-[33px] pt-[38px] px-[40px] relative'>

            <div className={`${successMessageVisible && 'opacity-0'} flex flex-col gap-[44px]`}>
                <div className="h-[23px] ">
                    <span className={`pl-[10px] leading-[1] text-[#FFF] text-[32px] tracking-[-0.03em] linear-text`}>Заказать звонок</span>
                </div>
                <div className="w-full overflow-hidden pointer-events-none rounded-[4px]">
                    <Image src={ImgCall} alt='order-call'></Image>
                </div>
            </div>

            {successMessageVisible && <FlightSuccess small={true} closeIcon={false} text="Спасибо" close={() => { setSuccessMessageVisible(false) }} />}

            <AppValidationObserver methods={methods} onSubmit={onSubmit}>
                {({ register, errors }) => (
                    <div className={`${successMessageVisible && 'opacity-0'} flex flex-col gap-[20px]`}>
                        <AppInput
                            className="main__input"
                            title={'ФИО'}
                            inputName="name"
                            required={true}
                        />

                        <AppInput
                            className="main__input"
                            title={'Телефон'}
                            inputName="Contact"
                            mask={"phone"}
                            type={"tel"}
                            required={true}
                            fail={contactError}
                            onBlur={(value) => { validContact(value) }}
                        />



                        <div ref={setWrapperRef} className="tariff-wrap relative mt-[24px]">
                            <button
                                type="submit"
                                ref={setButtonRef}
                                className="form__button no-drag btnIconAn group tariff an-border"      
                            >
                                    <span className="sendIconLeft">
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.0566 4.3995C22.9706 4.35061 22.8951 4.2852 22.8345 4.20703C22.7739 4.12886 22.7294 4.03947 22.7035 3.94402C22.6776 3.84856 22.6708 3.74893 22.6835 3.65084C22.6963 3.55276 22.7283 3.45816 22.7778 3.3725C22.8272 3.28685 22.8931 3.21182 22.9717 3.15174C23.0503 3.09165 23.1399 3.04771 23.2356 3.02243C23.3312 2.99714 23.4309 2.99103 23.5289 3.00443C23.6269 3.01783 23.7212 3.05048 23.8066 3.1005C24.0146 3.2205 24.2131 3.3505 24.4021 3.4905C25.6299 4.3959 26.4923 5.71158 26.8328 7.19865C27.1733 8.68572 26.9692 10.2456 26.2576 11.595C26.1623 11.7664 26.0036 11.8937 25.8156 11.9496C25.6276 12.0054 25.4251 11.9854 25.2517 11.8938C25.0783 11.8021 24.9477 11.6462 24.8878 11.4594C24.828 11.2726 24.8437 11.0698 24.9316 10.8945C25.5193 9.77949 25.6523 8.48018 25.3027 7.26921C24.9531 6.05824 24.1481 5.02973 23.0566 4.3995ZM21.5566 6.9975C21.4706 6.94861 21.3951 6.8832 21.3345 6.80503C21.2739 6.72686 21.2294 6.63747 21.2035 6.54202C21.1776 6.44657 21.1708 6.34693 21.1835 6.24884C21.1963 6.15076 21.2283 6.05616 21.2778 5.9705C21.3272 5.88485 21.3931 5.80982 21.4717 5.74974C21.5503 5.68965 21.6399 5.64571 21.7356 5.62043C21.8312 5.59514 21.9309 5.58903 22.0289 5.60243C22.1269 5.61583 22.2212 5.64848 22.3066 5.6985C23.0391 6.12129 23.5863 6.80373 23.8396 7.61071C24.0929 8.41769 24.034 9.29038 23.6746 10.056C23.5898 10.236 23.4371 10.375 23.2499 10.4424C23.0626 10.5097 22.8563 10.5 22.6763 10.4153C22.4963 10.3305 22.3573 10.1777 22.29 9.99053C22.2226 9.80332 22.2323 9.59702 22.3171 9.417C22.5164 8.99174 22.5488 8.50719 22.408 8.05916C22.2671 7.61114 21.9633 7.23228 21.5566 6.9975ZM6.93907 25.596C7.02506 25.6449 7.10052 25.7103 7.16112 25.7885C7.22173 25.8666 7.26627 25.956 7.29218 26.0515C7.3181 26.1469 7.32488 26.2466 7.31213 26.3447C7.29938 26.4427 7.26735 26.5373 7.2179 26.623C7.16844 26.7087 7.10253 26.7837 7.02396 26.8438C6.94539 26.9038 6.85571 26.9478 6.76008 26.9731C6.66446 26.9984 6.56478 27.0045 6.46678 26.9911C6.36878 26.9777 6.2744 26.945 6.18907 26.895C4.76156 26.0707 3.70883 24.7255 3.25184 23.1417C2.79485 21.5578 2.96912 19.8586 3.73807 18.4005C3.78282 18.3112 3.84493 18.2318 3.92076 18.1669C3.9966 18.102 4.08464 18.0528 4.17972 18.0224C4.2748 17.9919 4.375 17.9807 4.47445 17.9895C4.5739 17.9983 4.6706 18.0268 4.75888 18.0735C4.84715 18.1201 4.92523 18.1839 4.98853 18.2611C5.05183 18.3383 5.09908 18.4274 5.1275 18.5231C5.15593 18.6188 5.16496 18.7192 5.15407 18.8184C5.14318 18.9177 5.11258 19.0137 5.06407 19.101C4.47635 20.216 4.34333 21.5153 4.69291 22.7263C5.0425 23.9373 5.84753 24.9658 6.93907 25.596ZM8.43907 22.998C8.52506 23.0469 8.60052 23.1123 8.66112 23.1905C8.72173 23.2686 8.76627 23.358 8.79218 23.4535C8.8181 23.5489 8.82488 23.6486 8.81213 23.7467C8.79938 23.8447 8.76735 23.9393 8.7179 24.025C8.66844 24.1107 8.60253 24.1857 8.52396 24.2458C8.44539 24.3058 8.35571 24.3498 8.26008 24.3751C8.16446 24.4004 8.06478 24.4065 7.96678 24.3931C7.86878 24.3797 7.7744 24.347 7.68907 24.297C6.95651 23.8742 6.40939 23.1918 6.15605 22.3848C5.90271 21.5778 5.9616 20.7051 6.32107 19.9395C6.40581 19.7595 6.55859 19.6205 6.7458 19.5531C6.933 19.4858 7.13931 19.4955 7.31932 19.5802C7.49934 19.665 7.63832 19.8178 7.70569 20.005C7.77307 20.1922 7.76331 20.3985 7.67857 20.5785C7.4793 21.0038 7.44686 21.4883 7.58769 21.9363C7.72851 22.3844 8.03234 22.7632 8.43907 22.998ZM15.2581 4.6035C15.6322 4.50242 16.0227 4.47668 16.4068 4.52779C16.7909 4.5789 17.1611 4.70584 17.4958 4.90123C17.8304 5.09661 18.1229 5.35655 18.3563 5.66595C18.5896 5.97534 18.7592 6.32802 18.8551 6.7035L22.4026 20.1645C22.8271 21.7695 21.8836 23.4495 20.2801 23.886L14.7481 25.395C14.3741 25.4959 13.9837 25.5214 13.5998 25.4702C13.2158 25.419 12.8458 25.292 12.5113 25.0966C12.1768 24.9013 11.8845 24.6414 11.6512 24.3321C11.418 24.0228 11.2485 23.6703 11.1526 23.295L7.60507 9.8325C7.18207 8.2275 8.12557 6.5475 9.72907 6.1095L15.2581 4.6035ZM14.5261 21.5655C14.5492 21.6605 14.5913 21.75 14.6497 21.8284C14.708 21.9069 14.7816 21.9729 14.866 22.0224C14.9503 22.0719 15.0438 22.104 15.1407 22.1167C15.2377 22.1295 15.3363 22.1226 15.4306 22.0965L18.1036 21.3675C18.2962 21.314 18.4604 21.1876 18.5614 21.0152C18.6625 20.8427 18.6925 20.6377 18.6451 20.4435C18.6219 20.3485 18.5799 20.259 18.5215 20.1806C18.4631 20.1021 18.3896 20.0361 18.3052 19.9866C18.2208 19.9371 18.1274 19.905 18.0304 19.8923C17.9334 19.8795 17.8349 19.8864 17.7406 19.9125L15.0691 20.64C14.8759 20.6932 14.7111 20.8197 14.6096 20.9925C14.5082 21.1653 14.4783 21.3709 14.5261 21.5655Z" fill="white"></path></svg>
                                    </span>
                                    <span
                                        className="sendText"
                                    >Заказать звонок</span>                             
                            </button>
                        </div>


                        <span className="text-[#CCCCCC] text-[10px] s:text-[13px] ">
                            {filterPrepositions('Нажимая на кнопку «Оформить заявку» вы соглашаетесь с ')}
                            <Link href="/soglashenie/polzovatelskoe-soglashenie/" className="no-drag" target="_blank">
                                политикой конфиденциальности
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