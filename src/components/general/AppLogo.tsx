import Link from "next/link";
import logoStyles from '@/assets/styles/blocks/logo.module.scss';
import headerStyles from '@/assets/styles/base/base.module.scss';

interface AppLogoProps {
  inverted?: boolean;
  className?: string
}

const AppLogo = ({ inverted = false, className }: AppLogoProps) => {

  return (
    <Link
      href="/"
      className={`${headerStyles.logo} active:scale-[.9] ${className} ${
        inverted ? headerStyles.invert : ""
      }`}
      title="NVSERT"
    >
      <i className={`${headerStyles.icon} ${logoStyles.icon_logo}`}></i>
    </Link>
  );
};

export default AppLogo;