"use client";

import { useEffect, useRef } from "react";

export default function ExperienceAurora() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spheres = container.querySelectorAll(".sphere");
    spheres.forEach((sphere) => {
      const s = sphere as HTMLElement;
      s.style.left = `${Math.random() * 80 + 10}%`;
      s.style.top = `${Math.random() * 80 + 10}%`;
      s.style.animationDelay = `${Math.random() * -25}s`;
      s.style.animationDuration = `${18 + Math.random() * 15}s`;
      const size = 180 + Math.random() * 220;
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
    });
  }, []);

  return (
    <div className="experience-aurora" ref={containerRef} aria-hidden="true">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="sphere" />
      ))}
      <style jsx>{`
        .experience-aurora {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          filter: blur(70px);
          opacity: 0.25;
        }
        .sphere {
          position: absolute;
          background: radial-gradient(
            circle at center,
            var(--silver-blue) 0%,
            rgba(106, 136, 164, 0) 70%
          );
          border-radius: 50%;
          animation: float ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes float {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(50px, -30px) scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}
