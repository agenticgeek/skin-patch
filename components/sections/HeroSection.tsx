"use client";

import AuroraBackground from "@/components/AuroraBackground";
import HeroStretchTitle from "@/components/hero/HeroStretchTitle";
import HeroIllustration from "@/components/illustrations/HeroIllustration";
import { useLanguage } from "@/context/LanguageContext";

const SHOPIFY_URL = "https://hmd0yd-ri.myshopify.com/products/skin-recovery-patch?variant=57317070733689";

export default function HeroSection() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      className="scene hero"
      data-screen-label="01 Hero"
      id="section-hero"
    >
      <AuroraBackground hero />

      <div className="container">
        <div className="hero-grid reveal">
          <div className="hero-meta stagger-child">
            <span className="hero-num">
              § I <span className="of">/ VII</span>
            </span>
            <span className="hero-tag-right">METCARE®</span>
          </div>

          <HeroStretchTitle />

          <p className="hero-eyebrow stagger-child">
            Recovery Lifestyle Innovation™
          </p>

          <div className="hero-rail stagger-child" aria-hidden="true">
            <div className="hero-rail-inner">
              {[...h.rail, ...h.rail, ...h.rail, ...h.rail].map((item, i) => (
                i % h.rail.length === h.rail.length - 1
                  ? [<span key={`item-${i}`}>{item}</span>, <span key={`sep-${i}`} className="sep">·</span>]
                  : [<span key={`item-${i}`}>{item}</span>, <span key={`sep-${i}`} className="sep">·</span>]
              ))}
            </div>
          </div>

          <div className="hero-bottom">
            <blockquote className="hero-lede-block rise-item">
              <p className="hero-lede">{h.lede}</p>
            </blockquote>

            <aside className="hero-panel rise-item" aria-label={h.attrsLabel}>
              <div
                className="hero-attrs"
                data-grid-motion
                data-rise-stagger
                aria-label={h.attrsLabel}
              >
                {h.attrs.map((v, i) => (
                  <div className="attr rise-item" key={i}>
                    <span className="i">{String(i + 1).padStart(2, "0")}</span>
                    <span className="v">{v}</span>
                  </div>
                ))}
              </div>

              <div className="hero-cta-wrap">
                <p className="hero-tag">{h.tag}</p>
                <a
                  className="cta cta-hero"
                  href={SHOPIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {h.cta}
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
                <small className="hero-sub-note">{h.subNote}</small>
              </div>
            </aside>
          </div>

          <div className="hero-scroll stagger-child" aria-hidden="true">
            <span className="line" />
            <span className="label">SCROLL · § II</span>
          </div>
        </div>

        <div className="hero-side">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
