"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import img1 from "@/assets/1.png";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyDifferentSection() {
  const { t } = useLanguage();
  const w = t.whyDifferent;

  return (
    <section
      className="scene why-diff"
      data-screen-label={w.screenLabel}
      id="section-4"
    >
      <div className="container reveal">
        <header className="section-head">
          <div className="num stagger-child">
            {w.num} <span className="slash">/</span> {w.numLabel}
          </div>
          <SectionTitle lines={w.title} />
          <p className="lede stagger-child">{w.lede}</p>
        </header>

        <figure className="section-media section-media--wide section-media--beige rise-item">
          <div className="section-media__frame" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src={img1}
              alt="Produit hero · SKIN RECOVERY PATCH™"
              width={400}
              height={520}
              style={{ height: "115%", width: "auto", objectFit: "contain" }}
            />
          </div>
          <figcaption className="section-media__caption">
            <span className="section-media__label">Visuel — innovation</span>
            <span className="section-media__title">Produit hero · SKIN RECOVERY PATCH™</span>
          </figcaption>
        </figure>

        <div className="split why-split" data-grid-motion data-rise-stagger>
          <article className="card why-reflexion rise-item">
            <span className="label">{w.reflexionLabel}</span>
            <h3>{w.reflexionTitle}</h3>
            <p className="body">{w.reflexionBody1}</p>
            <p className="body" style={{ marginTop: 16 }}>{w.reflexionBody2}</p>
          </article>

          <article className="card why-benefits-panel rise-item">
            <span className="label">{w.benefitsLabel}</span>
            <div className="why-benefits" data-grid-motion data-rise-stagger role="list">
              {w.benefits.map((name, i) => (
                <div
                  className="why-benefit rise-item"
                  key={i}
                  role="listitem"
                  data-idx={String(i + 1).padStart(2, "0")}
                >
                  <span className="why-benefit-idx" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="why-benefit-name">{name}</span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="why-promise" data-rise-stagger aria-label={w.ariaPromises}>
          {w.checklist.map((txt, i) => (
            <div className="why-promise-row rise-item" key={i}>
              <span className="why-promise-mark" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6.2L4.8 8.5L9.5 3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="why-promise-txt">{txt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
