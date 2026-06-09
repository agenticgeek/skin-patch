"use client";

import RitualMouseAurora from "@/components/illustrations/RitualMouseAurora";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import img4 from "@/assets/4.png";
import img1 from "@/assets/1.png";
import { useLanguage } from "@/context/LanguageContext";

export default function RitualSection() {
  const { t } = useLanguage();
  const r = t.ritual;

  return (
    <section
      className="scene tinted"
      data-screen-label={r.screenLabel}
      id="section-3"
    >
      <RitualMouseAurora />
      <div className="container reveal">
        <header className="section-head">
          <div className="num stagger-child">
            {r.num} <span className="slash">/</span> {r.numLabel}
          </div>
          <SectionTitle lines={r.title} />
          <p className="lede stagger-child">{r.lede}</p>
        </header>

        <div className="section-stack">
          <figure className="section-media section-media--wide section-media--light rise-item">
            <div className="section-media__frame">
              <Image src={img4} alt={r.stepsTitle} fill style={{ objectFit: "cover" }} />
            </div>
            <figcaption className="section-media__caption">
              <span className="section-media__label">// Visuel — le rituel</span>
              <span className="section-media__title">{r.stepsTitle}</span>
            </figcaption>
          </figure>

          <div>
            <div className="card-label rise-item" style={{ color: "var(--silver-blue)" }}>
              {r.momentsLabel}
            </div>
            <div
              className="moments"
              data-grid-motion
              data-rise-stagger
              aria-label={r.momentsAriaLabel}
            >
              {r.moments.map((txt, i) => (
                <article className="moment rise-item" key={i}>
                  <span className="glyph">{String(i + 1).padStart(2, "0")}</span>
                  <span className="txt">{txt}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="section-editorial">
            <div className="ritual" aria-label={r.stepsLabel}>
              <div className="ritual-label rise-item">{r.stepsLabel}</div>
              <h3 className="rise-item">{r.stepsTitle}</h3>
              <div className="steps" data-grid-motion data-rise-stagger>
                {r.steps.map((step, i) => (
                  <div className="step rise-item" key={i}>
                    <span className="n">{step.n}</span>
                    <span className="h">{step.h}</span>
                    <span className="v">
                      {step.v.includes("\n")
                        ? step.v.split("\n").map((line, i) => (
                            <span key={i}>{line}{i === 0 && <br />}</span>
                          ))
                        : step.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <figure className="section-media section-media--square section-media--dark rise-item">
              <div className="section-media__frame">
                <Image src={img1} alt="Macro patch · texture & matière" fill style={{ objectFit: "cover" }} />
              </div>
              <figcaption className="section-media__caption">
                <span className="section-media__label">// Visuel — gestes</span>
                <span className="section-media__title">Macro patch · texture & matière</span>
              </figcaption>
            </figure>
          </div>

          <div className="quote-card rise-item">{r.quote}</div>
        </div>
      </div>
    </section>
  );
}
