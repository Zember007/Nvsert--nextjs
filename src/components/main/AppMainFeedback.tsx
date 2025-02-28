import FeedImg from '@/assets/images/feedback/1.webp'
import Image from 'next/image';

const AppMainFeedback = () => {
    return (
        <section className="py-[75px]">
            <div className="wrapper flex flex-col gap-[50px]">
                <h2 className="text-[56px]">Реальные отзывы клиентов</h2>

                <div className="flex gap-[20px]">
                    <div className="relative z-[0] h-[280px] w-[310px] cursor-pointer group hover:text-[#FFF]">
                        <div className="group-hover:translate-y-[-35px] group-hover:rotate-[-4.29deg] absolute z-[-1] top-0 bottom-0 left-0 right-0 overflow-hidden rounded-[10px] transition-all duration-300">
                            <Image src={FeedImg} alt='feedback' />
                        </div>
                        <div className="p-[20px] bg-[#FFF] h-full rounded-[10px] flex flex-col justify-between group-hover:translate-y-[45px] group-hover:rotate-[4.29deg]  group-hover:bg-[#00000099] transition-all duration-300 backdrop-blur-[10px]">
                            <span className="text-[18px] font-bold">
                                ООО «Центр стандартизации»
                            </span>

                            <p className='whitespace-pre-wrap text-[16px] '>
                                {
                                    `По результатам взаимодействия стоит отметить:

отличную организацию работ, связанных с сертификацией;

грамотные и оперативные предложения по решению поставленных задач`
                                }
                            </p>

                        </div>
                    </div>

                    <div className="relative z-[0] h-[280px] w-[310px] cursor-pointer group hover:text-[#FFF]">
                        <div className="group-hover:translate-y-[-35px] group-hover:rotate-[-4.29deg] absolute z-[-1] top-0 bottom-0 left-0 right-0 overflow-hidden rounded-[10px] transition-all duration-300">
                            <Image src={FeedImg} alt='feedback' />
                        </div>
                        <div className="p-[20px] bg-[#FFF] h-full rounded-[10px] flex flex-col justify-between group-hover:translate-y-[45px] group-hover:rotate-[4.29deg]  group-hover:bg-[#00000099] transition-all duration-300 backdrop-blur-[10px]">
                            <span className="text-[18px] font-bold">
                                ООО «Центр стандартизации»
                            </span>

                            <p className='whitespace-pre-wrap text-[16px] '>
                                {
                                    `По результатам взаимодействия стоит отметить:

отличную организацию работ, связанных с сертификацией;

грамотные и оперативные предложения по решению поставленных задач`
                                }
                            </p>

                        </div>
                    </div>

                    <div className="relative z-[0] h-[280px] w-[310px] cursor-pointer group hover:text-[#FFF]">
                        <div className="group-hover:translate-y-[-35px] group-hover:rotate-[-4.29deg] absolute z-[-1] top-0 bottom-0 left-0 right-0 overflow-hidden rounded-[10px] transition-all duration-300">
                            <Image src={FeedImg} alt='feedback' />
                        </div>
                        <div className="p-[20px] bg-[#FFF] h-full rounded-[10px] flex flex-col justify-between group-hover:translate-y-[45px] group-hover:rotate-[4.29deg]  group-hover:bg-[#00000099] transition-all duration-300 backdrop-blur-[10px]">
                            <span className="text-[18px] font-bold">
                                ООО «Центр стандартизации»
                            </span>

                            <p className='whitespace-pre-wrap text-[16px] '>
                                {
                                    `По результатам взаимодействия стоит отметить:

отличную организацию работ, связанных с сертификацией;

грамотные и оперативные предложения по решению поставленных задач`
                                }
                            </p>

                        </div>
                    </div>

                    <div className="relative z-[0] h-[280px] w-[310px] cursor-pointer group hover:text-[#FFF]">
                        <div className="group-hover:translate-y-[-35px] group-hover:rotate-[-4.29deg] absolute z-[-1] top-0 bottom-0 left-0 right-0 overflow-hidden rounded-[10px] transition-all duration-300">
                            <Image src={FeedImg} alt='feedback' />
                        </div>
                        <div className="p-[20px] bg-[#FFF] h-full rounded-[10px] flex flex-col justify-between group-hover:translate-y-[45px] group-hover:rotate-[4.29deg]  group-hover:bg-[#00000099] transition-all duration-300 backdrop-blur-[10px]">
                            <span className="text-[18px] font-bold">
                                ООО «Центр стандартизации»
                            </span>

                            <p className='whitespace-pre-wrap text-[16px] '>
                                {
                                    `По результатам взаимодействия стоит отметить:

отличную организацию работ, связанных с сертификацией;

грамотные и оперативные предложения по решению поставленных задач`
                                }
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppMainFeedback;