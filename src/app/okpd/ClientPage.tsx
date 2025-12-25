'use client';
import { StandardPageLayout } from 'widgets/layout';
import OkpdHierarchy, { Okpd2Item } from '@/widgets/okpd/OkpdHierarchy';
import FilesList from '@/widgets/okpd/FilesList';
import textSize from '@/assets/styles/base/base.module.scss';
import Image from 'next/image';
import SearchIcon from '@/assets/images/svg/search.svg';

const ClientPage = ({ initialItems }: { initialItems: Okpd2Item[] }) => {

    const dotNavItems = [
        {
            id: 1,
            title: 'Быстрый поиск кода ОКПД\u00A02',
            active: false,
            href: `#`
        },
        {
            id: 2,
            title: 'Классификатор ОКПД 2',
            active: false,
            href: `#`
        },
        {
            id: 3,
            title: 'Что такое ОКПД 2?',
            active: false,
            href: `#`
        },
        {
            id: 4,
            title: 'Структура кода ОКПД 2',
            active: false,
            href: `#`
        },
        {
            id: 5,
            title: 'ОКПД 2 vs ОКВЭД2: Ключевое Различие',
            active: false,
            href: `#`
        },
    ];

    return (

        <StandardPageLayout
            title="ОКПД 2"
            breadcrumbs={[{ id: 2, title: 'ОКПД 2', full_slug: '/okpd' }]}
            dotNavItems={dotNavItems}
            contentColumn={<FilesList />}
            showButton={true}
        >
            <div className="flex flex-col">
                <p className={`${textSize.headerH4} text-[#34446D] border-b border-[#34446D] mb-[20px]`}>Быстрый поиск кода ОКПД 2</p>
                <div className="flex rounded-[4px] border border-[#34446D] overflow-hidden mb-[10px]">
                    <label className="px-[15px] py-[14px] flex-1">
                        <input type="text"
                            placeholder='Поиск по продукту или коду'
                            className={`${textSize.text1} w-full placeholder:text-black/50 h-full outline-none`}
                        />

                    </label>
                    <button className={`text-[20px] py-[16px] px-[15px] bg-[#34446D] font-normal text-[#FFF] flex items-center gap-[10px]`}>
                        <Image src={SearchIcon} alt="search" width={18} height={18} />
                        <span>Найти</span>
                    </button>
                </div>
                <span className={`${textSize.text3} font-light`}>например: «мебель детская», «приборы медицинские», 25.11.23</span>
            </div>

            <h2 className={`${textSize.headerH3} `}>Классификатор ОКПД 2</h2>

            <p className={`${textSize.text2} font-normal text-[#93969D]`}>РАЗДЕЛ A — ПРОДУКЦИЯ СЕЛЬСКОГО, ЛЕСНОГО И РЫБНОГО ХОЗЯЙСТВА</p>

            <OkpdHierarchy items={initialItems} />
        </StandardPageLayout>

    );
};

export default ClientPage;


