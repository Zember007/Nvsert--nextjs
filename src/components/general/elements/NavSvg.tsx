import { useId } from "react";


const NavSvg = () => {
    const clipPathId = useId();
    return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.5" y="1.5" width="23" height="23" rx="2.5" stroke="#000" />
            <g clip-path={`url(#${clipPathId})`}>
                <path d="M5.81593 13H20.1824" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.0777 8.8953L20.1824 13L16.0777 17.1047" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id={clipPathId}>
                    <rect width="17.4147" height="17.4147" fill="white" transform="translate(0.685059 13) rotate(-45)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default NavSvg;