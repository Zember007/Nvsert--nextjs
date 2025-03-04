import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import AppArticlesCard from "../articles/AppArticlesCard";
import { useDispatch, useSelector } from "react-redux";
import AppArticlesPagination from "../articles/AppArticlesPagination";
import { setMetadata } from "@/store/metadata";
import { generateMetadata } from "@/hook/useHead";
import { RootState } from "@/config/store";


const AppArticles: React.FC = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const { SEO, pages: articles } = useSelector((state: RootState) => state.pages);
    const ordering = searchParams.get('ordering') || '';
    const search = searchParams.get('search') || '';
    const okp = searchParams.get('okp') || '';
    const tnved = searchParams.get('tnved') || '';

    const pagination = useMemo(() => {
        return {
            page: page ?? null,
            next: articles.next ?? null,
            prev: articles.previous ?? null,
            totalElements: articles.totalElements ?? null,
            totalPages: articles.totalPages ?? null,
            pageSize: articles.pageSize ?? null,
        };
    }, [page, articles]);

    const { configs: configsPure } = useSelector((state: RootState) => state.config);
    const dispatch = useDispatch();

    const configs = useMemo(() => {
        let parsedConf: { [key: string]: string } = {};
        configsPure?.forEach((item) => {
            let key = item.key;
            let value = item.value;
            parsedConf[key] = value;
        });
        return parsedConf;
    }, [configsPure]);

    useEffect(() => {
        dispatch(setMetadata(generateMetadata(configs, SEO)));
    }, [configs, SEO]);

    return (
        <div>
            {(articles.seo_h1 || articles.title) && <h1>{articles.seo_h1 ? articles.seo_h1 : articles.title}</h1>}
            <div className="mtp__news">
                {articles.content && articles.content.length > 0 &&
                    <div className="mtp__news">
                        {articles.content.map(card => (
                            <AppArticlesCard key={card.id} card={card} />
                        ))}
                    </div>
                }
                <AppArticlesPagination pagination={pagination} />
            </div>
        </div>
    );
};

export default AppArticles;