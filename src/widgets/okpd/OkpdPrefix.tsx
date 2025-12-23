import React from 'react';

const OkpdPrefix = ({ position, hasChild = true }: { position: 'middle' | 'bottom', hasChild?: boolean }) => {
    return (
        <>
            {hasChild ? <div className=" border-[#34446D] border-l absolute top-0 left-0 h-[18px] z-10">
                <svg className={`absolute left-0 ${position === 'middle' ? 'top-1/2   -translate-y-1/2' : 'bottom-0 '}`} width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 2.88672L0 -3.26633e-05V5.77347L5 2.88672ZM0 2.88672V3.38672H0.5V2.88672V2.38672H0V2.88672Z" fill="#34446D" />
                </svg>
            </div> :
                <span className="absolute top-0 left-0 h-[20px] z-10 flex items-center">
                    <svg width="4" height="1" viewBox="0 0 4 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="4" y2="0.5" stroke="#34446D" />
                    </svg>
                </span>}
        </>
    );
};

export default OkpdPrefix;