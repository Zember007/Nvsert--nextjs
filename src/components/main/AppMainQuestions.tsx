import { filterPrepositions } from '@/hook/filter';
import AppMainFormSecondary from '../forms/AppMainFormSecondary';
import GuaranteeCard from './elements/GuaranteeCard'; // Импортируем новый компонент

const AppMainQuestions = () => {


  const guarantees = [
    {
      title: 'Надёжность и защита',
      items: [
        {
          subtitle: 'Соответствие стандартам',
          text: 'Сертификация проводится в полном соответствии с российскими государственными стандартами.'
        },
        {
          subtitle: 'Официальность документов',
          text: 'Все сертификаты оформляются легитимно, регистрируются в государственных реестрах Российской Федерации.'
        },
        {
          subtitle: 'Защита данных',
          text: 'Мы гарантируем конфиденциальность и надёжную защиту ваших данных.'
        }
      ]
    },
    {
      title: 'Финансовые гарантии и честность',
      items: [
        {
          subtitle: 'Фиксированная стоимость',
          text: 'После заключения договора цена не изменится.'
        },
        {
          subtitle: 'Бесплатные корректировки',
          text: 'До полного утверждения документов, мы вносим все необходимые изменения без дополнительной платы.'
        },
        {
          subtitle: 'Возврат денег',
          text: 'Если сертификация невозможна или есть ошибка, устраним её или вернём средства.'
        }
      ]
    },
    {},
    {},
    {
      title: 'Оперативность и удобство',
      items: [
        {
          subtitle: 'Строгое соблюдение сроков',
          text: 'Мы гарантируем выполнение всех работ в срок.'
        },
        {
          subtitle: 'Экспресс-сертификация',
          text: 'Срочная обработка документов, чтобы выйти на рынок как можно быстрее.'
        },
        {
          subtitle: 'Персональный менеджер',
          text: 'Специалист, который будет сопровождать вас на всех этапах.'
        }
      ]
    },
    {
      title: 'Поддержка после сертификации',
      items: [
        {
          subtitle: 'Продление без забот',
          text: 'Обновим сертификат, сделав процесс простым, удобным, с минимальными затратами вашего времени и средств.'
        },
        {
          subtitle: 'Бесплатные консультации',
          text: 'Обеспечиваем полное сопровождение по любым вопросам, связанным с вашими документами.'
        }
      ]
    }
  ];

  return (
    <section className="py-[75px]">
      <div className="wrapper flex flex-col gap-[40px]">
        <h2 className="leading-[1] tracking-[-0.04em] text-center l:text-left text-[24px] xs:text-[40px] l:text-[56px]">
          Гарантии и безупречный сервис
        </h2>
        <div className="grid grid-cols-3 gap-x-[22px] gap-y-[100px] relative z-[0]">
          <div className="logo !w-[800px] !h-[160px] !z-[-1] pointer-events-none absolute top-1/2 left-[-10px] translate-y-[-50%]">
            <i className="icon icon--logo"></i>
          </div>

          {guarantees.map((guarantee, index) => (
            <div key={index}>

              {
                guarantee.title ?
                  <GuaranteeCard
                    key={index}
                    title={guarantee.title}
                    items={guarantee.items}
                  />
                  :
                  <div></div>
              }

            </div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default AppMainQuestions;