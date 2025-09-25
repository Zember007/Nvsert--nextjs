'use client'

import { useState } from 'react';
import AppCollapsibleList from '@/components/general/AppCollapsibleList';
import AppCollapsibleContent from '@/components/general/AppCollapsibleContent';

const Page = () => {
    const [activeDistrict, setActiveDistrict] = useState<string | null>('central');

    const districts = [
        {
            id: 'central',
            name: 'Центральный федеральный округ',
            testimonials: [
                {
                    id: 1,
                    author: 'Анна Петрова',
                    company: 'ООО "СтройИнвест"',
                    text: 'Отличная работа команды! Все документы были подготовлены быстро и качественно.',
                    rating: 5
                },
                {
                    id: 2,
                    author: 'Михаил Сидоров',
                    company: 'ИП Сидоров М.А.',
                    text: 'Профессиональный подход, все сроки соблюдены. Рекомендую!',
                    rating: 5
                }
            ]
        },
        {
            id: 'northwest',
            name: 'Северо-Западный федеральный округ',
            testimonials: [
                {
                    id: 3,
                    author: 'Елена Иванова',
                    company: 'ООО "ТехноСервис"',
                    text: 'Быстро и качественно оформили все необходимые документы.',
                    rating: 5
                }
            ]
        },
        {
            id: 'southern',
            name: 'Южный федеральный округ',
            testimonials: [
                {
                    id: 4,
                    author: 'Дмитрий Козлов',
                    company: 'АО "ЮгСтрой"',
                    text: 'Отзывчивые специалисты, помогли разобраться во всех нюансах.',
                    rating: 4
                }
            ]
        }
    ];

    const navigationItems = [
        'Центральный федеральный округ',
        'Северо-Западный федеральный округ',
        'Южный федеральный округ',
        'Северо-Кавказский федеральный округ',
        'Приволжский федеральный округ',
        'Уральский федеральный округ',
        'Сибирский федеральный округ',
        'Дальневосточный федеральный округ'
    ];

    const handleDistrictToggle = (districtId: string) => {
        setActiveDistrict(activeDistrict === districtId ? null : districtId);
    };

    const renderNavigationItem = (item: string, index: number) => (
        <div key={index} className="text-[16px] text-[#161616] leading-[20px] cursor-pointer hover:text-[#34446D] transition-colors">
            {item}
        </div>
    );

    const renderTestimonial = (testimonial: any) => (
        <div key={testimonial.id} className="bg-white rounded-[8px] p-[30px] shadow-sm border border-[#E5E5E5]">
            <div className="flex items-center gap-[10px] mb-[15px]">
                <div className="flex gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-[16px] h-[16px] ${i < testimonial.rating ? 'text-[#FFD700]' : 'text-[#E5E5E5]'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            </div>
            <p className="text-[16px] text-[#161616] leading-[24px] mb-[20px]">
                {testimonial.text}
            </p>
            <div className="border-t border-[#E5E5E5] pt-[15px]">
                <div className="text-[14px] font-semibold text-[#34446D]">{testimonial.author}</div>
                <div className="text-[14px] text-[#93969D]">{testimonial.company}</div>
            </div>
        </div>
    );

    return (
        <main className='wrapper text-[#000] select-none mb-[100px]'>
            <div className="flex gap-[80px] mt-[50px]">
                {/* Left Sidebar */}
                <div className="w-[300px] flex-shrink-0">
                    <AppCollapsibleList
                        title="Отзывы по регионам"
                        items={navigationItems}
                        renderItem={renderNavigationItem}
                        defaultOpen={true}
                        className="sticky top-[100px]"
                        headerClassName="text-[20px] font-medium"
                        listClassName="flex flex-col gap-[15px]"
                        position="left"
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-[50px]">
                        <h1 className="text-[48px] font-light text-[#34446D] leading-[52px] mb-[20px]">
                            Отзывы клиентов
                        </h1>
                        <p className="text-[18px] text-[#93969D] leading-[28px] max-w-[600px]">
                            Мы ценим мнение наших клиентов и стремимся к постоянному улучшению качества наших услуг.
                        </p>
                    </div>

                    {/* Federal Districts */}
                    <div className="space-y-[40px]">
                        {districts.map((district) => (
                            <AppCollapsibleContent
                                key={district.id}
                                active={activeDistrict === district.id}
                                title={district.name}
                                onToggle={() => handleDistrictToggle(district.id)}
                                content={
                                    <div className="grid grid-cols-1 gap-[30px]">
                                        {district.testimonials.map(renderTestimonial)}
                                    </div>
                                }
                                className="mb-[30px]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;