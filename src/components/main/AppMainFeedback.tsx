
import { PhotoProvider } from 'react-photo-view';
import Feedback from './elements/Feedback';
import 'react-photo-view/dist/react-photo-view.css';

const feedback = [
    {
        title: 'ООО «Кредо»',
        text: `Мы неоднократно обращались в Вашу организацию, надеемся на дальнейшее плодотворное сотрудничество`,
        img: '/feedback/1.webp'
    },
    {
        title: 'ООО «Центр стандартизации»',
        text: `По результатам взаимодействия стоит отметить:

отличную организацию работ, связанных с сертификацией;

грамотные и оперативные предложения по решению поставленных задач`,
        img: '/feedback/2.webp'
    },
    {
        title: 'ООО «Текстиль-эксперт»',
        text: `Порадовала ваша оперативность, клиентоориентированность и, конечно, высокий профессионализм.`,
        img: '/feedback/3.webp'
    },
    {
        title: 'ИП Топоров',
        text: `Была получена полная и подробная информация на все вопросы, получен сертификат соответствия.

Работой остались довольны, даём контактные данные знакомым, рекомендуем обращаться.`,
        img: '/feedback/4.webp'
    }
]

const AppMainFeedback = () => {
    return (
        <section className="py-[75px]">
            <div className="wrapper flex flex-col gap-[50px]">
                <h2 className="text-[56px]">Реальные отзывы клиентов</h2>
                <PhotoProvider maskOpacity={0.4}>
                <div className="flex gap-[20px]">
                    {feedback.map((item, index) => (
                        <Feedback key={index} {...item} />
                    ))}
                </div>
                </PhotoProvider>
            </div>
        </section>
    );
};

export default AppMainFeedback;