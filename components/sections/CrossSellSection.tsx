"use client";

import type { MouseEvent } from "react";
import FilmGrain from "@/components/ui/FilmGrain";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import img3 from "@/assets/3.png";
import { useLanguage } from "@/context/LanguageContext";

const SHOPIFY_URL = "https://hmd0yd-ri.myshopify.com/products/skin-recovery-patch?variant=57317070733689";

function handleCardMove(e: MouseEvent<HTMLElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.setProperty("--tilt-x", `${(y * -10).toFixed(2)}deg`);
  card.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
}

function resetCardTilt(e: MouseEvent<HTMLElement>) {
  const card = e.currentTarget;
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
}

export default function CrossSellSection() {
  const { t } = useLanguage();
  const c = t.crossSell;

  return (
    <section
      className="scene crosssell-scene"
      data-screen-label={c.screenLabel}
      id="section-7"
    >
      <div className="container reveal">
        <header className="section-head">
          <div className="num stagger-child">
            {c.num} <span className="slash">/</span> {c.numLabel}
          </div>
          <SectionTitle lines={c.title} />
        </header>

        <div className="section-stack">
          <figure className="section-media section-media--wide section-media--light rise-item">
            <div className="section-media__frame">
              <Image src={img3} alt="Gamme METCARE® · recovery protocol" fill style={{ objectFit: "cover" }} />
            </div>
            <figcaption className="section-media__caption">
              <span className="section-media__label">// Visuel — protocole</span>
              <span className="section-media__title">Gamme METCARE® · recovery protocol</span>
            </figcaption>
          </figure>

          <article className="protocol-banner rise-item">
            <div className="protocol-banner-media" aria-hidden="true">
              <div className="protocol-banner-aurora">
                <span className="blob blob-a" />
                <span className="blob blob-b" />
                <span className="blob blob-c" />
              </div>
              <FilmGrain filterId="protocol-grain-filter" className="protocol-banner-grain" />
            </div>
            <span className="protocol-banner-watermark">SRP™</span>
            <div className="protocol-banner-copy">
              <span className="lbl">{c.bannerLabel}</span>
              <h3>{c.bannerTitle}</h3>
              <p>{c.bannerBody}</p>
            </div>
            <div className="protocol-banner-action">
              <a
                className="cta cta-protocol"
                href={SHOPIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.bannerCta}
                <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </article>

          <div className="crosssell" data-grid-motion data-rise-stagger>
            {c.cards.map((card) => (
              <article
                className="tilt-card recovery-card rise-item"
                data-tilt={card.num}
                key={card.num}
                onMouseMove={handleCardMove}
                onMouseLeave={resetCardTilt}
              >
                <span className="recovery-card-ghost" aria-hidden="true">{card.num}</span>
                <div className="recovery-card-top">
                  <span className="num">{card.num} / SRP™</span>
                  <span className="recovery-card-arrow" aria-hidden="true">↗</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className="pill-mini">{card.pill}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
