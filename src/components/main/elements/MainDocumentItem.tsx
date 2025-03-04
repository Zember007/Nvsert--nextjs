import ArrowImg from '@/assets/images/svg/arrow-main.svg'
import Image from 'next/image';
import { useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface content {
    text: string,
    text1?: string
}

interface content1 {
    title: string
    list: string[]
}

interface props {
    img: string | StaticImport,
    title: string,
    content: content,
    content1: content1[],
}

const MainDocumentItem = ({ img, title, content, content1 }: props) => {

    const [active, setActive] = useState(false)
    const [listHidden, setListHidden] = useState(true)
    return (
        <div className={`${active && 'bg-[#FFF]'} hover:bg-[#FFF] transition-all duration-300 cursor-pointer`}>
            <div className="wrapper">
                <div className="border-0 border-t border-b border-solid border-[#00000033]  flex flex-col">
                    <div
                        onClick={() => {
                            setActive(!active)
                        }}
                        className="flex items-center justify-between py-[23px]">
                        <p className="text-[20px] text-[#000] font-bold tracking-normal">{title}</p>
                        <Image className={`${!active && 'rotate-[180deg]'} transition-all duration-300`} alt='arrow' src={ArrowImg} width={24} height={24} />
                    </div>
                    <div className={` flex justify-between items-stretch gap-[10px] transition-all duration-300 overflow-hidden max-h-0 ${active && '!max-h-[1200px] pb-[23px]'}`}>
                        <div>
                            {img && <Image alt='document' src={img} />}
                        </div>

                        <div className=" flex flex-col justify-between  items-start">
                            <div className="flex flex-col gap-[40px]">
                                <p className='text-[16px] text-[#000000] max-w-[360px]'>
                                    {content.text}
                                </p>
                                <p className='text-[16px] text-[#000000] max-w-[300px]'>
                                    {content.text1}
                                </p>
                            </div>
                            <button className='px-[30px] py-[18px] text-[20px] font-bold rounded-[4px] bg-[#000000] leading-[1] text-[#FFF]'>
                                Оформить заявку
                            </button>
                        </div>

                        <div className="flex gap-[10px] flex-col max-w-[500px] text-[#000]">

                            {
                                content1.map((cont, contIndex) => (
                                    <div key={contIndex} className='flex gap-[10px] flex-col'>
                                        <p className='text-[20px] font-bold'>{cont.title}</p>

                                        <ul className=' list-disc pl-[20px] flex flex-col gap-[6px]'>

                                            {
                                                cont.list.map((list, index) => (
                                                    <li className={`${listHidden && index > 4 && 'hidden'}`} key={index}>{list}</li>
                                                ))
                                            }

                                        </ul>


                                        {
                                            listHidden && <button
                                                onClick={() => setListHidden(false)}
                                            >Показать полный список документов 🡣</button>
                                        }
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MainDocumentItem;