import React from "react";
import Link from "next/link";
import { useButton } from "@/hook/useButton";
import { Services } from "@/store/navigation";

interface ServicesQuickLinksProps {
  services: Services[];
  active: boolean;
  onLinkClick: () => void;
}

const ServicesQuickLinks: React.FC<ServicesQuickLinksProps> = ({
  services,
  active,
  onLinkClick,
}) => {
  const { setButtonRef, setWrapperRef } = useButton();

  return (
    <div
      className={`services-menu-box menu-headers  ${
        active ? "active" : ""
      }`}
    >
      <div className="services-menu h-[50px] js-services-menu relative ">
        <div className="services-menu__wrapper ">
          <div className="grid grid-cols-6 h-[50px] w-full xxxl:gap-[30px] gap-[8px]">
            {services.map((item, i) => (
              <div ref={setWrapperRef} key={i} className="tariff-wrap ">
                <Link
                  onClick={onLinkClick}
                  href={`/services#${item.name}`}
                  ref={setButtonRef}
                  className="text-[#FFF] line-after__box xxl:pl-[5px] h-full text-center btnIconAn transition-all duration-100 active:scale-95 flex !gap-[9px]"
                >
                  <p className="text-1  line-after stop-color font-light">
                    {item.title}
                  </p>
                  <div className="sendIconLeft !w-auto">
                    <svg
                      width="24"
                      height="14"
                      viewBox="0 0 24 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 8V6H0V8H3ZM18 0L16.5 1.2957L20.5 6H6V8H20.5L16.5 12.7034L18 14L24 7L18 0Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesQuickLinks;


