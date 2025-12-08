import { memo } from "react";
import dynamic from "next/dynamic";
import FooterTopMenu from "./footer/FooterTopMenu";
import FooterContacts from "./footer/FooterContacts";
import FooterBottomLegal from "./footer/FooterBottomLegal";
import footerStyles from "@/assets/styles/base/base.module.scss";

const DynamicFooterMarquee = dynamic(
  () => import("./footer/FooterMarquee"),
  { ssr: false }
);

const AppFooter = () => {
  return (
    <footer className={`${footerStyles.footer} grid xl:grid-cols-2 gap-[2px]`}>
      <FooterTopMenu />
      <FooterContacts />
      <FooterBottomLegal />
      <DynamicFooterMarquee />
    </footer>
  );
};

export default memo(AppFooter);