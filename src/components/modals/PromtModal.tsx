import { ReactNode, useEffect, useState } from "react";

const PromtModal = ({ children, content, timer }: { children: ReactNode, content: ReactNode, timer?: number }) => {
    const [active, setActive] = useState(false)
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (!active || !timer) return
        if(timerId) clearTimeout(timerId)

        setTimerId(setTimeout(() => {
            setActive(false)
        },timer))
    }, [active])
    return (
        <div className="relative">
            <div className={`${!active && 'opacity-0 unvisible'} duration-300 ease transition-all  absolute right-0 top-[-8px] translate-y-[-100%] bg-[#00000080] backdrop-blur-[20px] rounded-[4px] p-[15px]`}>
                {content}
            </div>
            <div
                onClick={() => { setActive(!timer ? !active : true) }}>
                {children}
            </div>
        </div>
    );
};

export default PromtModal;