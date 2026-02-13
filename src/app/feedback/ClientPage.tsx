'use client';
import React from 'react';
import { CollapseSection, StandardPageLayout } from 'widgets/layout';
import { useButton } from 'shared/hooks';
import stylesBtn from '@/assets/styles/base/base.module.scss';
import { FeedbackCategoryGroup } from '@/types/feedback';
import FeedbackCard from 'widgets/feedback/FeedbackCard';
import { useTranslation } from 'react-i18next';





const ClientPage: React.FC<{ initialCategories: FeedbackCategoryGroup[] }> = ({ initialCategories }) => {
    const { t } = useTranslation();
    // Оптимизация LCP: по умолчанию открываем только первую категорию,
    // чтобы не рендерить все карточки и изображения сразу
    const [openGroups, setOpenGroups] = React.useState<number[]>(() =>
        initialCategories.length > 0 ? [initialCategories[0].id] : []
    );

    const toggleGroup = (id: number) => {
        setOpenGroups(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const { setWrapperRef, setButtonRef } = useButton();

    const [mainOpen, setMainOpen] = React.useState<boolean>(true);



    // Элементы для правой навигации
    const dotNavItems = initialCategories.map(cat => ({
        id: cat.id,
        title: cat.title,
        active: openGroups.includes(cat.id),
        href: '#block-' + cat.id
    }));

    

    return (

        <StandardPageLayout
            title={t('feedback.page.title')}
            breadcrumbs={[{ id: 2, title: t('navigation.reviews'), full_slug: '/feedback' }]}
            dotNavItems={dotNavItems}
            showButton={true}
        >
            <CollapseSection
                title={t('feedback.page.introTitle')}
                isOpen={mainOpen}
                onToggle={() => {
                    setMainOpen(!mainOpen);
                }}
            >
                <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                    {t('feedback.page.introText1')}
                </div>
                <div className="h-[15px]"></div>
                <div className="text-[16px] leading-[1.5] text-[#000] font-light tracking-[-0.01em]">
                    {t('feedback.page.introText2')}
                </div>
            </CollapseSection>

            <div ref={setWrapperRef} className={`${stylesBtn.tariffWrap} w-[250px] self-end`}>
                <button
                    onClick={() => {
                        if (openGroups.length > 0) {
                            setOpenGroups([]);
                        } else {
                            setOpenGroups(initialCategories.map(c => c.id));
                        }
                    }}
                    ref={setButtonRef}
                    className={`${stylesBtn.btnIconAn} ${stylesBtn.width_23} ${stylesBtn.tariff} bg-[#F5F5F2] h-[50px] rounded-[4px] text-[20px] font-light border border-[#93969d] flex items-center justify-center`}
                >
                    <span className={`${stylesBtn.sendText}`}>
                        {openGroups.length > 0 ? t('feedback.toggle.collapse') : t('feedback.toggle.expand')}
                    </span>
                    <span className={`${stylesBtn.sendIconLeft}`}>
                        <svg
                            className={`${openGroups.length > 0 ? '' : 'rotate-180'} transition-all`}
                            width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.1049 7.72888L17.1338 7.73442L17.1533 15.6286L17.155 16.6434L17.1567 17.6568L7.23434 17.6339L7.22952 15.6043L13.69 15.621L9.37014 11.3012L10.8018 9.86951L15.1217 14.1894L15.1049 7.72888Z"
                                fill="black"
                            />
                            <path
                                d="M7.2572 9.1715L8.67142 7.75728L6.5501 5.63596L5.13588 7.05018L7.2572 9.1715Z"
                                fill="black"
                            />
                        </svg>
                    </span>
                </button>
            </div>

            {initialCategories.map(cat => {
                const isOpen = openGroups.includes(cat.id);
                return (
                    <div key={cat.id} id={'block-' + cat.id} className="w-full">
                        <CollapseSection title={cat.title} isOpen={isOpen} onToggle={() => toggleGroup(cat.id)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                                {cat.items.map(item => (
                                    <FeedbackCard key={item.id} item={item} />
                                ))}
                            </div>
                        </CollapseSection>
                    </div>
                );
            })}
        </StandardPageLayout>

    );
};

export default ClientPage;


