"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    };

    const onMouseDown = () => {
      cursor.classList.add("active");
    };

    const onMouseUp = () => {
      cursor.classList.remove("active");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} />
      <div className="custom-cursor-dot" ref={dotRef} />
      <style jsx global>{`
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border: 1px solid var(--silver-blue);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s ease-out, width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
          margin: -20px 0 0 -20px;
          mix-blend-mode: difference;
        }
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          background: var(--silver-blue);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          margin: -3px 0 0 -3px;
        }
        .custom-cursor.active {
          width: 60px;
          height: 60px;
          margin: -30px 0 0 -30px;
          border-color: var(--cherry);
        }
        @media (max-width: 768px) {
          .custom-cursor, .custom-cursor-dot { display: none; }
        }
      `}</style>
    </>
  );
}
