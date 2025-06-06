declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module 'simplebar-react/dist/simplebar.min.css';
declare module '@/assets/lib/react-photo-view/dist/react-photo-view.css'; 