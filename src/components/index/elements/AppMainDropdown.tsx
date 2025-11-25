import ArrowImg from '@/assets/images/svg/arrow-main.svg'
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import '@/assets/styles/sections/main/dropdown.scss';

interface props {
    title: string,
    node: string
}

const Dropdown = ({ title, node }: props) => {

    const [active, setActive] = useState(false)
    const [listHidden, setListHidden] = useState(true)
    return (
        <div className={`dropdown-container ${active ? 'active' : ''}`}>
          
                <div className="dropdown-border">
                    <div
                        onClick={() => {
                            setActive(!active)
                        }}
                        className="dropdown-header">
                        <p>{title}</p>
                        <Image className={`dropdown-arrow ${active ? 'active' : ''}`} alt='arrow' src={ArrowImg} width={24} height={24} />
                    </div>
                    <div className={`dropdown-content ${active ? 'active' : ''}`}
                    dangerouslySetInnerHTML={{ __html: node }}>                  
                    </div>
                </div>

            
        </div>
    );
};

export default Dropdown;