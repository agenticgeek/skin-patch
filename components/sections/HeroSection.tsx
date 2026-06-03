import Link from "next/link";
import AuroraBackground from "@/components/AuroraBackground";
import HeroStretchTitle from "@/components/hero/HeroStretchTitle";
import HeroIllustration from "@/components/illustrations/HeroIllustration";
export default function HeroSection() {
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
              <span>HYDRATATION</span>
              <span className="sep">·</span>
              <span>FRAÎCHEUR</span>
              <span className="sep">·</span>
              <span>CONFORT</span>
              <span className="sep">·</span>
              <span>RECOVERY RITUAL™</span>
              <span className="sep">·</span>
              <span>HYDRATATION</span>
              <span className="sep">·</span>
              <span>FRAÎCHEUR</span>
              <span className="sep">·</span>
              <span>CONFORT</span>
              <span className="sep">·</span>
              <span>RECOVERY RITUAL™</span>
              <span className="sep">·</span>
              {/* Duplicate for seamless loop */}
              <span>HYDRATATION</span>
              <span className="sep">·</span>
              <span>FRAÎCHEUR</span>
              <span className="sep">·</span>
              <span>CONFORT</span>
              <span className="sep">·</span>
              <span>RECOVERY RITUAL™</span>
              <span className="sep">·</span>
              <span>HYDRATATION</span>
              <span className="sep">·</span>
              <span>FRAÎCHEUR</span>
              <span className="sep">·</span>
              <span>CONFORT</span>
              <span className="sep">·</span>
              <span>RECOVERY RITUAL™</span>
            </div>
          </div>

          <div className="hero-bottom">
            <blockquote className="hero-lede-block rise-item">
              <p className="hero-lede">
                Inspiré de l&apos;expertise METCARE® du parcours de récupération
                esthétique, le SKIN RECOVERY PATCH™ accompagne toutes les phases
                où la peau a besoin de plus de fraîcheur, de confort et
                d&apos;hydratation.
              </p>
            </blockquote>

            <aside className="hero-panel rise-item" aria-label="Bénéfices et commande">
              <div
                className="hero-attrs"
                data-grid-motion
                data-rise-stagger
                aria-label="Bénéfices clés"
              >
                <div className="attr rise-item">
                  <span className="i">01</span>
                  <span className="v">Hydratation.</span>
                </div>
                <div className="attr rise-item">
                  <span className="i">02</span>
                  <span className="v">Fraîcheur.</span>
                </div>
                <div className="attr rise-item">
                  <span className="i">03</span>
                  <span className="v">Confort.</span>
                </div>
                <div className="attr rise-item">
                  <span className="i">04</span>
                  <span className="v">Recovery Ritual™.</span>
                </div>
              </div>

              <div className="hero-cta-wrap">
                <p className="hero-tag">
                  Parce que votre peau mérite aussi sa récupération.
                </p>
                <Link className="cta cta-hero" href="/checkout">
                  Commander mes SKIN RECOVERY PATCH™
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <small className="hero-sub-note">
                  Livraison premium — Paiement sécurisé
                </small>
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
