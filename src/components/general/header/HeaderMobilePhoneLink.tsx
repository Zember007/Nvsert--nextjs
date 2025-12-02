import React from "react";
import Link from "next/link";
import { filterPhone } from "@/hook/filter";
import headerStyles from "@/assets/styles/sections/header.module.scss";

interface HeaderMobilePhoneLinkProps {
  burgerMenuActive: boolean;
}

const HeaderMobilePhoneLink: React.FC<HeaderMobilePhoneLinkProps> = ({
  burgerMenuActive,
}) => {
  return (
    <Link
      href={filterPhone("8 495 777-11-97")}
      className={` ${headerStyles.header__bg} w-[50px] justify-center !p-0  xl:!hidden !backdrop-filter-none ${
        burgerMenuActive ? "active" : "mix-blend-difference"
      } fixed h-[50px] top-[2px] right-[58px] z-[51] `}
      aria-label="8 495 777-11-97"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.82667 13.3867C9.74667 17.16 12.84 20.24 16.6133 22.1733L19.5467 19.24C19.9067 18.88 20.44 18.76 20.9067 18.92C22.4 19.4133 24.0133 19.68 25.6667 19.68C26.4 19.68 27 20.28 27 21.0133V25.6667C27 26.4 26.4 27 25.6667 27C13.1467 27 3 16.8533 3 4.33333C3 3.6 3.6 3 4.33333 3H9C9.73333 3 10.3333 3.6 10.3333 4.33333C10.3333 6 10.6 7.6 11.0933 9.09333C11.24 9.56 11.1333 10.08 10.76 10.4533L7.82667 13.3867Z"
          fill={burgerMenuActive ? "#000" : "#fff"}
        />
      </svg>
    </Link>
  );
};

export default HeaderMobilePhoneLink;


