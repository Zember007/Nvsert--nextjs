import { getLocaleFromPathname, withLocalePrefix } from 'shared/i18n/client-locale';
import Link from "next/link";
import { usePathname } from "next/navigation";
import stylesBtn from '@/assets/styles/main.module.scss';


const LinkButtonTitle = ({ title, link }: { title: string, link: string }) => {
    const pathname = usePathname();
    const locale = getLocaleFromPathname(pathname);
    const localizePath = (path: string) => withLocalePrefix(path, locale);

    return (
        <Link href={localizePath(link)} className={`flex items-center gap-[10px] group ${stylesBtn.lineAfterBox}`}>
            <span className={`text-[16px] !font-normal ${stylesBtn.lineAfter} group-active:scale-[.95] transition-all duration-100`}>{title}</span>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z" fill="black" />
            </svg>
        </Link>
    );
};

export default LinkButtonTitle;