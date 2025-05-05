import { updateActionNavigation } from "@/store/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/config/store"; // Assuming you have a RootState type
import Image from "next/image";
import DocImg from '@/assets/images/main-gallery/01.webp'

interface NavigationItem {
    title: string;
    full_slug: string;
    article_preview?: string;
    children: NavigationItem[];
}

const AppNavigation = () => {
    const dispatch = useDispatch<AppDispatch>();
    // const { navigation } = useSelector((state: RootState) => state.navigation);

    // function defineUrl(item: NavigationItem): string {
    //     if (item.children.length === 0 && item.article_preview) {
    //         return '/' + item.article_preview + '/';
    //     } else {
    //         return '/' + item.full_slug + '/';
    //     }
    // }

    // useEffect(() => {
    //     if (navigation.length === 0) {
    //         dispatch(updateActionNavigation());
    //     }
    // }, [dispatch, navigation]);

    return (
        <>
            <div className="flex flex-col gap-[20px]">
                <div className="border-0 border-b border-[#93969D] border-solid py-[20px]">
                    <p className="text-[20px] font-bold">Сертификация ГОСТ Р</p>
                    <div className="flex gap-[10px] group">
                        <div className="border border-solid border-[#FFFFFF] rounded-[3px] overflow-hidden">
                            <Image src={DocImg} width={43} height={60} alt="document" />
                        </div>
                        <p className="text-[#FFF] text-[14px] opacity-[0.6]">Декларация соответствия  ГОСТ Р</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppNavigation;