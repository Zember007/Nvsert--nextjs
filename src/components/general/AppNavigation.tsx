
import Image from "next/image";
import DocImg from '@/assets/images/main-gallery/01.webp'
import Link from "next/link";
import { useAnimation, motion } from "framer-motion";
import { useEffect } from "react";

const AppNavigation = ({active}:{active:boolean}) => {
    const controls = useAnimation();

    const defaultSettings = {
        duration: 0.6,
        bounce: 5,
        delay: 0,
        ease: [0.34, 1.56, 0.64, 1], // Кастомная cubic-bezier кривая
        times: [0, 0.2, 0.5, 0.8, 1], // Временные точки
        openY: [0, 26, 0, 0, 0], // Эффект отскока при открытии
        closeY: [60, -6, 0, 0, 0], // Эффект отскока при закрытии
        opacity: [0, 1, 1, 1, 1],
    };

    useEffect(() => {
        if (active) {
            controls.start({
                y: defaultSettings.openY, // Используем openY для отскока
                opacity: defaultSettings.opacity,
                transition: {
                    duration: defaultSettings.duration,
                    ease: defaultSettings.ease,
                    times: defaultSettings.times
                }
            });
        }
    }, [active]);
    return (
        <>
            <div className="flex flex-col gap-[20px]">
                <div className="border-0 border-b border-[#93969D] border-solid py-[20px]">
                    <p className="text-[20px] text-[var(--color-item-menu-active)] font-bold">Сертификация ГОСТ Р</p>
                </div>
                <Link href={'#'} className="flex gap-[10px] group transition-all rounded-[4px] items-center border border-solid border-[transparent] hover:border-[#93969D]">
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={controls}>
                        <Image src={DocImg} width={43} height={60} alt="document" className="rounded-[3px]" />
                    </motion.div>
                    <p className="transition-all group-hover:text-[var(--color-item-menu-active)] max-w-[170px] text-[var(--color-item-menu)] text-[14px] opacity-[0.6]">Декларациясоответствия ГОСТ Р</p>
                </Link>
            </div>
        </>
    );
};

export default AppNavigation;