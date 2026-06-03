"use client";

import { useEffect, useRef } from "react";

export default function RitualMouseAurora() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const section = root.closest("section");
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const target = { x: 0.5, y: 0.45 };
    const current = { x: 0.5, y: 0.45 };
    const blobs = root.querySelectorAll<HTMLElement>(".ritual-mouse-aurora__blob");

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = (e.clientY - rect.top) / rect.height;
    };

    const onLeave = () => {
      target.x = 0.5;
      target.y = 0.45;
    };

    let raf = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;

      root.style.setProperty("--mx", current.x.toFixed(4));
      root.style.setProperty("--my", current.y.toFixed(4));

      blobs.forEach((blob, i) => {
        const depth = 0.12 + i * 0.06;
        const ox = (current.x - 0.5) * (28 + i * 14);
        const oy = (current.y - 0.5) * (22 + i * 12);
        blob.style.transform = `translate3d(${ox}%, ${oy}%, 0) scale(${1 + i * 0.06})`;
      });

      raf = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    if (reducedMotion) {
      root.style.setProperty("--mx", "0.5");
      root.style.setProperty("--my", "0.45");
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ritual-mouse-aurora" ref={rootRef} aria-hidden="true">
      <span className="ritual-mouse-aurora__blob ritual-mouse-aurora__blob--a" />
      <span className="ritual-mouse-aurora__blob ritual-mouse-aurora__blob--b" />
      <span className="ritual-mouse-aurora__blob ritual-mouse-aurora__blob--c" />
      <span className="ritual-mouse-aurora__blob ritual-mouse-aurora__blob--d" />
    </div>
  );
}
