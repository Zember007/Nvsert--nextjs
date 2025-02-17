import { useState } from "react";
import { useSelector } from "react-redux";
import AppArticleGallery from "../article/AppArticleGallery";
import Docs from "../article/Docs";
import Staff from "../article/Staff";


const AppArticle = () => {

    const [navigationOrdering, setNavigationOrdering] = useState('')

    const { pages: article, SEO } = useSelector(state => state.pages)

    const pageTitle = article.seo_h1 ? article.seo_h1 : article.title

    return (
        <div>
            <h1>{pageTitle}</h1>

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