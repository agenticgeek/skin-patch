"use client";

import ExperienceAurora from "@/components/illustrations/ExperienceAurora";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import img3 from "@/assets/3.png";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperienceSection() {
  const { t } = useLanguage();
  const e = t.experience;

  return (
    <section
      className="scene"
      data-screen-label={e.screenLabel}
      id="section-2"
    >
      <ExperienceAurora />
      <div className="container reveal">
        <header className="section-head">
          <div className="num stagger-child">
            {e.num} <span className="slash">/</span> {e.numLabel}
          </div>
          <SectionTitle lines={e.title} />
          <p className="lede stagger-child">{e.lede}</p>
        </header>

        <div className="section-editorial section-editorial--reverse">
          <div className="section-editorial__content">
            <div className="split split--luxe" data-grid-motion data-rise-stagger>
              <article className="card card--luxe rise-item">
                <span className="card--luxe__chrome" aria-hidden="true" />
                <span className="label">{e.originLabel}</span>
                <h3>{e.originTitle}</h3>
                <p className="body">{e.originBody}</p>
              </article>

              <div
                className="list-card list-card--luxe"
                data-grid-motion
                data-rise-stagger
                aria-label={e.profileLabel}
              >
                <header className="list-card--luxe__head">
                  <span className="label">{e.profileLabel}</span>
                  <p className="list-card--luxe__sub">{e.profileSub}</p>
                </header>
                {e.symptoms.map((txt, i) => (
                  <div className="row rise-item" key={i}>
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="txt silver">{txt}</span>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="quote-card quote-card--luxe rise-item">
              <span className="quote-card--luxe__mark" aria-hidden="true">//</span>
              <p>{e.quote}</p>
            </blockquote>
          </div>

          <figure className="section-media section-media--portrait section-media--light rise-item">
            <div className="section-media__frame">
              <Image
                src={img3}
                alt="Portrait lifestyle · application du patch"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="section-media__caption">
              <span className="section-media__label">// Visuel — expérience recovery</span>
              <span className="section-media__title">Portrait lifestyle · application du patch</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
