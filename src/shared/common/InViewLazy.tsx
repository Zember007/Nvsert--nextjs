 'use client'
 
 import { useEffect, useRef, useState, ReactNode } from 'react';
 
 interface InViewLazyProps {
   children: ReactNode;
   placeholder?: ReactNode;
 }
 
 export default function InViewLazy({ children, placeholder }: InViewLazyProps) {
   const ref = useRef<HTMLDivElement | null>(null);
   const [visible, setVisible] = useState(false);
 
   useEffect(() => {
     if (visible) return;
     const el = ref.current;
     if (!el) return;
 
     const observer = new IntersectionObserver(
       (entries) => {
         const entry = entries[0];
         if (entry.isIntersecting) {
           setVisible(true);
           observer.disconnect();
         }
       },
       { rootMargin: '200px 0px' }
     );
 
     observer.observe(el);
     return () => observer.disconnect();
   }, [visible]);
 
   return <div ref={ref}>{visible ? children : (placeholder ?? null)}</div>;
 }
 

