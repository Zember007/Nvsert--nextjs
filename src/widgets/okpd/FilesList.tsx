import { AppCollapsibleList } from "../layout";
import WordImg from '@/assets/images/svg/Word.svg';
import PdfImg from '@/assets/images/svg/PDF.svg';
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import textSize from "@/assets/styles/base/base.module.scss";
import { filterPrepositions } from "shared/lib/text/textFormat";

const FilesList = () => {
    const { t } = useTranslation();
    return (
        <AppCollapsibleList
            title={t("okpd.files.title")}
            items={[
                {
                    id: 1,
                    title: t("okpd.files.item1"),
                    icon: WordImg,
                    link: '#'
                },
                {
                    id: 2,
                    title: t("okpd.files.item2"),
                    icon: WordImg,
                    link: '#'
                },
                {
                    id: 3,
                    title: t("okpd.files.item3"),
                    icon: PdfImg,
                    link: '#'
                },
            ]}
            defaultOpen={true}
            listClassName='flex flex-col gap-[20px]'
            renderItem={(item, index) => (
                <Link key={index} href={item.link} target="_blank" className="flex items-center gap-[10px] group">
                    <Image src={item.icon} alt={item.title} width={40} height={40} className="min-w-[40px]" />
                    <span className={`${textSize.text3} group-active:scale-[0.95] transition-transform duration-100`}>{filterPrepositions(item.title)}</span>
                </Link>
            )}
        />
    );
};

export default FilesList;