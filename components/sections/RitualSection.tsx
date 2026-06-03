import type { ReactNode } from "react";
import RitualMouseAurora from "@/components/illustrations/RitualMouseAurora";
import SectionMedia from "@/components/ui/SectionMedia";
import SectionTitle from "@/components/ui/SectionTitle";

const moments = [
  "Après une intervention esthétique.",
  "Après un voyage.",
  "Après une longue journée.",
  "Après une exposition extérieure.",
  "Après les moments où la peau semble plus fragile ou inconfortable.",
];

type RitualStep = {
  n: string;
  h: string;
  v: ReactNode;
};

const steps: RitualStep[] = [
  { n: "Geste 01", h: "Le patch, sur la zone choisie.", v: "Appliquer." },
  { n: "Geste 02", h: "Inspirer, expirer, ressentir.", v: "Respirer." },
  { n: "Geste 03", h: "Quelques minutes de pause.", v: "Ralentir." },
  {
    n: "Geste 04",
    h: "Le geste devient rituel.",
    v: (
      <>
        Prendre
        <br />
        soin de soi.
      </>
    ),
  },
];

export default function RitualSection() {
  return (
    <section
      className="scene tinted"
      data-screen-label="03 Rituel Recovery"
      id="section-3"
    >
      <RitualMouseAurora />
      <div className="container reveal">
        <header className="section-head">
          <div className="num stagger-child">
            § 03 <span className="slash">/</span> Le Rituel Recovery METCARE®
          </div>
          <SectionTitle
            lines={["Un véritable rituel", "de récupération cutanée."]}
          />
          <p className="lede stagger-child">
            Le SKIN RECOVERY PATCH™ a été pensé pour devenir un moment de
            fraîcheur, de confort et de douceur dans le quotidien.
          </p>
        </header>

        <div className="section-stack">
          <SectionMedia
            aspect="wide"
            tone="light"
            label="// Visuel — le rituel"
            title="Séquence gestuelle · Recovery Ritual™"
          />

          <div>
            <div
              className="card-label rise-item"
              style={{ color: "var(--silver-blue)" }}
            >
              Les moments d&apos;application
            </div>
            <div
              className="moments"
              data-grid-motion
              data-rise-stagger
              aria-label="Moments d'application"
            >
              {moments.map((txt, i) => (
                <article className="moment rise-item" key={i}>
                  <span className="glyph">{String(i + 1).padStart(2, "0")}</span>
                  <span className="txt">{txt}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="section-editorial">
            <div className="ritual" aria-label="Gestes du rituel">
              <div className="ritual-label rise-item">
                // Les 4 gestes · Recovery Ritual™
              </div>
              <h3 className="rise-item">Quatre gestes pour ralentir.</h3>
              <div className="steps" data-grid-motion data-rise-stagger>
                {steps.map((step) => (
                  <div className="step rise-item" key={step.n}>
                    <span className="n">{step.n}</span>
                    <span className="h">{step.h}</span>
                    <span className="v">{step.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <SectionMedia
              aspect="square"
              tone="dark"
              label="// Visuel — gestes"
              title="Macro patch · texture & matière"
            />
          </div>

          <div className="quote-card rise-item">
            Parce que prendre soin de sa peau, c&apos;est aussi prendre soin de
            soi.
          </div>
        </div>
      </div>
    </section>
  );
}
