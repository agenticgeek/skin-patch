"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HoverTarget = { line: number; index: number } | null;

const TITLE_LINES = [
  { id: "skin", text: "SKIN" },
  { id: "recovery", text: "RECOVERY" },
  { id: "patch", text: "PATCH", suffix: "™" },
] as const;

const spring = {
  type: "spring" as const,
  stiffness: 520,
  damping: 32,
  mass: 0.55,
};

function scaleForDistance(
  distance: number,
  reduced: boolean,
  compact: boolean
) {
  if (reduced || distance > 2) return 1;
  const peak = compact ? 1.24 : 1.36;
  const near = compact ? 1.1 : 1.13;
  const far = compact ? 1.03 : 1.05;
  if (distance === 0) return peak;
  if (distance === 1) return near;
  return far;
}

export default function HeroStretchTitle() {
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<HoverTarget>(null);
  const [compact, setCompact] = useState(false);

  const lines = useMemo(() => TITLE_LINES, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const clearHover = useCallback(() => setHovered(null), []);

  const setHover = useCallback((line: number, index: number) => {
    if (reducedMotion) return;
    setHovered({ line, index });
  }, [reducedMotion]);

  return (
    <h1
      className="hero-title hero-title--stretch"
      onMouseLeave={clearHover}
    >
      {lines.map((line, lineIndex) => (
        <span className="line stagger-child" key={line.id}>
          {[...line.text].map((char, charIndex) => {
            const dist =
              hovered?.line === lineIndex
                ? Math.abs(hovered.index - charIndex)
                : 99;
            const scaleX = scaleForDistance(dist, !!reducedMotion, compact);

            return (
              <motion.span
                key={`${line.id}-${charIndex}`}
                className="hero-letter"
                animate={{ scaleX }}
                transition={spring}
                style={{ transformOrigin: "50% 88%" }}
                onMouseEnter={() => setHover(lineIndex, charIndex)}
              >
                {char}
              </motion.span>
            );
          })}
          {"suffix" in line && line.suffix ? (
            <span className="tm">{line.suffix}</span>
          ) : null}
        </span>
      ))}
    </h1>
  );
}
