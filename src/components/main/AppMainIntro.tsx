'use client'
import '@/assets/styles/sections/main/main-banner.scss';
import { useTranslation } from 'react-i18next';
import AppMainForm from '../forms/AppMainForm';
import { filterPrepositions } from '@/hook/filter';
import { useAnimation, motion } from "framer-motion";
import { useEffect, useRef } from 'react';
import GUI from 'lil-gui';


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

    useEffect(() => {
        const header = document.querySelector('.header')
        if (!ref.current || !header) return
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {                        
                        header.classList.add('black'); 
                    } else {
                        header.classList.remove('black'); 
                    }
                });
            },
            {
                root: null, 
                rootMargin: '0px',
                threshold: 0
            }
        );

        observer.observe(ref.current);

        return () => {
            if (!ref.current) return
            observer.unobserve(ref.current);
        }

    }, [ref])

    const params = useRef({
        blur: 2,
        opacity: 0.6,
      });
    
      useEffect(() => {
        const banner = ref.current;
        if (!banner) return;
    
        // Функция обновления CSS-переменных
        const updateStyles = () => {
          banner.style.setProperty("--blur-bg", `${params.current.blur}px`);
          banner.style.setProperty("--bg-op", `${params.current.opacity}`);
        };
    
        updateStyles(); // установить начальные значения
    
        // Создание GUI
        const gui = new GUI();
        gui.add(params.current, "blur", 0, 20).onChange(updateStyles);
        gui.add(params.current, "opacity", 0, 1).step(0.01).onChange(updateStyles);
    
        // Очистка
        return () => {
          gui.destroy();
        };
      }, [ref]);

    return (
        <>
            <section ref={ref} className="main-banner">

                <div className="wrapper">
                    <div className='main-banner__content'>
                        <h1 className="main-banner__title">{t('mainIntro.title')}</h1>

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