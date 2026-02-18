import React, { useEffect } from 'react';
import FlyingPlane from './elements/FlyingPlane';
import { useAnimation, motion } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';

const FlightSuccess = ({ close, small = false, text, closeIcon = true }: { closeIcon?:boolean; close: () => void; small?: boolean; text: string }) => {

    const [time, setTime] = React.useState(10);
    const { t } = useTranslation();

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
    }, [close])




    return (


        <div className="active  s:pt-[100px] pt-[50px]">

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

                    <p className="m:text-[20px] text-[16px]">
                        <Trans
                            i18nKey="modals.flightSuccess.followUp"
                            values={{ minutes: 10 }}
                            components={{ br: <br /> }}
                        />
                    </p>
                </div>
                <div
                    className={`${small ? 's:top-[220px] top-[150px]' : 's:top-[256px] top-[160px]'} left-0 right-0 absolute isolate will-change-transform`}>
                    <FlyingPlane />
                </div>
            </div>
            <p className={`text-[#93969D] font-light text-[44px] absolute bottom-[30px] left-[50%] translate-x-[-50%]`}>{time}</p>
        </div>

    );
};

export default FlightSuccess;