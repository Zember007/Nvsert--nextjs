import React, { ReactElement, ReactNode } from 'react';
import styles from "./Header.module.css";
import Link from 'next/link';

interface MenuItem {
    label: ReactNode;
    href: string;
}

const AppMenuItem: React.FC<{
    item: MenuItem;
    isActive: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
}> = React.memo(({ item, isActive, onClick, className }) => {

    function extractTextFromReactNode(node: ReactNode): string {
        if (node === null || node === undefined || typeof node === 'boolean') return '';
        if (typeof node === 'string' || typeof node === 'number') return node.toString();
        if (Array.isArray(node)) return node.map(extractTextFromReactNode).join('');
        if (React.isValidElement(node)) {
            const element = node as ReactElement<any, any>;
            return extractTextFromReactNode(element.props.children);
        }
        return '';
    }

    const [isFastClick, setIsFastClick] = React.useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
        e.currentTarget.style.setProperty("--last-mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--last-mouse-y", `${y}px`);
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (item.href === '#') {
            e.preventDefault();
        }

        onClick?.(e);

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

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
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

    const content = (
        <>
            {typeof item.label === 'string' ? <span>{item.label}</span> : item.label}
        </>
    );

    return (
        <div className="overflow-x-hidden px-[1px]">
            {item.href === '#' ? (
                <button
                    type="button"
                    className={getClassName()}
                    aria-label={extractTextFromReactNode(item.label)}
                    onMouseMove={handleMouseMove}
                    onClick={handleClick}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}>
                    {content}
                </button>
            ) : (
                <Link
                    href={item.href}
                    className={getClassName()}
                    data-text={extractTextFromReactNode(item.label)}
                    onMouseMove={handleMouseMove}
                    onClick={handleClick}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}>
                    {content}
                </Link>
            )}
        </div>
    );
});

AppMenuItem.displayName = "MenuItem";

export default AppMenuItem;
