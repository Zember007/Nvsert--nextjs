import AppMainFormSecondary from '../forms/AppMainFormSecondary';
import AppMainDropdown from './elements/AppMainDropdown'
const AppMainQuestions = () => {
    return (
        <section className="py-[75px]">
            <div className="wrapper flex flex-col gap-[50px]">
                <h2 className="text-[56px]">Часто задаваемые вопросы</h2>
                <div className="flex justify-between gap-[100px]">
                    <div className="flex flex-col grow">
                        <AppMainDropdown title='Как происходит сертификационный процесс?' />
                    </div>

                    <div className="p-[32px] rounded-[6px] bg-[#FFFFFF] max-w-[420px] flex flex-col gap-[20px]">
                        <h3 className='text-[32px]'>Заказать обратный звонок</h3>
                        <AppMainFormSecondary />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppMainQuestions;