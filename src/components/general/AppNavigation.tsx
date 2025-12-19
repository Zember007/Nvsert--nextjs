import Link from "next/link";
import { useAnimation, motion, AnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useHeaderContext } from "@/shared/contexts/contexts/HeaderContext";
import { filterPrepositions } from "@/hook/filter";
import { useButton } from "@/hook/useButton";
import { NavigationItem, Services } from "@/types/navigation";
import Image from "next/image";
import stylesBtn from '@/assets/styles/base/base.module.scss';
import textSize from '@/assets/styles/base/base.module.scss';



const AppNavigation = ({ active, services }: { active: boolean, services: Services[] }) => {

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
                                <AppNavigationItem link={children.slug} key={children.id} title={children.title} img={''+children.img?.formats?.thumbnail?.url} controls={controls} />
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    );
};

const AppNavigationItem = ({ img, title, controls, link, dark, className, onClick, classNameText }: { link: string; img: string , title: string, controls?: AnimationControls, dark?: boolean, className?: string, onClick?: (e: React.MouseEvent<HTMLElement>) => void, classNameText?: string }) => {
    const { setButtonRef, setWrapperRef } = useButton()

    const active = typeof window !== 'undefined' && window.location.pathname.includes(link);

    const hoverStyle = dark ? 'hover:border-[#34446D] hover:bg-[#F5F5F2] ' : ' hover:border-[#fff] hover:bg-[#34446d33]'

    const activeStyle = dark ? 'border-[#34446D] bg-[#F5F5F2] ' : ' border-[#fff] bg-[#34446d33]'

    return (
        <>
            <div ref={setWrapperRef} className={`${stylesBtn.tariffWrap} ${className ?? 'xxs:!max-w-[250px]'}`}>
                <Link
                    ref={setButtonRef}
                    href={'/services/' + link}
                    prefetch={false}
                    onClick={onClick}
                    className={` ${stylesBtn.tariff} ${stylesBtn.noTransitions} text-left overflow-hidden ${stylesBtn.notBackdrop} flex  gap-[10px] group/img  rounded-[3px] items-center    border-solid  border border-[transparent] h-[72px] p-[5px] ${active ? activeStyle : ''} ${hoverStyle}`}>
                    <motion.div
                        className={` overflow-hidden h-[60px] rounded-[3px] min-w-[43px] w-[43px] border-solid border border-[#93969D] `}
                        animate={controls}>
                        <Image 
                            src={img as string} 
                            className="h-full" 
                            width={43} 
                            height={60} 
                            alt="document" 
                            unoptimized={true}
                            sizes="43px"
                        />
                    </motion.div>
                    <p className={`${classNameText ? classNameText : ''} ${dark ? `text-[#000] ${textSize.text1}` : 'text-[#FFF] xxxxl:text-[18px] xxl:text-[16px] text-[14px] no-font-weight'}  !leading-[1.1] pr-[6px] whitespace-pre-line max-w-full`}>{filterPrepositions(title)}</p>
                </Link>
            </div>
        </>
    )
}

export { AppNavigation, AppNavigationItem };