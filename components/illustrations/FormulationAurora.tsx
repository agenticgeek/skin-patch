"use client";

import { useEffect, useRef } from "react";
import FilmGrain from "@/components/ui/FilmGrain";

export default function FormulationAurora() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spheres = container.querySelectorAll(".formulation-aurora__sphere");
    spheres.forEach((sphere) => {
      const s = sphere as HTMLElement;
      s.style.left = `${Math.random() * 70 + 15}%`;
      s.style.top = `${Math.random() * 70 + 15}%`;
      s.style.animationDelay = `${Math.random() * -30}s`;
      s.style.animationDuration = `${20 + Math.random() * 20}s`;
      const size = 200 + Math.random() * 300;
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
    });
  }, []);

  return (
    <div className="formulation-backdrop" aria-hidden="true">
      <div className="formulation-aurora" ref={containerRef}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="formulation-aurora__sphere" />
        ))}
      </div>
      <FilmGrain
        filterId="formulation-grain-filter"
        className="formulation-grain"
      />
    </div>
  );
}
