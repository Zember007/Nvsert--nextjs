'use client';
import '@/assets/styles/article.scss'
import AppBreadcrumbs from '@/components/general/AppBreadcrumbs';
import AppSidebar from '@/components/general/AppSidebar';
import AppArticle from '@/components/pages/AppArticle';
import AppArticles from '@/components/pages/AppArticles';
import { updateActionNavigation } from '@/store/navigation';
import { resetPages, updateActionPages } from '@/store/pages';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const Page = () => {
    const searchParams = useSearchParams();
    const { slug } = useParams();


    const dispatch = useDispatch()

    const { navigation } = useSelector(state => state.navigation)
    const { pages: pageData, error } = useSelector(state => state.pages)

    const page = searchParams.page ? searchParams.page : 1

    const route = slug ? slug.join('/') : null;

    const ordering = searchParams.ordering ? searchParams.ordering : ''

    const search = searchParams.search ? searchParams.search : ''

    const okp = searchParams.okp ? searchParams.okp : ''
    const tnved = searchParams.tnved ? searchParams.tnved : ''

    const breadcrumbs = pageData.breadcrumbs ?? []

    const init = async () => {
        dispatch(resetPages())

        dispatch(updateActionPages({ route, ordering, page, search, okp, tnved }))

    }

    useEffect(() => {

        init()


    }, [searchParams])

    useEffect(() => {
        if (error) {
            notFound()
        }
    }, [error])
    return (
        <div>
            <main className="article">
                <div className="wrapper">
                    <AppBreadcrumbs root="/" breadcrumbs={breadcrumbs} />

                    <div className="article__wrapper">

                        <button onClick={(e) => {
                            e.preventDefault()
                            toogleMobileSidebar()
                        }}
                            className="cat-menu__btn js-cat-menu-btn btn btn--l btn--primary" type="button">
                            <span className="btn-text">Категории</span>
                        </button>
                        <div className="cat-menu js-cat-menu">
                            <AppSidebar />
                        </div>


                        <div className="mtp">
                            {pageData.type === 'section' ?

                                <AppArticles />

                                :

                                <>
                                    <AppArticle />
                                </>

                            }
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default Page;