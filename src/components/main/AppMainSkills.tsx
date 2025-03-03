import FolderImg from '@/assets/images/folder.webp'
import Image from 'next/image';


const AppMainSkills = () => {

    const skills = [
        {
            title: 'Гибкие условия оплаты',
            text: 'Возможность оплаты по факту оказания услуг, рассрочка и индивидуальный подход к каждому клиенту.',
            btn: 'Оформить заявку',
            action: '',
            bg: 'secondary',
            empty: false,
            folder: false
        },
        {
            title: 'Индивидуальные условия работы',
            text: 'Предлагаем персональное сопровождение на всех этапах — от консультации до доставки готовых документов.',
            btn: 'Оставить заявку',
            action: '',
            bg: 'primary',
            empty: false,
            folder: false
        },
        {
            empty: true,
            folder: false
        },
        {
            empty: false,
            folder: true
        },
        {
            empty: true,
            folder: false
        },
        {
            title: 'Работаем по договору',
            text: 'Предлагаем прозрачные условия сотрудничества. Минимальный пакет документов, необходимый для старта сертификации, чтобы максимально ускорить процесс получения необходимых разрешений.',
            btn: 'Заказать обратный звонок',
            action: '',
            bg: 'primary',
            empty: false,
            folder: false
        },
        {
            title: 'Широкая область аккредитации',
            text: 'Охватываем производственные, медицинские, строительные, технологические, пищевые и многие другие отрасли.',
            btn: 'Все услуги по отраслям',
            action: '',
            bg: 'primary',
            empty: false,
            folder: false
        },
        {
            empty: true,
            folder: false
        },
        {
            empty: false,
            folder: true
        },

        {
            title: 'Оперативность',
            text: 'Получение документов в кратчайшие сроки, без задержек. Многие документы оформляются уже в течение 1–3 дней.',
            btn: 'Перейти к услугам',
            action: '',
            bg: 'primary',
            empty: false,
            folder: false
        },
        {
            empty: true,
            folder: false
        },
        {
            title: 'Более 15 лет опыта',
            text: 'Имеем безупречную репутацию Оформили более 1 млн документов',
            btn: 'Подробнее о компании',
            action: '',
            bg: 'secondary',
            empty: false,
            folder: false
        },
    ]
    return (
        <section className="py-[75px]">
            <div className="wrapper flex flex-col gap-[50px]">
                <h2 className="text-[56px]">Наши основные преимущества</h2>

                <div className="grid grid-cols-4 gap-[20px]">
                    {
                        skills.map((skill, index) => (
                            <div key={index}>
                                {skill.empty ? (<div></div>)
                                    : skill.folder ? (
                                        <div className={`rounded-[4px] overflow-hidden bg-[#FFF] w-full h-[280px]`}>
                                            <Image alt='folder' src={FolderImg} height={280} />
                                        </div>
                                    )
                                        :
                                        <div className={`rounded-[4px] flex  group flex-col gap-[20px] justify-between p-[20px] text-[${skill.bg !== 'secondary' ? '#000' : '#FFF'}] bg-[${skill.bg === 'secondary' ? '#00000099' : '#FFF'}] h-[280px] w-full`}>
                                            <span className={`font-bold text-[20px]`}>
                                                {skill.title}
                                            </span>
                                            <div className='grow'>
                                                <p className={`group-hover:translate-y-[0px] translate-y-[10px] group-hover:opacity-100 opacity-0 transition-all duration-500`}>
                                                    {skill.text}
                                                </p>
                                            </div>
                                            <button className="rebound-box group/item w-full flex items-center text-left">
                                                <span className="text-[18px] group-hover/item:w-full overflow-hidden whitespace-nowrap  w-0 transition-all duration-300">{skill.btn}</span>
                                                <svg className="rebound" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 12H21" stroke={`${skill.bg !== 'secondary' ? '#000' : '#FFF'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M16 7L21 12L16 17" stroke={`${skill.bg !== 'secondary' ? '#000' : '#FFF'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>

                                            </button>
                                        </div >
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </section >
    );
};

export default AppMainSkills;