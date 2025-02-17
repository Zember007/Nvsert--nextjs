import { updateActionNavigation } from "@/store/navigation";
import Link from "next/link"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppNavigation = () => {

    const dispatch = useDispatch()

    const { navigation } = useSelector(state => state.navigation)

    function defineUrl(item) {
        if (item.children.length === 0 && item.article_preview) {
            return '/' + item.article_preview + '/';
        } else {
            return '/' + item.full_slug + '/';
        }
    }

    useEffect(() => {

        console.log(navigation, 'asd');

    }, [navigation])

    useEffect(() => {        
        if (navigation.length === 0) {
            dispatch(updateActionNavigation())
        }
    }, [])

    return (
        <ul className="services-menu__list">

            {
                navigation.map((item, index) => (
                    <li className="services-menu__item" key={index}>
                        <Link href={defineUrl(item)} className="services-menu__link">
                            {item.title}
                        </Link>
                        {item.children && item.children.length > 0 &&
                            <ul
                                className="services-menu__list"
                            >
                                {item.children.map((item, index) => <li
                                    className="services-menu__item"
                                    key={index}
                                >
                                    <Link href={defineUrl(item)} className="services-menu__link">
                                        {item.title}</Link>
                                </li>)}
                            </ul>}
                    </li>
                ))
            }
        </ul>
    );
};

export default AppNavigation;