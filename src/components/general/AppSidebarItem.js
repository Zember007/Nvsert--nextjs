import Link from "next/link";
import { useState } from "react";


const AppSidebarItem = ({ navItem }) => {

    const [itemActive, setItemActive] = useState(false)

    function calcActive() {
        $route.path.startsWith(`/${navItem.full_slug}`)
            ? (setItemActive(true))
            : '';
    }

    function openDropdown(evt) {
        setItemActive(!itemActive)
    }

    function getFinalLink(item) {
        if (item.children.length === 0 && item.article_preview) {
            return '/' + item.article_preview + '/';
        } else {
            if (item.full_slug.charAt(0) === '/') {
                return `${item.full_slug}/`;
            }
            return `/${item.full_slug}/`;

        }
    }
    return (
        <li
            className={`cat-menu__item js-dropdown ${itemActive ? 'active' : ''}`}
        >


            {
                (navItem.children && navItem.children.length > 0) ?
                    <>
                        <div
                            className={`cat-menu__group js-cat-menu__group ${itemActive ? 'active' : ''}`}
                        >
                            <button
                                onClick={() => {
                                    openDropdown()
                                }}
                                type="button"
                                className="cat-menu__btn js-cat-menu__btn"
                            ></button>

                            <Link href={getFinalLink(navItem)} className="cat-menu__link">
                                {navItem.title}
                            </Link>
                        </div>


                        <ul
                            className={`cat-menu__list js-dropdown-content ${itemActive ? 'active' : ''}`}
                        >
                            {navItem.children.map(item =>
                            (<AppSidebarItem
                                key={item.id}
                                navItem={item}
                            />)
                            )}
                        </ul>
                    </>

                    :
                    <Link
                        href={getFinalLink(navItem)}
                        className={`cat-menu__link ${itemActive ? 'active' : ''}`}
                    >
                        {navItem.title}
                    </Link>
            }
        </li>
    );
};

export default AppSidebarItem;