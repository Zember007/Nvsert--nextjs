'use client'
import '@/assets/styles/sections/main/main-banner.scss';
import { useTranslation } from 'react-i18next';
import AppMainForm from '../forms/AppMainForm';
import { filterPrepositions } from '@/hook/filter';
import { useAnimation, motion } from "framer-motion";
import { useEffect, useRef } from 'react';


const AppMainIntro = () => {

    const { t } = useTranslation()

    const controls = useAnimation();
    const defaultSettings = {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        times: [0, 0.2, 0.5, 0.8, 1],
        openY: [-100, -80, 10, 0, 0],
    };
    const animation = () => {
        controls.start({
            y: defaultSettings.openY, // Используем openY для отскока
            transition: {
                duration: defaultSettings.duration,
                ease: defaultSettings.ease,
                times: defaultSettings.times
            }
        });
    }

    const ref = useRef<HTMLDivElement>(null)

 

    return (
        <>
            <section ref={ref} className="main-banner">

                <div className="wrapper">
                    <div className='main-banner__content'>
                        <div className="flex flex-col gap-[50px]">
                            <h1 className="main-banner__title">{filterPrepositions(t('mainIntro.title'))}</h1>
                            <div className="h-[334px]"></div>
                        </div>
                        

                        <motion.div
                            animate={controls}>
                            <AppMainForm
                                BounceWrapper={() => {
                                    animation()
                                }}
                                btnText={'Оформить заявку'} />
                        </motion.div>

                    </div>
                </div >
            </section >
        </>
    );
};

export default AppMainIntro;