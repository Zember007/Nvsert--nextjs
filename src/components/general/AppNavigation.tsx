
// import Link from "next/link";
import Image from "next/image";
import DocImg from '@/assets/images/main-gallery/01.webp'

const AppNavigation = () => {

    return (
        <>
            <div className="flex flex-col gap-[20px]">
                <div className="border-0 border-b border-[#93969D] border-solid py-[20px]">
                    <p className="text-[20px] font-bold">Сертификация ГОСТ Р</p>
                </div>
                <div className="flex gap-[10px] group">
                    <div className="border border-solid border-[#FFFFFF] rounded-[3px] overflow-hidden">
                        <Image src={DocImg} width={43} height={60} alt="document" />
                    </div>
                    <p className="text-[#FFF] text-[14px] opacity-[0.6]">Декларациясоответствия ГОСТ Р</p>
                   </div>
                </div>
        </>      
    );
};

export default AppNavigation;