import ClientPage, { type ContactsPageData } from './ClientPage';
import type { Metadata } from 'next';

async function getContactsPageData(): Promise<ContactsPageData> {
  try {
    const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
    const res = await fetch(`${base}/api/contacts-page`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch contacts-page');
    const json = await res.json();
    if (!json?.data) throw new Error('Invalid contacts-page response');
    return json.data as ContactsPageData;
  } catch (e) {
    // Fallback контент, чтобы страница не ломалась до заполнения в Strapi
    return {
      title: 'Контакты',
      intro:
        '<p>У нас несколько офисов в разных регионах, чтобы быть ближе к клиентам.<br/>Но география не ограничивает сотрудничество — мы успешно оформляем документы дистанционно, с компаниями из любой точки России и СНГ.</p>',
      offices: [
        {
          city: 'Москва',
          address: 'г. Москва, ул. Маршала Тимошенко, дом. 4, помещение I, комната 2',
          phones: ['+7 495 777-11-97', '+7 800 700-33-75'],
          email: 'info@nvsert.ru',
        },
        {
          city: 'Санкт-Петербург',
          address: 'г. Санкт-Петербург, Химический пер., д. 1, лит. БД',
          phones: ['+7 812 648-02-51', '8 800 700-33-75'],
          email: 'info@nvsert.ru',
        },
        {
          city: 'Псков',
          address: 'г. Псков, Рижский проспект, д. 16',
          phones: ['+7 8112 56-44-96', '8 800 700-33-75'],
          email: 'info@nvsert.ru',
        },
      ],
      connectSection: {
        spoilerTitle: 'Связаться с нами',
        heading: 'Не знаете, какой документ оформить?',
        description:
          '<p>Мы знаем требования технических регламентов, работаем напрямую с аккредитованными органами и помогаем избежать ошибок при выборе типа документа.<br/><br/>Если хотите разобраться, какой документ нужен именно для вашего товара — оформите заявку и специалист перезвонит вам.</p>',
        consultationTitle: 'Начните оформление с бесплатной консультации',
        consultationText:
          '<p>Отправьте заявку — и эксперт NVSERT свяжется с вами, чтобы определить нужные документы и рассчитать сроки оформления.<br/><br/>Без бюрократии и лишних этапов — только точные решения под ваш продукт.</p>',
        consultationButtonLabel: 'Заказать звонок',
        featureCards: [
          {
            title: 'Получите ответ уже сегодня',
            text: 'Заполните заявку, и специалист свяжется с вами, чтобы объяснить, какие документы подойдут именно вашему бизнесу. Мы быстро подберём оптимальный пакет и поможем пройти сертификацию без ошибок.',
          },
          {
            title: 'Индивидуальное сопровождение',
            text: 'Каждый клиент получает персонального менеджера, который ведёт проект от заявки до получения готового сертификата. Мы всегда на связи и контролируем все этапы оформления.',
          },
          {
            title: 'Работаем с любыми отраслями',
            text: 'Помогаем производителям, импортёрам, торговым сетям и стартапам. Подбираем решения под специфику продукции — от бытовой техники до медицинских изделий.',
          },
        ],
      },
      requisitesSection: {
        spoilerTitle: 'Реквизиты',
        heading: 'Юридические данные',
        description:
          '<p>Вся деятельность компании NVSERT ведётся в строгом соответствии с законодательством Российской Федерации.<br/><br/>Мы заключаем официальные договоры на оказание услуг, предоставляем полный пакет закрывающих документов и работаем по безналичному расчёту.<br/><br/>Ниже указаны наши юридические данные, которые вы можете использовать для заключения договора, выставления счёта или бухгалтерского учёта.</p>',
        downloadButtonLabel: 'Скачать реквизиты',
        pdfUrl: '/Реквизиты_ЦЕНТР_СТАНДАРТИЗАЦИИ_ООО.pdf',
        legal: {
          fullName: 'Общество с ограниченной ответственностью «ЦЕНТР СТАНДАРТИЗАЦИИ»',
          shortName: 'ООО «ЦЕНТР СТАНДАРТИЗАЦИИ»',
          inn: '6027189146',
          kpp: '602701001',
          ogrn: '1186027004217',
          legalAddress:
            '180007, Псковская область, г.о. Город Псков, г Псков, пр-кт Рижский, дом 16, помещение 1001, кабинет 9',
          director: 'Владимиров Владимир Михайлович',
          chiefAccountant: 'Владимиров Владимир Михайлович',
          accountNumber: '40702810232380003475',
          bank: 'ФИЛИАЛ «САНКТ-ПЕТЕРБУРГСКИЙ» АО «АЛЬФА-БАНК»',
          bik: '044030786',
          corrAccount: '30101810600000000786',
          phone: '+7 (8112) 564496',
          email: 'centr2760@yandex.ru',
        },
      },
      seo: {
        metaTitle: 'Контакты - NVSERT',
        metaDescription: 'Контакты компании NVSERT: офисы, телефоны, почта, реквизиты.',
      },
    };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactsPageData();
  const title = data.seo?.metaTitle || data.title || 'Контакты';
  const description = data.seo?.metaDescription || 'Контакты компании';

  return {
    title,
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nvsert.ru'}/contacts`,
    },
  };
}

const Page = async () => {
  const data = await getContactsPageData();
  return <ClientPage data={data} />;
};

export default Page;
