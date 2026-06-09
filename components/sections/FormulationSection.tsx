"use client";

import FormulationAurora from "@/components/illustrations/FormulationAurora";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import imgSpec from "@/assets/SKIN RECOVERY PATCH.png";
import { useLanguage } from "@/context/LanguageContext";

export default function FormulationSection() {
  const { t } = useLanguage();
  const f = t.formulation;

  return (
    <section
      className="scene beige formulation-scene"
      data-screen-label={f.screenLabel}
      id="section-5"
    >
      <FormulationAurora />
      <div className="container reveal">
        <header className="section-head">
          <div
            className="num stagger-child"
            style={{ color: "var(--cherry)", opacity: 0.55 }}
          >
            {f.num} <span className="slash">/</span> {f.numLabel}
          </div>
          <SectionTitle lines={f.title} />
          <p className="lede stagger-child">{f.lede}</p>
        </header>

        <div className="section-editorial section-editorial--reverse">
          <div className="section-editorial__content">
            <div
              className="card-label rise-item"
              style={{ color: "var(--cherry)", opacity: 0.6 }}
            >
              {f.activesLabel}
            </div>

            <div
              className="ingredient-grid"
              data-grid-motion
              data-pill-stagger
              data-rise-stagger
              aria-label={f.ariaActivesList}
            >
              {f.ingredients.map((ing, i) => (
                <article className="ic-card rise-item" key={i} tabIndex={0}>
                  <span className="ic-card-idx">{String(i + 1).padStart(2, "0")} · {f.activeLabel}</span>
                  <h3 className="ic-card-name">{ing.name}</h3>
                  <p className="ic-card-desc">{ing.desc}</p>
                </article>
              ))}
            </div>
          </div>

          <figure className="section-media section-media--portrait section-media--beige rise-item">
            <div className="section-media__frame">
              <Image
                src={imgSpec}
                alt={f.mediaTitle}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="section-media__caption">
              <span className="section-media__label">// Visuel — formulation</span>
              <span className="section-media__title">{f.mediaTitle}</span>
            </figcaption>
          </figure>
        </div>

        <article className="synergy-card-v2" aria-label={f.ariaSynergy}>
          <div className="synergy-header">
            <span className="synergy-lbl">{f.synergyIntro}</span>
            <div className="synergy-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L12 22M2 12L22 12" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="synergy-grid" data-grid-motion data-rise-stagger>
            {f.synergyLines.map((line, i) => (
              <div className="synergy-item rise-item" key={i}>
                <span className="synergy-item-idx">0{i + 1}</span>
                <span className="synergy-item-txt">{line}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
