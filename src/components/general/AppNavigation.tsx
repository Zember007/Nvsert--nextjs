import { updateActionNavigation } from "@/store/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/config/store"; // Assuming you have a RootState type

interface NavigationItem {
    title: string;
    full_slug: string;
    article_preview?: string;
    children: NavigationItem[];
}

const AppNavigation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { navigation } = useSelector((state: RootState) => state.navigation);

    function defineUrl(item: NavigationItem): string {
        if (item.children.length === 0 && item.article_preview) {
            return '/' + item.article_preview + '/';
        } else {
            return '/' + item.full_slug + '/';
        }
    }

    useEffect(() => {
        if (navigation.length === 0) {
            dispatch(updateActionNavigation());
        }
    }, [dispatch, navigation]);

    return (
        <ul className="services-menu__list">
            {navigation.map((item, index) => (
                <li className="services-menu__item" key={index}>
                    <Link href={defineUrl(item)} className="services-menu__link">
                        {item.title}
                    </Link>
                    {item.children && item.children.length > 0 && (
                        <ul className="services-menu__list">
                            {item.children.map((child, childIndex) => (
                                <li className="services-menu__item" key={childIndex}>
                                    <Link href={defineUrl(child)} className="services-menu__link">
                                        {child.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default AppNavigation;