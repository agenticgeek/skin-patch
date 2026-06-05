"use client";

import type { MouseEvent } from "react";
import FilmGrain from "@/components/ui/FilmGrain";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import img3 from "@/assets/3.png";

const crossSellCards = [
  {
    tilt: 0,
    num: "01",
    title: "DAY & NIGHT COLLAGEN™",
    desc: "Approche jour/nuit pensée pour soutenir la peau dans les phases de récupération.",
    pill: "Skincare",
  },
  {
    tilt: 1,
    num: "02",
    title: "TISSUE REPAIR CREAM™",
    desc: "Une crème ciblée pour accompagner le confort cutané et le ressenti de récupération.",
    pill: "Topique ciblé",
  },
  {
    tilt: 2,
    num: "03",
    title: "Drainage & confort tissulaire",
    desc: "Accompagnement expert. Recovery Experience 24h pour vivre chaque étape sereinement.",
    pill: "Accompagnement expert",
  },
];

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
  return (
    <section
      className="scene crosssell-scene"
      data-screen-label="07 Cross-sell SRP"
      id="section-7"
    >
      <div className="container reveal">
        <header className="section-head">
          <div className="num stagger-child">
            § 07 <span className="slash">/</span> Signature Recovery Protocol™
          </div>
          <SectionTitle
            lines={["Découvrez le", "SIGNATURE RECOVERY PROTOCOL™."]}
          />
        </header>

        <div className="section-stack">
          <figure className="section-media section-media--wide section-media--light rise-item">
            <div className="section-media__frame">
              <Image
                src={img3}
                alt="Gamme METCARE® · recovery protocol"
                fill
                style={{ objectFit: "cover" }}
              />
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
            <FilmGrain
              filterId="protocol-grain-filter"
              className="protocol-banner-grain"
            />
          </div>
          <span className="protocol-banner-watermark">SRP™</span>
          <div className="protocol-banner-copy">
            <span className="lbl">// Une stratégie complète</span>
            <h3>Avant, pendant et après votre intervention.</h3>
            <p>
              Une stratégie complète de récupération esthétique développée par
              METCARE® pour accompagner votre corps, votre peau et votre confort
              à chaque étape du parcours.
            </p>
          </div>
          <div className="protocol-banner-action">
            <a
              className="cta cta-protocol"
              href="#"
              data-href-placeholder="SRP-protocol-url"
            >
              Découvrir le protocole
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <span className="protocol-banner-note">
              // placeholder url — client to supply
            </span>
          </div>
        </article>

        <div className="crosssell" data-grid-motion data-rise-stagger>
          {crossSellCards.map((card) => (
            <article
              className="tilt-card recovery-card rise-item"
              data-tilt={card.tilt}
              key={card.num}
              onMouseMove={handleCardMove}
              onMouseLeave={resetCardTilt}
            >
              <span className="recovery-card-ghost" aria-hidden="true">
                {card.num}
              </span>
              <div className="recovery-card-top">
                <span className="num">{card.num} / SRP™</span>
                <span className="recovery-card-arrow" aria-hidden="true">
                  ↗
                </span>
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
