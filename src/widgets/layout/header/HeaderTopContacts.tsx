import React from "react";
import AppMenuItem from "../AppMenuItem";
import { filterPhone } from 'shared/lib';
import headerStyles from "@/assets/styles/base/base.module.scss";

interface HeaderTopContactsProps {
  onCopyEmail: (value: string, event: any) => void;
}

const HeaderTopContacts: React.FC<HeaderTopContactsProps> = ({ onCopyEmail }) => {
  return (
    <div className="xl:flex hidden gap-[2px] fixed h-[50px] top-[2px] right-[196px] z-[51] mix-blend-difference">
      <div
        className={`w-[368px] ${headerStyles.header__bg} !backdrop-filter-none gap-[8px] mix-blend-difference  h-full`}
      >
        <AppMenuItem
          className="w-[160px] !justify-center"
          onClick={(e) => {
            onCopyEmail("info@nvsert.ru", e);
          }}
          item={{
            href: "#",
            label: "info@nvsert.ru",
          }}
          isActive={false}
        />

        <AppMenuItem
          className="flex-1 !justify-center"
          item={{
            href: filterPhone("8 800 700-33-75"),
            label: "8 800 700-33-75",
          }}
          isActive={false}
        />
      </div>
    </div>
  );
};

export default HeaderTopContacts;


