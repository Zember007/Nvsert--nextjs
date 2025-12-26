import { AppCollapsibleList } from "../layout";
import WordImg from '@/assets/images/svg/Word.svg';
import PdfImg from '@/assets/images/svg/PDF.svg';
import Image from "next/image";
import Link from "next/link";
import textSize from "@/assets/styles/base/base.module.scss";

const FilesList = () => {
    return (
        <AppCollapsibleList
            title={'Документация'}
            items={[
                {
                    id: 1,
                    title: 'ОКПД 2 01-99',
                    icon: WordImg,
                    link: '#'
                },
                {
                    id: 2,
                    title: 'Особенности построения и применения ОКВЭД 2 и ОКПД 2',
                    icon: WordImg,
                    link: '#'
                },
                {
                    id: 3,
                    title: 'Приказ Росстандарта от 31 января 2014 г. № 14-ст',
                    icon: PdfImg,
                    link: '#'
                },
            ]}
            defaultOpen={true}
            listClassName='flex flex-col gap-[20px]'
            renderItem={(item, index) => (
                <Link key={index} href={item.link} target="_blank" className="flex items-center gap-[10px] group">
                    <Image src={item.icon} alt={item.title} width={40} height={40} className="min-w-[40px]" />
                    <span className={`${textSize.text3} group-active:scale-[0.95] transition-transform duration-100`}>{item.title}</span>
                </Link>
            )}
        />
    );
};

export default FilesList;