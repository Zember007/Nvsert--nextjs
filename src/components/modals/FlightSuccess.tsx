import React, { useEffect } from 'react';
import FlyingPlane from './elements/FlyingPlane';
import { useAnimation, motion } from 'framer-motion';

const FlightSuccess = ({ close, small = false, text, closeIcon = true }: { closeIcon?:boolean; close: () => void; small?: boolean; text: string }) => {

    const [time, setTime] = React.useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => {
                const num = prev - 1
                if (num === 0) {
                    clearInterval(timer)
                    close()
                }
                return num
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [])




    return (


        <div className="active  pt-[100px]">

            {closeIcon && <button
                onClick={() => { close() }}
                className="close !absolute !top-[25px] !right-[25px]">
                <div className="in">
                    <div className="close-button-block"></div>
                    <div className="close-button-block"></div>
                </div>
                <div className="out">
                    <div className="close-button-block"></div>
                    <div className="close-button-block"></div>
                </div>
            </button>}

            <div
                className="flex flex-col items-center">
                <div
                    className="flex flex-col gap-[30px] text-[#000] text-center items-center">
                    <div className="h-[23px]">
                        <p className="text-[24px] m:text-[32px] tracking-[-0.03em]">{text}</p>
                    </div>

                    <p className="m:text-[20px] text-[16px]">Мы свяжемся с Вами <br /> в течение 10 минут!</p>
                </div>
                <div
                    className={`${small ? 'top-[220px]' : 'top-[256px]'} left-0 right-0 absolute`}>
                    <FlyingPlane />
                </div>
            </div>
            <p className={`text-[#93969D] font-light text-[44px] absolute bottom-[30px] left-[50%] translate-x-[-50%]`}>{time}</p>
        </div>

    );
};

export default FlightSuccess;