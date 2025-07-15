
import Image from "next/image";
import Link from "next/link";
import { useAnimation, motion, AnimationControls } from "framer-motion";
import { useEffect } from "react";
import { navigationImg } from './utils'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useHeaderContext } from "../contexts/HeaderContext";
import { filterPrepositions } from "@/hook/filter";
import { useButton } from "@/hook/useButton";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "@/config/store";
import { useDispatch, useSelector } from "react-redux";
import { updateActionNavigation } from "@/store/navigation";

interface navigationLang {
    title: string
}

const AppNavigation = ({ active }: { active: boolean }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { navigation } = useSelector((state: RootState) => state.navigation);



    useEffect(() => {
        if (navigation.length === 0) {
            dispatch(updateActionNavigation());
        }
    }, [dispatch, navigation]);

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

    const returnImg = (keys: string, i: number) => {
        if (navigationImg[keys] && navigationImg[keys][i]) {
            return navigationImg[keys][i].img;
        }
        return '';
    };
    return (
        <>
            <div className="grid grid-cols-6 w-full gap-[30px]">
                {
                    navigation.map((item, i) =>

                        <div key={i} className="flex flex-col gap-[20px]">
                            {item.children.map((children, i) => (
                                <WrapperItem link={children.full_slug} key={i} title={t(`navigation.${item.title}.${children.title}`)} img={returnImg(item.title, i)} controls={controls} />
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    );
};

const WrapperItem = ({ img, title, controls, link }: { link: string; img: string | StaticImport, title: string, controls: AnimationControls }) => {
    const { darkHeader } = useHeaderContext();
    const { setButtonRef, setWrapperRef } = useButton()

    return (
        <>
            <div ref={setWrapperRef} className="tariff-wrap">
                <Link ref={setButtonRef} href={link} className={`tariff overflow-hidden not-backdrop flex gap-[10px] group  rounded-[4px] items-center hover:bg-[#34446d33] border-solid hover:border-[#fff] border border-[transparent]`}>
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        className=" overflow-hidden group-hover:rounded-[2px] min-w-[43px]"
                        animate={controls}>
                        <Image src={img} className="w-[43px] h-[60px]" width={43} height={60} alt="document" />
                    </motion.div>
                    <p className={`${darkHeader ? 'text-[#000] group-hover:text-[#FFF]' : 'text-[#FFF]'} pr-[12px] max-w-[170px]  text-[14px]`}>{filterPrepositions(title)}</p>
                </Link>
            </div>
        </>
    )
}

export default AppNavigation;