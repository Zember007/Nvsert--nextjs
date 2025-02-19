import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppArticleGallery from "../article/AppArticleGallery";
import Docs from "../article/Docs";
import Staff from "../article/Staff";
import { generateMetadata } from "@/hook/useHead";
import { setMetadata } from "@/store/metadata";


const AppArticle = () => {

    const [navigationOrdering, setNavigationOrdering] = useState('')

    const { pages: article, SEO } = useSelector(state => state.pages)

    const pageTitle = article.seo_h1 ? article.seo_h1 : article.title

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
            {pageTitle && <h1>{pageTitle}</h1>}

            {article.full_text &&
                <div dangerouslySetInnerHTML={{ __html: article.full_text }}></div>
            }


            {article.media && article.media.length > 0 &&
                <>
                    <AppArticleGallery media={article.media} />
                </>
            }



            {article && article.files_list && article.files_list.length > 0 &&
                <>
                    <Docs docs={article.files_list} />
                </>
            }

            {article && article.show_staff &&
                <>
                    <Staff />
                </>
            }

        </div>
    );
};

export default AppArticle;