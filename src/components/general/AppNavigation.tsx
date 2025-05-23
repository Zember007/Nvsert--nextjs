
import Image from "next/image";
import Link from "next/link";
import { useAnimation, motion, AnimationControls } from "framer-motion";
import { useEffect } from "react";
import { gostR, iso, rospotrebnadzor, sertifikatsiya, tamozhennySoyuz, tekhDokumentatsiya } from './utils'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useHeaderContext } from "../contexts/HeaderContext";
import { filterPrepositions } from "@/hook/filter";
import { useButton } from "@/hook/useButton";
import { useTranslation } from "react-i18next";

interface navigationLang {
    title: string
}

const AppNavigation = ({ active }: { active: boolean }) => {

    const { t } = useTranslation()

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

    const gostRLang = t('navigation.gostR', { returnObjects: true }) as navigationLang[]
    const tamozhennySoyuzLang = t('navigation.tamozhennySoyuz', { returnObjects: true }) as navigationLang[]
    const sertifikatsiyaLang = t('navigation.sertifikatsiya', { returnObjects: true }) as navigationLang[]
    const isoLang = t('navigation.iso', { returnObjects: true }) as navigationLang[]
    const rospotrebnadzorLang = t('navigation.rospotrebnadzor', { returnObjects: true }) as navigationLang[]
    const tekhDokumentatsiyaLang = t('navigation.tekhDokumentatsiya', { returnObjects: true }) as navigationLang[]
    return (
        <>
            <div className="grid grid-cols-6 w-full gap-[30px]">

                <div className="flex flex-col gap-[20px]">
                    {gostR.map((item, i) => (
                        <WrapperItem key={i} title={gostRLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {tamozhennySoyuz.map((item, i) => (
                        <WrapperItem key={i} title={tamozhennySoyuzLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {sertifikatsiya.map((item, i) => (
                        <WrapperItem key={i} title={sertifikatsiyaLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {iso.map((item, i) => (
                        <WrapperItem key={i} title={isoLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {rospotrebnadzor.map((item, i) => (
                        <WrapperItem key={i} title={rospotrebnadzorLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

                <div className="flex flex-col gap-[20px]">
                    {tekhDokumentatsiya.map((item, i) => (
                        <WrapperItem key={i} title={tekhDokumentatsiyaLang[i].title} img={item.img} controls={controls} />
                    ))}
                </div>

            </div>
        </>
    );
};

const WrapperItem = ({ img, title, controls }: { img: string | StaticImport, title: string, controls: AnimationControls }) => {
    const { darkHeader } = useHeaderContext();
    const { setButtonRef, setWrapperRef } = useButton()

    return (
        <>
            <div ref={setWrapperRef} className="tariff-wrap">
                <Link ref={setButtonRef} href={'#'} className={`tariff no-transitions no-light not-backdrop flex gap-[10px] group  rounded-[4px] items-center ${darkHeader ? `hover:bg-[#5B6788]` : 'hover:bg-[#00000080]'} border-solid ${darkHeader ? 'hover:border-[#000]' : 'hover:border-[#ccc]'} border border-[transparent]`}>
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        className="min-w-[43px] rounded-[4px] overflow-hidden group-hover:rounded-[2px]"
                        animate={controls}>
                        <Image src={img} width={43} height={60} alt="document" />
                    </motion.div>
                    <p className={`${darkHeader ? 'text-[#000] group-hover:text-[#FFF]' : 'text-[#FFF]'} pr-[12px] leading-[1.2]  max-w-[170px]  text-[14px]`}>{filterPrepositions(title)}</p>
                </Link>
            </div>
        </>
    )
}

export default AppNavigation;