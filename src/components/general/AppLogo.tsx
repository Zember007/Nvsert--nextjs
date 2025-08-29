import Link from "next/link";

interface AppLogoProps {
  inverted?: boolean;
  className?: string
}

const AppLogo = ({ inverted = false, className }: AppLogoProps) => {
  return (
    <Link href="/" className={`logo active:scale-[.9] ${className} ${inverted ? 'invert' : ''}`} title="NVSERT">
      <i className="icon icon--logo"></i>
    </Link>
  );
};

export default AppLogo;