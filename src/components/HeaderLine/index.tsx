"use client"
import { useEffect, useRef } from 'react';

export default function HeaderLine() {
    const headerLineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animateGradient = () => {
            if (headerLineRef.current) {
                headerLineRef.current.style.backgroundSize = '200% 200%';
                headerLineRef.current.style.animation = 'gradientAnimation 5s ease infinite';
            }
        };

        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            @keyframes gradientAnimation {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(styleElement);
        animateGradient();

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <div
            ref={headerLineRef}
            className="flex w-full justify-center items-center h-1"
            style={{
                background: 'linear-gradient(90deg, #DC2626 0%, #F97316 12%, #FCD34D 25%, #4D7C0F 41%, #16A34A 56.5%, #5EEAD4 72.5%, #0EA5E9 87%, #4C1D95 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientAnimation 5s ease infinite',
            }}
        />
    );
}
