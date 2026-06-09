"use client";

import VisionSpheres from "@/components/illustrations/VisionSpheres";
import FilmGrain from "@/components/ui/FilmGrain";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import img4 from "@/assets/4.png";
import { useLanguage } from "@/context/LanguageContext";

export default function VisionSection() {
  const { t } = useLanguage();
  const v = t.vision;

  return (
    <section
      className="scene vision-scene"
      data-screen-label={v.screenLabel}
      id="section-6"
    >
      <VisionSpheres />
      <div className="container container--narrow reveal">
        <header className="section-head">
          <div className="num stagger-child">
            {v.num} <span className="slash">/</span> {v.numLabel}
          </div>
          <SectionTitle lines={v.title} />
          <p className="lede stagger-child">{v.lede}</p>
        </header>

        <div className="section-editorial">
          <article className="vision-card rise-item" aria-label={v.cardLabel}>
            <FilmGrain filterId="vision-grain-filter" className="vision-card-grain" />
            <div>
              <span className="v-num">{v.cardLabel}</span>
              <h3>
                {v.cardTitle.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h3>
            </div>
            <div className="vlist" data-grid-motion data-rise-stagger>
              {v.visionItems.map((txt, i) => (
                <div className="vrow rise-item" key={i}>
                  <span className="v-idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="v-txt">{txt}</span>
                </div>
              ))}
            </div>
          </article>

          <figure className="section-media section-media--portrait section-media--dark rise-item">
            <div className="section-media__frame">
              <Image src={img4} alt="Ambiance spa · recovery lifestyle" fill style={{ objectFit: "cover" }} />
            </div>
            <figcaption className="section-media__caption">
              <span className="section-media__label">// Visuel — expérience</span>
              <span className="section-media__title">Ambiance spa · recovery lifestyle</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
