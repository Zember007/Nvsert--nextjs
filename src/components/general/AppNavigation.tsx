import Link from "next/link";
import { useAnimation, motion, AnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useHeaderContext } from "../contexts/HeaderContext";
import { filterPrepositions } from "@/hook/filter";
import { useButton } from "@/hook/useButton";
import {  RootState } from "@/config/store";
import {  useSelector } from "react-redux";
import { NavigationItem } from "@/store/navigation";
import Image from "next/image";



const AppNavigation = ({ active }: { active: boolean }) => {

    const { services } = useSelector((state: RootState) => state.navigation);

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


    
   

   
    return (
        <>
            <div className="grid grid-cols-6 w-full xxxl:gap-[30px] gap-[8px]">
                {
                    services.map((item, i:number) =>

                        <div key={i} className="flex flex-col gap-[20px]">
                            {item.items.map((children:NavigationItem) => (
                                <AppNavigationItem link={children.slug} key={children.id} title={children.title} img={'https://test11.audiosector.ru/cp'+children.img?.url} controls={controls} />
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    );
};

const AppNavigationItem = ({ img, title, controls, link, dark, className }: { link: string; img: string , title: string, controls?: AnimationControls, dark?: boolean, className?: string }) => {
    const { setButtonRef, setWrapperRef } = useButton()

    return (
        <>
            <div ref={setWrapperRef} className={`tariff-wrap ${className} max-w-[250px]`}>
                <Link ref={setButtonRef} href={'/' + link} className={`tariff text-left h-[72px] no-transitions overflow-hidden not-backdrop flex xxxl:gap-[10px] gap-[5px] group/img  rounded-[4px] items-center    border-solid  border border-[transparent] ${dark ? 'hover:border-[#34446D] hover:bg-[#93969d26]' : 'hover:border-[#fff] hover:bg-[#34446d33]'}`}>
                    <motion.div
                        className=" overflow-hidden m-[6px] mr-0 rounded-[3px] min-w-[43px] border-solid border border-[#93969D]"
                        animate={controls}>
                        <Image src={img as string} className="w-[43px] h-[60px]" width={43} height={60} alt="document" />
                    </motion.div>
                    <p className={`${dark ? 'text-[#000]' : 'text-[#FFF]'} max-w-full  xxl:text-[18px] text-[14px]`}>{filterPrepositions(title)}</p>
                </Link>
            </div>
        </>
    )
}

export { AppNavigation, AppNavigationItem };