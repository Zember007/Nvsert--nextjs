import React, { ReactElement, ReactNode } from 'react';
import styles from "./Header.module.scss";
import Link from 'next/link';

interface MenuItem {
    label: ReactNode;
    href: string;
}

const AppMenuItem: React.FC<{
    item: MenuItem;
    classNameBox?: string;
    isActive: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    isHeader?: boolean;
}> = React.memo(({ item, isActive, onClick, className = '', classNameBox = '', isHeader = false }) => {

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

      


    };

 

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        e.currentTarget.style.setProperty("--last-mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--last-mouse-y", `${y}px`);

    };

    const getClassName = () => {
        const classes = [styles["menu-item"], className];
        if (isHeader) classes.push(styles["header-item"]);
        if (isActive) classes.push(styles["menu-item-active"]);
        return classes.join(" ");
    };

    const content = (
        <>
            {typeof item.label === 'string' ? <span>{item.label}</span> : item.label}
        </>
    );

    return (
        <>
            {item.href === '#' ? (
                <button
                    type="button"
                    className={getClassName()}
                    aria-label={extractTextFromReactNode(item.label)}
                    onMouseMove={handleMouseMove}
                    onClick={handleClick}
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
                    onMouseLeave={handleMouseLeave}>
                    {content}
                </Link>
            )}
        </>
    );
});

AppMenuItem.displayName = "MenuItem";

export default AppMenuItem;
