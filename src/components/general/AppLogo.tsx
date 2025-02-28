import Link from "next/link";

interface AppLogoProps {
  inverted?: boolean;
  className?: string
}

const AppLogo = ({ inverted = false, className }: AppLogoProps) => {
  return (
    <Link href="/" className={`logo ${className} ${inverted ? 'invert' : ''}`} title="NVSERT">
      <i className="icon icon--logo"></i>
      <i className="icon icon--logo-mob"></i>
    </Link>
  );
};

export default AppLogo;