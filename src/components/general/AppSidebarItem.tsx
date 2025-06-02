import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface NavigationItem {
    id?: number
    title: string;
    full_slug: string;
    article_preview?: string;
    children: NavigationItem[];
}

interface AppSidebarItemProps {
    navItem: NavigationItem;
}

const AppSidebarItem: React.FC<AppSidebarItemProps> = ({ navItem }) => {
    const pathname = usePathname();
    const [itemActive, setItemActive] = useState(false);
    const listItems = useRef<HTMLUListElement | null>(null)

    function calcActive() {
        pathname.startsWith(`/${navItem.full_slug}`)
            ? setItemActive(true)
            : setItemActive(false);
    }

    function openDropdown() {
        setItemActive(!itemActive);
    }

    function getFinalLink(item: NavigationItem) {
        if (item.children.length === 0 && item.article_preview) {
            return '/' + item.article_preview + '/';
        } else {
            if (item.full_slug.charAt(0) === '/') {
                return `${item.full_slug}/`;
            }
            return `/${item.full_slug}/`;
        }
    }

    useEffect(() => {
        calcActive();
    }, [pathname]);

    useEffect(() => {
        if (!listItems.current) return
        if (itemActive) {
            listItems.current.style.maxHeight = listItems.current.scrollHeight + "px";
        } else {
            listItems.current.style.maxHeight = "";
        }
    }, [itemActive])

    return (
        <li className={` ${itemActive ? 'active' : ''}`}>
            {navItem.children && navItem.children.length > 0 ? (
                <>
                    <div
                        onClick={openDropdown}
                        className={` cursor-pointer  border-solid group  flex items-center justify-between py-[10px] border-0 border-b border-[#CCCCCC]`}>
                        <Link href={getFinalLink(navItem)} className={`transition-all group-hover:text-[#34446D] text-[16px] font-bold text-[#93969D] ${itemActive && '!text-[#34446D]'}`}>
                            {navItem.title}
                        </Link>
                        <button

                        >
                            <svg className={`transition-all ${itemActive && 'rotate-[45deg] *:stroke-[#34446D]'} `} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 8L2 8" stroke="#93969D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 2V14.0001" stroke="#93969D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <ul ref={listItems} className={`  flex flex-col gap-[6px] overflow-hidden transtion-all ${itemActive ? 'mt-[15px]' : 'max-h-[0px]'}`}>
                        {navItem.children.map((item) => (
                            <AppSidebarItem key={item.id} navItem={item} />
                        ))}
                    </ul>
                </>
            ) : (
                <Link href={getFinalLink(navItem)} className={`block p-[10px] transition-transform text-[16px] font-bold text-[#93969D] rounded-[4px]  border border-solid border-[transparent]  ${itemActive ? 'scale-[0.99] !bg-[#5b6788] shadow-[inset_0_0_4px_0_rgba(0, 0, 0, 0.8)] !text-[#FFF]' : 'hover:text-[#34446D] hover:bg-[#F3F3F3] hover:border-[#34446D]'}`}>
                    {navItem.title}
                </Link>
            )}
        </li>
    );
};

export default AppSidebarItem;