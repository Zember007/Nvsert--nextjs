import Link from "next/link";

const AppLogo = ({inverted}) => {
    return (
        <Link href="/" className={`logo ${inverted && 'invert'}`} title="NVSERT">
            <i className="icon icon--logo"></i>
            <i className="icon icon--logo-mob"></i>
        </Link>
    );
};

export default AppLogo;