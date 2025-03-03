import Image from "next/image";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
interface props {
    img: string;
    title: string;
    text: string;
}

const Feedback = (item: props) => {


    return (
        <PhotoProvider>
            <PhotoView src={item.img}>
                <div className="relative z-[0] h-[280px] w-[310px] cursor-pointer group hover:text-[#FFF]">
                    <div className="group-hover:translate-y-[-35px] group-hover:rotate-[-4.29deg] absolute z-[-1] top-0 bottom-0 left-0 right-0 overflow-hidden rounded-[10px] transition-all duration-300">


                        <Image src={item.img} alt='feedback'
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="w-full h-auto" />
                    </div>
                    <div className="p-[20px] bg-[#FFF] h-full rounded-[10px] flex flex-col justify-between group-hover:translate-y-[45px] group-hover:rotate-[4.29deg]  group-hover:bg-[#00000099] transition-all duration-300 backdrop-blur-[10px]">
                        <span className="text-[18px] font-bold">
                            {item.title}
                        </span>

                        <p className='whitespace-pre-wrap text-[16px] '>
                            {item.text}
                        </p>

                    </div>
                </div>
            </PhotoView>


        </PhotoProvider>
    );
};

export default Feedback;