import Link from "next/link";
import { useAnimation, motion, AnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useHeaderContext } from "../contexts/HeaderContext";
import { filterPrepositions } from "@/hook/filter";
import { useButton } from "@/hook/useButton";
import { useTranslation } from "react-i18next";
import {  RootState } from "@/config/store";
import {  useSelector } from "react-redux";
import { NavigationItem } from "@/store/navigation";
import Image from "next/image";



const AppNavigation = ({ active }: { active: boolean }) => {

    const { navigation } = useSelector((state: RootState) => state.navigation);

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
                    ease: [0.34, 1.56, 0.64, 1] as const,
                    times: defaultSettings.times,
                    delay: 0.1
                }
            });
        }
    }, [active]);

    const grouped = navigation.reduce((acc:any, item:NavigationItem) => {
        const catId:number = item.category.id;
        if (!acc[catId]) {
          acc[catId] = [];
        }
        acc[catId].push(item);
        return acc;
      }, {});

   
    return (
        <>
            <div className="grid grid-cols-6 w-full xxxl:gap-[30px] gap-[8px]">
                {
                    Object.keys(grouped).map((item, i:number) =>

                        <div key={i} className="flex flex-col gap-[20px]">
                            {grouped[item].map((children:NavigationItem) => (
                                <WrapperItem link={'#'} key={children.id} title={children.title} img={'https://test11.audiosector.ru/cp'+children.img.url} controls={controls} />
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    );
};

const WrapperItem = ({ img, title, controls, link }: { link: string; img: string , title: string, controls: AnimationControls }) => {
    const { darkHeader } = useHeaderContext();
    const { setButtonRef, setWrapperRef } = useButton()

    return (
        <>
            <div ref={setWrapperRef} className="tariff-wrap">
                <Link ref={setButtonRef} href={'/services/'} className={`tariff overflow-hidden not-backdrop flex xxxl:gap-[10px] gap-[5px] group  rounded-[4px] items-center hover:bg-[#34446d33] border-solid hover:border-[#fff] border border-[transparent]`}>
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        className=" overflow-hidden group-hover:rounded-[0px] rounded-[4px] min-w-[43px]"
                        animate={controls}>
                        <Image src={img as string} className="w-[43px] h-[60px]" width={43} height={60} alt="document" />
                    </motion.div>
                    <p className={`${darkHeader ? 'text-[#000] group-hover:text-[#FFF]' : 'text-[#FFF]'} max-w-full xxxl:pr-[12px] xxl:text-[16px] text-[14px]`}>{filterPrepositions(title)}</p>
                </Link>
            </div>
        </>
    )
}

export default AppNavigation;