import { SVGProps, useId } from "react";


const QuestionArrow = () => {
    const clipPathId = useId();
    return (
        <svg
            className='  group-hover:*:*:stroke-[#34446D] *:transition-all '
            width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className='group-hover:fill-[#FFF] transition-all' x="1" y="1" width="24" height="24" rx="2" fill="#34446D" />
            <g clipPath={`url(#${clipPathId})`}> 
                <path d="M5.81677 13H20.1832" stroke="white" strokeWidth="2" strokeLinejoin="round"  />
                <path d="M16.0785 8.8953L20.1832 13L16.0785 17.1047" stroke="white" strokeWidth="2" strokeLinejoin="round"  />
            </g>
            <defs>
                <clipPath id={clipPathId}>
                    <rect width="17.4147" height="17.4147" fill="white" transform="translate(0.685913 13) rotate(-45)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default QuestionArrow;