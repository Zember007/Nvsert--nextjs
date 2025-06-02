import { useState } from 'react';
import AppSidebarItem from './AppSidebarItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/config/store'; // Assuming you have a RootState type
import '@/assets/styles/blocks/sidebar.scss';

interface NavigationItem {
    id: string;
    title: string;
    full_slug: string;
    article_preview?: string;
    children: NavigationItem[];
}

const AppSidebar = () => {
    const [mobileOpened, setMobileOpened] = useState(false);

    function closeSidebar() {
        setMobileOpened(prev => !prev);
    }

    const { navigation } = useSelector((state: RootState) => state.navigation);

    return (
        <div className={`cat-menu-wrapper js-cat-menu__list ${mobileOpened && 'active'}`}>
            <button
                className="btn close-btn js-close-btn"
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    closeSidebar();
                }}
            >
                <span></span>
            </button>
            <ul className="flex flex-col gap-[20px]">
                {navigation.map((item) => (
                    <AppSidebarItem
                        key={item.id}
                        navItem={item}
                    />
                ))}
            </ul>
        </div>
    );
};

export default AppSidebar;