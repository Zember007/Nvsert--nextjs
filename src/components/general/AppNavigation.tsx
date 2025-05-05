
// import Link from "next/link";
import Image from "next/image";
import DocImg from '@/assets/images/main-gallery/01.webp'
import Link from "next/link";

const AppNavigation = () => {

    return (
        <>
            <div className="flex flex-col gap-[20px]">
                <div className="border-0 border-b border-[#93969D] border-solid py-[20px]">
                    <p className="text-[20px] text-[#FFF] font-bold">Сертификация ГОСТ Р</p>
                </div>
                <Link href={'#'} className="flex gap-[10px] group transition-all rounded-[4px] items-center border border-solid border-[transparent] hover:border-[#93969D]">

                    <Image src={DocImg} width={43} height={60} alt="document" className="rounded-[3px]" />

                    <p className="transition-all group-hover:opacity-[1] max-w-[170px] text-[#FFF] text-[14px] opacity-[0.6]">Декларациясоответствия ГОСТ Р</p>
                </Link>
            </div>
        </>
    );
};

export default AppNavigation;