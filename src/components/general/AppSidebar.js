import { useState } from 'react';
import AppSidebarItem from './AppSidebarItem.js';
import { useSelector } from 'react-redux';
import '@/assets/styles/blocks/sidebar.scss'

const AppSidebar = () => {
    function closeSidebar() {
        setMobileOpened(prev => !prev)
    }

    const [mobileOpened, setMobileOpened] = useState(false)

    const { navigation } = useSelector(state => state.navigation)
    return (
        <div className={`cat-menu-wrapper js-cat-menu__list ${mobileOpened && 'active'}`}>
            <button
                className="btn close-btn js-close-btn"
                type="button"
                onClick={(e) => {
                    e.preventDefault()
                    closeSidebar()
                }}
            >
                <span></span>
            </button>
            <ul className="cat-menu__content">
                {
                    navigation.map((item) => (
                        <AppSidebarItem
                            key={item.id}
                            navItem={item}
                        />
                    ))
                }
            </ul>
        </div >
    );
};

export default AppSidebar;