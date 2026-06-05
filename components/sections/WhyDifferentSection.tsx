import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import img1 from "@/assets/1.png";

const benefits = [
  "praticité",
  "hydratation",
  "effet frais",
  "confort",
  "expérience sensorielle",
];

const checklist = [
  "Simple à intégrer dans votre routine.",
  "Confortable à porter.",
  "Pensé pour accompagner votre peau au quotidien.",
];

export default function WhyDifferentSection() {
  return (
    <section
      className="scene why-diff"
      data-screen-label="04 Pourquoi différent"
      id="section-4"
    >
      <div className="container reveal">
        <header className="section-head">
          <div className="num stagger-child">
            § 04 <span className="slash">/</span> Pourquoi le SRP™ est différent
          </div>
          <SectionTitle
            lines={["Pourquoi le SKIN RECOVERY", "PATCH™ est différent."]}
          />
          <p className="lede stagger-child">
            Le SKIN RECOVERY PATCH™ fait partie des innovations signatures
            développées par METCARE® autour du confort cutané et de
            l&apos;expérience recovery.
          </p>
        </header>

        <figure className="section-media section-media--wide section-media--beige rise-item">
          <div className="section-media__frame" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src={img1}
              alt="Produit hero · SKIN RECOVERY PATCH™"
              width={400}
              height={520}
              style={{ height: "180%", width: "auto", objectFit: "contain" }}
            />
          </div>
          <figcaption className="section-media__caption">
            <span className="section-media__label">Visuel — innovation</span>
            <span className="section-media__title">Produit hero · SKIN RECOVERY PATCH™</span>
          </figcaption>
        </figure>

        <div className="split why-split" data-grid-motion data-rise-stagger>
          <article className="card why-reflexion rise-item">
            <span className="label">Notre réflexion</span>
            <h3>Notre réflexion est née du terrain :</h3>
            <p className="body">
              certaines zones nécessitent parfois une approche plus ciblée pour
              accompagner la peau dans les phases où elle devient plus fragile
              ou sensibilisée.
            </p>
            <p className="body" style={{ marginTop: 16 }}>
              Nous avons donc développé un patch cosmétique pensé pour associer :
            </p>
          </article>

          <article className="card why-benefits-panel rise-item">
            <span className="label">Les bénéfices associés</span>
            <div
              className="why-benefits"
              data-grid-motion
              data-rise-stagger
              role="list"
            >
              {benefits.map((name, i) => (
                <div
                  className="why-benefit rise-item"
                  key={name}
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

        <div
          className="why-promise"
          data-rise-stagger
          aria-label="Promesses produit"
        >
          {checklist.map((txt) => (
            <div className="why-promise-row rise-item" key={txt}>
              <span className="why-promise-mark" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6.2L4.8 8.5L9.5 3.8"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
