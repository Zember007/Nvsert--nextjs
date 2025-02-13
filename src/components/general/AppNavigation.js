import Link from "next/link"
import { useSelector } from "react-redux";

const AppNavigation = () => {

    const { navigation } = useSelector(state => state.navigation)

    function defineUrl(item) {
        if (item.children.length === 0 && item.article_preview) {
            return '/' + item.article_preview + '/';
        } else {
            return '/' + item.full_slug + '/';
        }
    }

    return (
        <ul className="services-menu__list">
            {
                navigation?.map(item => {
                    <li className="services-menu__item" key={item.id}>
                        <Link href={defineUrl(item)} className="services-menu__link">
                            {item.title}
                        </Link>
                        <ul
                            className="services-menu__list"
                            v-if="item.children && item.children.length > 0"
                        >
                            <li
                                className="services-menu__item"
                                v-for="item in item.children"
                                key={item.i}
                            >
                                <Link href={defineUrl(item)} className="services-menu__link">
                                    {item.title}</Link>
                            </li>
                        </ul>
                    </li>
                })
            }
        </ul>
    );
};

export default AppNavigation;