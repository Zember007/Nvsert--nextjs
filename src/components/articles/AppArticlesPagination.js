import { useRouter, useSearchParams } from "next/navigation";


const AppArticlesPagination = ({ pagination }) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentRange = Array.from(Array(pagination.totalPages).keys()).slice(
        2,
        pagination.totalPages
    )

    const strictedRange = currentRange.slice(
        Number(pagination.page) - 4 > 0
            ? Number(pagination.page) - 4
            : 0,
        Number(pagination.page) + 1
    );


    const hasPrevDots = Number(pagination.page) - 2 > 1 ? true : false;


    const hasPostDots = pagination.totalPages - Number(pagination.page) > 3
        ? true
        : false;


    function pageRedirect(num) {

        const params = new URLSearchParams(searchParams.toString());

        if (params.get('page') && params.get('page') == num) return;

        params.set('page', num);

        router.push(`${window.location.pathname}?${params.toString()}`);
    }
    return (
        <>
            {pagination.totalPages > 1 &&
                <nav className="pagination">
                    <ul className="pagination__list">
                        <li className="pagination__item">
                            <button
                                className={`pagination__link ${1 == pagination.page && 'active'}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    pageRedirect(1)
                                }}
                            >
                                1
                            </button>
                        </li>

                        {hasPrevDots && <li className="pagination__item" >. . .</li>}

                        {strictedRange.map(item => (
                            <li key={item.id} className="pagination__item">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        pageRedirect(item)
                                    }}
                                    className={`pagination__link ${item == pagination.page && 'active'}`}>
                                    {item}
                                </button>
                            </li >
                        ))}

                        {hasPostDots && <li className="pagination__item" >. . .</li>}

                        <li className="pagination__item">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    pageRedirect(pagination.totalPages)
                                }}
                                className={`pagination__link ${pagination.totalPages == pagination.page && 'active'}`}
                            >
                                {pagination.totalPages}
                            </button>
                        </li >
                    </ul >
                </nav >}
        </>
    );
};

export default AppArticlesPagination;