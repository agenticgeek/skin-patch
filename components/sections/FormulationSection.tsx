import FormulationAurora from "@/components/illustrations/FormulationAurora";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import imgSpec from "@/assets/SKIN RECOVERY PATCH.png";

const ingredients = [
  {
    name: "niacinamide",
    desc: "Améliore la barrière cutanée et unifie le teint.",
  },
  {
    name: "panthénol",
    desc: "Apaise intensément et favorise la réparation.",
  },
  {
    name: "allantoïne",
    desc: "Adoucit et réduit les sensations d'inconfort.",
  },
  {
    name: "centella asiatica",
    desc: "L'actif iconique du recovery cutané.",
  },
  {
    name: "hamamélis",
    desc: "Tonifie et resserre délicatement les tissus.",
  },
  {
    name: "caféine",
    desc: "Défatigue et apporte un coup d'éclat immédiat.",
  },
  {
    name: "acide hyaluronique",
    desc: "Hydratation profonde et effet repulpant.",
  },
  {
    name: "bêta-glucan",
    desc: "Renforce les défenses naturelles de la peau.",
  },
];

const synergyLines = [
  "l'hydratation,",
  "le confort cutané,",
  "la sensation de fraîcheur,",
  "et l'expérience recovery lifestyle.",
];

export default function FormulationSection() {
  return (
    <section
      className="scene beige formulation-scene"
      data-screen-label="05 Formulation Philosophy"
      id="section-5"
    >
      <FormulationAurora />
      <div className="container reveal">
        <header className="section-head">
          <div
            className="num stagger-child"
            style={{ color: "var(--cherry)", opacity: 0.55 }}
          >
            § 05 <span className="slash">/</span> The METCARE® Formulation
            Philosophy
          </div>
          <SectionTitle
            lines={["Chaque actif,", "choisi avec intention."]}
          />
          <p className="lede stagger-child">
            Chez METCARE®, chaque actif est sélectionné avec une intention
            précise : accompagner le confort, respecter la peau, et
            transformer la récupération cutanée en une expérience plus douce et
            plus humaine.
          </p>
        </header>

        <div className="section-editorial section-editorial--reverse">
          <div className="section-editorial__content">
            <div
              className="card-label rise-item"
              style={{ color: "var(--cherry)", opacity: 0.6 }}
            >
              // Les 8 actifs · SKIN RECOVERY PATCH™
            </div>

            <div
              className="ingredient-grid"
              data-grid-motion
              data-pill-stagger
              data-rise-stagger
              aria-label="Actifs"
            >
              {ingredients.map((ing, i) => (
                <article className="ic-card rise-item" key={ing.name} tabIndex={0}>
                  <span className="ic-card-idx">
                    {String(i + 1).padStart(2, "0")} · actif
                  </span>
                  <h3 className="ic-card-name">{ing.name}</h3>
                  <p className="ic-card-desc">{ing.desc}</p>
                </article>
              ))}
            </div>
          </div>

          <figure className="section-media section-media--portrait section-media--beige rise-item">
            <div className="section-media__frame">
              <Image
                src={imgSpec}
                alt="Texture sérum · actifs en lumière"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="section-media__caption">
              <span className="section-media__label">// Visuel — formulation</span>
              <span className="section-media__title">Texture sérum · actifs en lumière</span>
            </figcaption>
          </figure>
        </div>

        <article className="synergy-card-v2" aria-label="Synergie">
          <div className="synergy-header">
            <span className="synergy-lbl">
              // Cette synergie a été pensée pour accompagner
            </span>
            <div className="synergy-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M12 2L12 22M2 12L22 12"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="8" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="synergy-grid" data-grid-motion data-rise-stagger>
            {synergyLines.map((line, i) => (
              <div className="synergy-item rise-item" key={line}>
                <span className="synergy-item-idx">0{i + 1}</span>
                <span className="synergy-item-txt">{line}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
