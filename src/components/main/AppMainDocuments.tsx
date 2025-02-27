import MainDocumentItem from "./MainDocumentItem";
import ImdDoc from '@/assets/images/main-gallery/1.webp'
import ImdDoc1 from '@/assets/images/main-gallery/1.webp'

const documents = [
    {
        title: 'Сертификат соответствия ГОСТ Р',
        img: ImdDoc,
        content: {
            text: 'Подтверждает соответствие продукции российским национальным стандартам. Обязателен для реализации определённых товаров на рынке РФ.',
            text1: 'Полный перечень технических регламентов ТС'
        },
        content1: [
            {

                title: 'Необходимые документы для оформления',
                list: [
                    'Стандарт по которому произведена продукция — например ГОСТ или Технические условия (ТУ)',
                    'Заявка по форме (форма заявки предоставляется нами)',
                    'Паспорт продукции',
                    'Инструкция по применению',
                    'ТНВЭД, ОКПД-2 – помогаем подобрать бесплатно',
                    'Если у вас нет какого‑либо документа — мы оформим'
                ]
            }
        ]
    },
    {
        title: 'Декларация соответствия ГОСТ Р',
        img: ImdDoc1,
        content: {
            text: 'Подтверждает соответствие продукции установленным стандартам и техническим условиям. Облегчает вывод товара на рынок и формирует доверие у потребителей.',
            text1: 'Полный перечень технических регламентов ДС'
        },
        content1: [
            {
                title: 'Необходимые документы для оформления',
                list: [
                    'Стандарт по которому произведена продукция — например ГОСТ или Технические условия (ТУ) ',
                    'Заявка по форме (форма заявки предоставляется нами)',
                    'Паспорт продукции — если нет оформим',
                    'Инструкция по применению',
                    'Руководство эксплуатации',
                    'ТНВЭД, ОКПД-2 (помогаем подобрать бесплатно)',
                    'Если у вас нет какого‑либо документа — мы оформим'
                ]
            }
        ]
    },
    {
        title: '',
        img: '',
        content: {
            text: '',
            text1: ''
        },
        content1: [
            {
                title: '',
                list: [
                    ''
                ]
            }
        ]
    },
    {
        title: '',
        img: '',
        content: {
            text: '',
            text1: ''
        },
        content1: [
            {
                title: '',
                list: [
                    ''
                ]
            }
        ]
    },
    {
        title: '',
        img: '',
        content: {
            text: '',
            text1: ''
        },
        content1: [
            {
                title: '',
                list: [
                    ''
                ]
            }
        ]
    },
    {
        title: '',
        img: '',
        content: {
            text: '',
            text1: ''
        },
        content1: [
            {
                title: '',
                list: [
                    ''
                ]
            }
        ]
    },
    {
        title: '',
        img: '',
        content: {
            text: '',
            text1: ''
        },
        content1: [
            {
                title: '',
                list: [
                    ''
                ]
            }
        ]
    }
]

const AppMainDocuments = () => {
    return (
        <section className="py-[75px] flex flex-col gap-[50px]">
            <div className="wrapper">

                <h2 className="text-[56px] text-[#000000]">Мы оформляем следующие документы</h2>

            </div>
            <div className="flex flex-col">
                {
                    documents.map((item, index) =>
                        <MainDocumentItem key={index} {...item} />
                    )
                }
            </div>
        </section>
    );
};

export default AppMainDocuments;