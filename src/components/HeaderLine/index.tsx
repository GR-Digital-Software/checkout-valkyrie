"use client";
import { useEffect, useRef } from "react";

export default function HeaderLine({ colors }: { colors: string[] }) {
  const headerLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateGradient = () => {
      if (headerLineRef.current) {
        headerLineRef.current.style.backgroundSize = "200% 200%";
        headerLineRef.current.style.animation =
          "gradientAnimation 5s ease infinite";
      }
    };

    const styleElement = document.createElement("style");
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
        background: `linear-gradient(90deg, ${colors?.[0]} 25%, ${colors?.[1]} 50%, ${colors?.[2]} 75%, ${colors?.[3]} 100%)`,
        backgroundSize: "200% 200%",
        animation: "gradientAnimation 5s ease infinite",
      }}
    />
  );
}
