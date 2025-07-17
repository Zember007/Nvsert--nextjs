import { ReactNode, useEffect, useState } from "react";

const PromtModal = ({className = '', children, content, timer, classNameBox = '' }: { classNameBox?:string, className?:string, children: ReactNode, content: ReactNode, timer?: number }) => {
    const [active, setActive] = useState(false)
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if(timerId) clearTimeout(timerId)
        if (!active || !timer) return

        setTimerId(setTimeout(() => {
            setActive(false)
        },timer))
    }, [active])
    return (
        <div className={`${classNameBox} relative w-full`}>
            <div className={`${!active ? 'opacity-0 unvisible pointer-events-none' : ''} ${className} duration-300 ease transition-all  absolute right-0 top-[-8px] translate-y-[-100%] bg-[#00000080] backdrop-blur-[20px] rounded-[4px] p-[15px]`}>
                {content}
            </div>
            <div
                className="w-full"
                onClick={() => { setActive(!timer ? !active : true) }}>
                {children}
            </div>
        </div>
    );
};

export default PromtModal;