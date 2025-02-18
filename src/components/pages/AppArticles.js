import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import AppArticlesCard from "../articles/AppArticlesCard.js";
import { useDispatch, useSelector } from "react-redux";
import AppArticlesPagination from "../articles/AppArticlesPagination.js";
import { setMetadata } from "@/store/metadata.js";
import { generateMetadata } from "@/hook/useHead.js";

const AppArticles = () => {

    const searchParams = useSearchParams();
    const { slug } = useParams();

    const page = searchParams.page ? searchParams.page : 1

    const id = slug ? slug.join('/') : null

    const { SEO, pages: articles } = useSelector(state => state.pages)

    const ordering = searchParams.ordering ? searchParams.ordering : ''

    const search = searchParams.search ? searchParams.search : ''

    const okp = searchParams.okp ? searchParams.okp : '';

    const tnved = searchParams.tnved ? searchParams.tnved : ''


    const pagination = useMemo(() => {
        return {
            page: page ?? null,
            next: articles.next ?? null,
            prev: articles.previous ?? null,
            totalElements: articles.totalElements ?? null,
            totalPages: articles.totalPages ?? null,
            pageSize: articles.pageSize ?? null,
        };
    }, [page, articles])

    const { configs: configsPure } = useSelector((state) => state.config);


    const dispatch = useDispatch();

    const configs = useMemo(() => {

        let parsedConf = {};
        configsPure?.forEach((item) => {
            let key = item.key;
            let value = item.value;
            parsedConf[key] = value;
        });

        return parsedConf;
    }, [configsPure])

    useEffect(() => {


        dispatch(setMetadata(generateMetadata(configs, SEO)))

    }, [configs, SEO])
    return (
        <div>
            <h1>{articles.seo_h1 ? articles.seo_h1 : articles.title}</h1>

            <div className="mtp__news">
                {articles.content && articles.content.length > 0 &&
                    <div className="mtp__news">
                        {
                            articles.content.map(card => (
                                <AppArticlesCard key={card.id} card={card} />
                            ))
                        }
                    </div>
                }

                <AppArticlesPagination pagination={pagination} />
            </div>
        </div>
    );
};

export default AppArticles;