'use client'

import { useTranslation } from 'react-i18next';
import AppMainForm from '../forms/AppMainForm';
import { filterPrepositions } from '@/hook/filter';
import { useAnimation, motion } from "framer-motion";


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
                ease: [0.34, 1.56, 0.64, 1] as const,
                times: defaultSettings.times
            }
        });
    }


 

    return (
        <>
            <section  id="intro" className="main-banner">

                <div className="wrapper">
                    <div className='main-banner__content'>
                        <div className="intro-content-container">
                            <h1 className="main-banner__title xl:pl-[33px]">{filterPrepositions(t('mainIntro.title'))}</h1>
                            <div className="intro-spacer"></div>
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