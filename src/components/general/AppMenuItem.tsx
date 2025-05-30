import React, { ReactNode } from 'react';
import styles from "./Header.module.css";
import Link from 'next/link';

interface MenuItem {
    label: string | ReactNode;
    href: string;
}

const AppMenuItem: React.FC<{ item: MenuItem; isActive: boolean, onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void, className?: string }> = React.memo(
    ({ item, isActive, onClick, className }) => {
        const [isFastClick, setIsFastClick] = React.useState(false);

        const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
            e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
            e.currentTarget.style.setProperty("--last-mouse-x", `${x}px`);
            e.currentTarget.style.setProperty("--last-mouse-y", `${y}px`);
        };

        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (item.href === '#') {
                e.preventDefault()
            }
            onClick && onClick(e)
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            e.currentTarget.style.setProperty("--click-x", `${x}px`);
            e.currentTarget.style.setProperty("--click-y", `${y}px`);

            setIsFastClick(true);

            const handleRouteChange = () => {
                setTimeout(() => {
                    setIsFastClick(false);
                }, 120);
            };

            window.addEventListener("beforeunload", handleRouteChange);

            return () => {
                window.removeEventListener("beforeunload", handleRouteChange);
            };
        };

        const handleMouseUp = () => {
            setTimeout(() => {
                setIsFastClick(false);
            }, 120);
        };

        const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            e.currentTarget.style.setProperty("--last-mouse-x", `${x}px`);
            e.currentTarget.style.setProperty("--last-mouse-y", `${y}px`);

            setIsFastClick(false);
        };

        const getClassName = () => {
            const classes = [styles["menu-item"], className];
            if (isActive) classes.push(styles["menu-item-active"]);
            if (isFastClick) classes.push(styles["fast-click"]);
            return classes.join(" ");
        };

        return (
            <div className="overflow-x-hidden px-[1px]">
                <Link
                    href={item.href}
                    className={getClassName()}
                    data-text={item.label}
                    onMouseMove={handleMouseMove}
                    onClick={handleClick}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}>
                    {typeof item.label === 'string' ?
                        <span>{item.label}</span>
                        :
                        item.label
                    }
                    <div className={styles.highlight} />
                </Link>
            </div>
        );
    }
);

AppMenuItem.displayName = "MenuItem";

export default AppMenuItem;