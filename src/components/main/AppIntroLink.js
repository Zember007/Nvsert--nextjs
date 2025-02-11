import Link from "next/link";
import { useMemo } from "react";

const AppIntroLink = ({ linkType, item }) => {

    const linkObject = useMemo(() => {
        switch (linkType) {
            case 'article':
                return {
                    link: item.full_slug ? '/' + item.full_slug + '/' : '',
                    title: item.seo_h1 ? item.seo_h1 : item.title,
                };

            case 'okp':
                return {
                    link: item.code ? 'articles/?okp=' + item.code : '',
                    title:
                        item.name && item.code
                            ? item.code + ' : ' + item.name
                            : '',
                };

            case 'tn':
                return {
                    link: item.code ? 'articles/?tnved=' + item.code : '',
                    title:
                        item.name && item.code
                            ? item.code + ' : ' + item.name
                            : '',
                };

            case 'section':
                return {
                    link: item.full_slug ? `/${item.full_slug}/`.replace('//', '/') : '',
                    title: item.title ? item.title : '',
                };

            default:
                return {
                    link: item.slug ? 'articles/' + item.slug + '/' : '',
                    title: item.seo_h1 ? item.seo_h1 : item.title,
                };
        }
    }, [linkType, item])
    return (
        <li class="main-banner__tag-item list-complete-item">
            <Link
                to={linkObject.link}
                className="main-banner__tag"
                title={linkObject.title}
            >
                {linkObject.title}
            </Link>
        </li>
    );
};

export default AppIntroLink;