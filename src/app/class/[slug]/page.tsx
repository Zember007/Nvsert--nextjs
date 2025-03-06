'use client';
import '@/assets/styles/article.scss'
import AppClassSpoiler from "@/components/class/AppClassSpoiler";
import AppBreadcrumbs from "@/components/general/AppBreadcrumbs";
import { notFound, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActionMoreСlass, updateActionСlass } from '@/store/class'

const Page = () => {

    const dispatch = useDispatch()

    const [pageSize, setPageSize] = useState(20);
    const [page, setPage] = useState(1);
    const [observer, setObserver] = useState(null);

    const searchParams = useSearchParams()
    const pathname = usePathname()

    const type = pathname.replace('/class/', '') + '/'

    const title = useMemo(() => {
        switch (type) {
            case 'okp/':
                return 'ОКП';
            case 'tnved/':
                return 'ТН ВЭД';
            default:
                return '';
        }
    }, [type])

    const ordering = searchParams.ordering ? searchParams.ordering : '';
    const search = searchParams.search ? searchParams.search : '';

    const { class: documents } = useSelector(state => state.class)

    function fetchData() {

        if (type !== 'tnved/' && type !== 'okp/') {
            notFound()
        }

        let url = type;
        if (url === 'tnved/') {
            url = 'tn'
        } else {
            url = 'okp'
        }



        dispatch(updateActionСlass({
            type: url,
            ordering: ordering,
            page: page,
            pageSize: pageSize,
        }))
    }

    function fetchMore() {
        if (type !== 'tnved/' && type !== 'okp/') {
            notFound()
        }
        let url = type;
        if (url === 'tnved/') {
            url = 'tn'
        } else {
            url = 'okp'
        }
        dispatch(updateActionMoreСlass({
            type: url,
            ordering,
            page,
            pageSize,
        }))
    }

    async function showMore() {
        if (page < documents.totalPages) {
            console.log(
                '🚀 ~ file: _.vue ~ line 83 ~ showMore ~ showMore',
                'showMore'
            );
            setPage(page + 1)
            fetchMore();
        }
    }

    function onElementObserved() {
        setObserver(new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (
                    entry.intersectionRatio > 0 &&
                    page < documents.totalPages
                ) {
                    showMore();
                }
            });
        }))
        if (observer) {
            observer.observe(observerTarget.current);
        }
    }

    const observerTarget = useRef(null)

    useEffect(() => {
        onElementObserved()

        fetchData()
        

    }, [])

    return (
        <div className="article">
            <div className="wrapper">

                <AppBreadcrumbs root="/type/" title={title} />
                <div className="article__wrapper">
                    <div className="mtp">
                        <h1>{title}</h1>

                        <div className="mtp__spoiler js-spoiler">
                            {documents.content?.map((spoiler, index) => <AppClassSpoiler
                                key={index}
                                spoiler={spoiler}
                                slug={type}
                            />)}
                        </div>

                        <div ref={observerTarget} className="observer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;