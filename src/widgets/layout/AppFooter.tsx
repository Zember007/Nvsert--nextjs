import { memo } from "react";
import FooterTopMenu from "./footer/FooterTopMenu";
import FooterContacts from "./footer/FooterContacts";
import FooterBottomLegal from "./footer/FooterBottomLegal";
import footerStyles from "@/assets/styles/base/base.module.scss";

const AppFooter = () => {
  return (
    <footer className={`${footerStyles.footer} grid gap-[2px]`}>
      <div className="grid gap-[2px] xl:grid-cols-[586px_1fr]">
        <FooterBottomLegal />
        <FooterTopMenu />
      </div>
      <FooterContacts />
    </footer>
  );
};

export default memo(AppFooter);