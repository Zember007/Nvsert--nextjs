
import Image from "next/image";
import Link from "next/link";
import { useAnimation, motion, AnimationControls } from "framer-motion";
import { useEffect } from "react";
import { gostR, iso, rospotrebnadzor, sertifikatsiya, tamozhennySoyuz, tekhDokumentatsiya } from './utils'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useHeaderContext } from "../contexts/HeaderContext";
import { filterPrepositions } from "@/hook/filter";

const AppNavigation = ({ active }: { active: boolean }) => {
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
                    times: defaultSettings.times,
                    delay: 0.1
                }
            });
        }
    }, [active]);
    return (
        <>
            <div className="grid grid-cols-6 w-full gap-[28px]">

                <div className="flex flex-col gap-[20px]">
                    {gostR.map((item, i) => (
                        <WrapperItem key={i} {...item} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {tamozhennySoyuz.map((item, i) => (
                        <WrapperItem key={i} {...item} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {sertifikatsiya.map((item, i) => (
                        <WrapperItem key={i} {...item} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {iso.map((item, i) => (
                        <WrapperItem key={i} {...item} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {rospotrebnadzor.map((item, i) => (
                        <WrapperItem key={i} {...item} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {tekhDokumentatsiya.map((item, i) => (
                        <WrapperItem key={i} {...item} controls={controls} />
                    ))}
                </div>

            </div>
        </>
    );
};

const WrapperItem = ({ img, title, controls }: { img: string | StaticImport, title: string, controls: AnimationControls }) => {
    const { darkHeader } = useHeaderContext();
    return (
        <>
            <Link href={'#'} className={`flex gap-[10px] group  rounded-[4px] items-center border border-solid border-[transparent] hover:border-[#000]`}>
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={controls}>
                    <Image src={img} width={43} height={60} alt="document" className="rounded-[3px]" />
                </motion.div>
                <p className={`${darkHeader ? 'text-[#000]' : 'text-[#FFF]'} pr-[30px] leading-[1.2] transition-all  max-w-[170px]  text-[14px]`}>{filterPrepositions(title)}</p>
            </Link>
        </>
    )
}

export default AppNavigation;