import VisionSpheres from "@/components/illustrations/VisionSpheres";
import FilmGrain from "@/components/ui/FilmGrain";
import SectionMedia from "@/components/ui/SectionMedia";
import SectionTitle from "@/components/ui/SectionTitle";

const visionItems = [
  "plus sensorielle",
  "plus élégante",
  "plus confortable",
  "pensée autour du ressenti",
];

export default function VisionSection() {
  return (
    <section
      className="scene vision-scene"
      data-screen-label="06 L'expérience METCARE"
      id="section-6"
    >
      <VisionSpheres />
      <div className="container container--narrow reveal">
        <header className="section-head">
          <div className="num stagger-child">
            § 06 <span className="slash">/</span> L&apos;Expérience METCARE®
          </div>
          <SectionTitle
            lines={[
              "Une nouvelle vision",
              "de la récupération cutanée.",
            ]}
          />
          <p className="lede stagger-child">
            Le SKIN RECOVERY PATCH™ fait partie d&apos;une nouvelle vision de
            la récupération cutanée — plus sensorielle, plus élégante, plus
            confortable, pensée autour du ressenti.
          </p>
        </header>

        <div className="section-editorial">
          <article className="vision-card rise-item" aria-label="La vision">
            <FilmGrain
              filterId="vision-grain-filter"
              className="vision-card-grain"
            />
            <div>
              <span className="v-num">// La vision METCARE®</span>
              <h3>
                Une peau plus confortable
                <br />
                transforme aussi l&apos;expérience vécue.
              </h3>
            </div>
            <div className="vlist" data-grid-motion data-rise-stagger>
              {visionItems.map((txt, i) => (
                <div className="vrow rise-item" key={txt}>
                  <span className="v-idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="v-txt">{txt}</span>
                </div>
              ))}
            </div>
          </article>

          <SectionMedia
            aspect="portrait"
            tone="dark"
            label="// Visuel — expérience"
            title="Ambiance spa · recovery lifestyle"
          />
        </div>
      </div>
    </section>
  );
}
